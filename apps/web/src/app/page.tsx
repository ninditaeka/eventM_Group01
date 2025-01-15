import Image from 'next/image';
import styles from './page.module.css';
import HeroSection from '@/components/LandingPage/HeroSection';
import CategorySection from '@/components/LandingPage/CategorySection';
import UpcomingEvent from '@/components/LandingPage/UpcomingEvent';

export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-center">
      <HeroSection />
      <CategorySection />
      <UpcomingEvent />
    </main>
  );
}
