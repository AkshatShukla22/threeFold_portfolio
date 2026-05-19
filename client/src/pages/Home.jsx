import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSettings } from '../api/index';
import { setSettings } from '../redux/slices/settingsSlice';
import SEOMeta from '../components/common/SEOMeta';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import WhyUs from '../components/sections/WhyUs';
import Projects from '../components/sections/Projects';
import Stats from '../components/sections/Stats';
import Workflow from '../components/sections/Workflow';
import Testimonials from '../components/sections/Testimonials';
import TechStack from '../components/sections/TechStack';
import SnakeSection from '../components/interactive/Interactive';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import Contact from '../components/sections/Contact';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSettings()
      .then(r => dispatch(setSettings(r.data.data)))
      .catch(() => {});
  }, [dispatch]);

  return (
    <>
      <SEOMeta
        title="Home"
        description="ThreeFold Digital — Designing, Development and Automation agency building world-class digital products."
      />
      <Hero />
      <Services limit={6} />
      <WhyUs />
      <Projects limit={6} />
      <Stats />
      <Workflow />
      <TechStack />
      <Testimonials />
      <SnakeSection />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
