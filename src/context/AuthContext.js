'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, Timestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import LoginModal from '@/components/LoginModal';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null); // Store Firestore data (premium status, etc.)
    const [loading, setLoading] = useState(true);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        let unsubscribeSnapshot = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                // Real-time listener for user data
                const userRef = doc(db, "users", user.uid);
                unsubscribeSnapshot = onSnapshot(userRef, async (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();

                        // Check if subscription is active
                        const now = new Date();
                        let endDate = null;

                        if (data.subscriptionEndDate) {
                            if (data.subscriptionEndDate.toDate) {
                                // Firestore Timestamp
                                endDate = data.subscriptionEndDate.toDate();
                            } else if (data.subscriptionEndDate.seconds) {
                                // Raw seconds
                                endDate = new Date(data.subscriptionEndDate.seconds * 1000);
                            } else {
                                // JS Date object (from local write) or string
                                endDate = new Date(data.subscriptionEndDate);
                            }
                        }

                        const isPremium = endDate && endDate > now;

                        setUserData({ ...data, isPremium, completedItems: data.completedItems || [] });
                    } else {
                        // Create new user document if it doesn't exist
                        const newUser = {
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            isPremium: false,
                            completedItems: [],
                            createdAt: new Date()
                        };
                        await setDoc(userRef, newUser);
                        setUserData(newUser); // Set local state immediately
                    }
                    setLoading(false);
                });

            } else {
                setUser(null);
                if (unsubscribeSnapshot) unsubscribeSnapshot();

                // Load from Local Storage for non-logged in users
                const localCompleted = JSON.parse(localStorage.getItem('wdm-completed-items') || '[]');
                setUserData({
                    isPremium: false,
                    completedItems: localCompleted
                });
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);

    const openLoginModal = () => setIsLoginOpen(true);
    const closeLoginModal = () => setIsLoginOpen(false);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            closeLoginModal();
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => signOut(auth);

    const upgradeSubscription = async (plan) => {
        if (!user) return;

        const now = new Date();
        let endDate = new Date();

        if (plan.duration === '1 Month') {
            endDate.setMonth(now.getMonth() + 1);
        } else if (plan.duration === '1 Year') {
            endDate.setFullYear(now.getFullYear() + 1);
        } else if (plan.duration === 'Forever') {
            endDate.setFullYear(now.getFullYear() + 100); // Lifetime
        }

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            isPremium: true,
            subscriptionPlan: plan.id,
            subscriptionStartDate: Timestamp.fromDate(now),
            subscriptionEndDate: Timestamp.fromDate(endDate)
        });

        // No need to update local state manually, onSnapshot will handle it
    };

    const toggleCompletion = async (itemId) => {
        // Handle Local Storage for non-logged in users
        if (!user) {
            const currentItems = userData?.completedItems || [];
            let newItems;

            if (currentItems.includes(itemId)) {
                newItems = currentItems.filter(id => id !== itemId);
            } else {
                newItems = [...currentItems, itemId];
            }

            localStorage.setItem('wdm-completed-items', JSON.stringify(newItems));
            setUserData(prev => ({
                ...prev,
                completedItems: newItems
            }));
            return;
        }

        // Handle Firestore for logged in users
        if (!userData) return;

        const isCompleted = userData.completedItems?.includes(itemId);
        const userRef = doc(db, "users", user.uid);

        try {
            if (isCompleted) {
                await updateDoc(userRef, {
                    completedItems: arrayRemove(itemId)
                });
                setUserData(prev => ({
                    ...prev,
                    completedItems: prev.completedItems.filter(id => id !== itemId)
                }));
            } else {
                await updateDoc(userRef, {
                    completedItems: arrayUnion(itemId)
                });
                setUserData(prev => ({
                    ...prev,
                    completedItems: [...(prev.completedItems || []), itemId]
                }));
            }
        } catch (error) {
            console.error("Error toggling completion:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            userData,
            login,
            logout,
            loading,
            isPremium: userData?.isPremium || false,
            upgradeSubscription,
            openLoginModal,
            toggleCompletion
        }}>
            {children}
            <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
        </AuthContext.Provider>
    );
};
