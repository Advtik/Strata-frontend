import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Architecture from './Architecture';
import Metrics from './Metrics';
import Footer from './Footer';

export default function StrataLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Metrics />
      </main>
      <Footer />
    </div>
  );
}
