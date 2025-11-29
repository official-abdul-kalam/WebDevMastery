export const plans = [
    {
        id: 'plan_free',
        name: 'Free',
        price: 0,
        currency: 'INR',
        duration: 'Forever',
        features: [
            'Access to Module 1',
            'Basic Community Support',
            'Limited Projects',
            'No Certificate'
        ],
        recommended: false,
        popular: false
    },
    {
        id: 'plan_monthly',
        name: 'Monthly',
        price: 199,
        currency: 'INR',
        duration: '1 Month',
        features: [
            'Access to All Modules',
            'Unlimited Projects',
            'Certificate of Completion',
            'Community Support'
        ],
        recommended: false,
        popular: true
    },
    {
        id: 'plan_yearly',
        name: 'Yearly',
        price: 299,
        currency: 'INR',
        duration: '1 Year',
        features: [
            'Access to All Modules',
            'Unlimited Projects',
            'Certificate of Completion',
            'Priority Support',
            '2 Months Free'
        ],
        recommended: true,
        popular: false
    },
    {
        id: 'plan_lifetime',
        name: 'Lifetime',
        price: 499,
        currency: 'INR',
        duration: 'Forever',
        features: [
            'Lifetime Access',
            'All Future Updates',
            'Unlimited Projects',
            'Certificate of Completion',
            'VIP Support',
            'Mentorship Access'
        ],
        recommended: false,
        popular: false
    }
];
