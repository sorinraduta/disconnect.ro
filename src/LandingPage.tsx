import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import WhyUs from "./components/WhyUs";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const LandingPage: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <WhyUs />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </>
);

export default LandingPage;
