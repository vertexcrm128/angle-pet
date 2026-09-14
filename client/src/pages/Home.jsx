import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Products from '../components/Products';
import Industries from '../components/Industries';
import Manufacturing from '../components/Manufacturing';
import WhyAngelPet from '../components/WhyAngelPet';
import StatsBanner from '../components/StatsBanner';
import Sustainability from '../components/Sustainability';
import Testimonials from '../components/Testimonials';
import QuoteForm from '../components/QuoteForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Products />
      <Industries />
      <Manufacturing />
      <WhyAngelPet />
      <StatsBanner />
      <Sustainability />
      <Testimonials />
      <QuoteForm />
      <Footer />
    </>
  );
}
