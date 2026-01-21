import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomeSections.css';

// History Section with Category Carousel
export const HistorySection = () => {
  const categories = [
    {
      id: 1,
      title: 'Kitchens',
      image: '/images/hero/Kitchen.jpg',
      link: '/collection/kitchens',
    },
    {
      id: 2,
      title: 'Bathrooms',
      image: '/images/categories/Bathroom.jpg',
      link: '/collection/bathrooms',
    },
    // {
    //   id: 3,
    //   title: 'Wardrobes and Systems',
    //   image: '/images/categories/Wardrobe.jpg',
    //   link: '/collection/wardrobes',
    // },
    {
      id: 4,
      title: 'Extra Collection',
      image: '/images/categories/COMPLEMENTI-DI-ARREDO_1080X1350.jpg',
      link: '/collection/Extra Collection',
    },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="section history-section">
      <div className="section__container">
        <h2 className="section__title section__title--large">
          Design defines our journey <br /> Signature is built on a legacy of thoughtful design.
        </h2>
        
        <div className="category-carousel">
          <div className="category-carousel__track">
            {duplicatedCategories.map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                to={category.link}
                className="category-card"
              >
                <div className="category-card__image">
                  <img src={category.image} alt={category.title} />
                </div>
                <h3 className="category-card__title">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// A Way of Living Section with Video
export const AWayOfLivingSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented
      });
    }
  }, []);

  return (
    <section className="section awol-section">
      <div className="section__container">
        <h2 className="section__title">Design that defines the way you live</h2>
        
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls
            controlsList="nodownload"
          >
            <source src="/videos/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

// Projects Section
export const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Mougins, France',
      image: '/images/projects/project1.jpg',
      link: '/project/mougins-france',
    },
    {
      id: 2,
      title: 'New York, USA',
      image: '/images/projects/project2.jpg',
      link: '/project/new-york-usa',
    },
  ];

  return (
    <section className="section projects-section">
      <div className="section__container">
        <h2 className="section__title">Bundles</h2>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <Link key={project.id} to={project.link} className="project-card">
              <div className="project-card__image">
                <img src={project.image} alt={project.title} />
              </div>
              <h3 className="project-card__title">{project.title}</h3>
            </Link>
          ))}
        </div>

        <div className="section__cta">
          <Link to="/projects" className="button text--black">
            Discover all bundles
          </Link>
        </div>
      </div>
    </section>
  );
};

// Catalogues Section
export const CataloguesSection = () => {
  const catalogues = [
    {
      id: 1,
      title: 'New Collections – The Novelties',
      image: '/images/catalogues/new-collections.jpg',
      downloadUrl: '/catalogues/signature-new-collections-2025.pdf',
    },
    {
      id: 2,
      title: 'A way of living 2025',
      image: '/images/catalogues/awol-2025.jpg',
      downloadUrl: '/catalogues/awol-2025.pdf',
    },
  ];

  return (
    <section className="section catalogues-section">
      <div className="section__container">
        <h2 className="section__title">Catalogues</h2>
        
        <div className="catalogues-grid">
          {catalogues.map((catalogue) => (
            <a
              key={catalogue.id}
              href={catalogue.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="catalogue-card"
              download
            >
              <div className="catalogue-card__image">
                <img src={catalogue.image} alt={catalogue.title} />
              </div>
              <h3 className="catalogue-card__title">{catalogue.title}</h3>
            </a>
          ))}
        </div>

        <div className="section__cta">
          <Link to="/catalogues" className="button text--black">
            Discover all catalogs
          </Link>
        </div>
      </div>
    </section>
  );
};

// News Section
export const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'The merger: Signature, Woodera, Versatile',
      excerpt:
        'Signature, Woodera and Versatile announce their merger into a single company which will take the name of Boffi|DePadova.',
      image: '/images/news/merger.jpg',
      
    },
    {
      id: 2,
      title: 'Milan Design Week 2025',
      excerpt:
        'Discover our presence at the most important design event of the year.',
      image: '/images/news/milan-design-week.jpg',
      link: '/news/milan-design-week-2025',
    },
    {
      id: 3,
      title: 'New Collection Launch',
      excerpt:
        'Introducing innovative kitchen solutions that redefine modern living spaces.',
      image: '/images/news/new-collection.jpg',
      link: '/news/new-collection-launch',
    },
  ];

  return (
    <section className="section news-section">
      <div className="section__container">
        <h2 className="section__title">News</h2>
        
        <div className="news-grid">
          {news.map((item) => (
            <Link key={item.id} to={item.link} className="news-card">
              <div className="news-card__image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-card__content">
                <h3 className="news-card__title">{item.title}</h3>
                <p className="news-card__excerpt">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="section__cta">
          <Link to="/news" className="button text--black">
            Discover more
          </Link>
        </div>
      </div>
    </section>
  );
};

// Philosophy Section
export const PhilosophySection = () => {
  return (
    <section className="section philosophy-section">
      <div className="section__container">
        <h2 className="section__title">Philosophy</h2>
        <p className="philosophy-text">
          Design with purpose. Live with intention.
          We design spaces with meaning—where innovation, comfort, and timeless design come together.
        </p>

        <div className="section__cta">
          <Link to="/about" className="button text--black">
            Discover more
          </Link>
        </div>
      </div>
    </section>
  );
};

// Signature Brands Section
export const BrandsSection = () => {
  const brands = [
    {
      id: 1,
      name: 'Signature',
      image: '/images/store/signature.jpg',
      link: '/about',
      external: false,
    },
    {
      id: 2,
      name: 'Woodera',
      image: '/images/store/woodera.jpg',
      external: true,
    },
    { 
      id: 3,
      name: 'Versatile',
      image: '/images/store/versatile.jpg',
      external: true,
    },
  ];

  return (
    <section className="section brands-section">
      <div className="section__container">
        <h2 className="section__title">Brands</h2>
        
        <div className="brands-grid">
          {brands.map((brand) =>
            brand.external ? (
              <a
                key={brand.id}
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-card"
              >
                <div className="brand-card__image">
                  <img src={brand.image} alt={brand.name} />
                </div>
                <div className="brand-card__overlay">
                  <span className="brand-card__name">{brand.name}</span>
                </div>
              </a>
            ) : (
              <Link key={brand.id} to={brand.link} className="brand-card">
                <div className="brand-card__image">
                  <img src={brand.image} alt={brand.name} />
                </div>
                <div className="brand-card__overlay">
                  <span className="brand-card__name">{brand.name}</span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};
