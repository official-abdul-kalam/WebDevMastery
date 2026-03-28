import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Coming Soon - WebDevMastery',
  description: 'Upcoming courses at WebDevMastery',
};

const upcomingCourses = [
  {
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts like higher-order components, render props, compound components, and custom hooks.',
    level: 'Advanced',
  },
  {
    title: 'Fullstack Next.js with App Router',
    description: 'Build complete applications using the new Next.js App Router, Server Components, and Server Actions.',
    level: 'Intermediate',
  },
  {
    title: 'Web3 Development Bootcamp',
    description: 'Learn to build decentralized applications (dApps), smart contracts, and integrate with blockchain networks.',
    level: 'Beginner to Intermediate',
  },
];

export default function ComingSoon() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '4rem 0', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Coming Soon
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            We are working hard to bring you more high-quality courses. Here&apos;s a sneak peek at what&apos;s in the pipeline.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {upcomingCourses.map((course, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '2rem',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '0.2rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                In Progress
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{course.title}</h2>
              <div style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Level: {course.level}
              </div>
              <p style={{ color: 'var(--text-muted)' }}>{course.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
