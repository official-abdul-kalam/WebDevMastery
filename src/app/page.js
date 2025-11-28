import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ModuleSection from '@/components/ModuleSection';
import Footer from '@/components/Footer';
import { modules } from '@/data/modules';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="container" id="curriculum">
        {modules.map((module, index) => (
          <ModuleSection key={index} {...module} />
        ))}
      </main>
      <Footer />
    </>
  );
}
