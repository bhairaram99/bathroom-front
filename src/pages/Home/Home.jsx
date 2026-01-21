import Header from '../../components/Header';
import HeroSlider from '../../components/HeroSlider';
import {
  HistorySection,
  AWayOfLivingSection,
  ProjectsSection,
  CataloguesSection,
  NewsSection,
  PhilosophySection,
  BrandsSection,
} from '../../components/HomeSections';
import './Home.css';

const Home = () => {
  return (
    <div className="page page--home">
      <Header />
      
      <main className="main">
        <HeroSlider />
        <HistorySection />
        <AWayOfLivingSection />
        <ProjectsSection />
        <CataloguesSection />
        <NewsSection />
        <PhilosophySection />
        <BrandsSection />
      </main>
    </div>
  );
};

export default Home;
