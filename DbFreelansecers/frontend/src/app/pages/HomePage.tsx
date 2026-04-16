import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { TopFreelancers } from '../components/TopFreelancers';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <TopFreelancers />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
