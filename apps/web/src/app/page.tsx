import Image from 'next/image';
import styles from './page.module.css';
import HeroSection from '@/components/LandingPage/HeroSection';
import CategorySection from '@/components/LandingPage/CategorySection';
import UpcomingEvent from '@/components/LandingPage/UpcomingEvent';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <CategorySection />
      <UpcomingEvent />
      <Footer />
    </main>
  );
}
