import './About.css';

const About = () => {
  return (
    <div className="page page--about">
      <main className="main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero__background">
            <img src="/images/about/about-house.jpg" alt="About Us" />
          </div>
          <div className="about-hero__overlay"></div>
          <div className="about-hero__content">
            <h1>About</h1>
          </div>
        </section>

        {/* Main About Section */}
        <section className="about-section">
          <div className="about-section__container">
            <div className="about-section__content">
              <p className="about-section__text">
                We are driven by a passion for creating refined interior spaces that enhance the way people live, work, and interact with their surroundings. Our focus lies in designing environments that are not only visually striking but also practical, comfortable, and enduring.
              </p>
              <p className="about-section__text">
                With a strong foundation in design excellence and craftsmanship, we specialize in creating kitchens, bathrooms, and living spaces that reflect modern lifestyles. Every project is approached with attention to detail, thoughtful planning, and a deep understanding of how spaces are used in everyday life.
              </p>
              <p className="about-section__text">
                Innovation plays a key role in our journey. By embracing new ideas, evolving technologies, and contemporary design thinking, we continuously develop solutions that meet changing needs while remaining elegant and purposeful.
              </p>
              <p className="about-section__text">
                Our goal is simple—to create interiors that balance beauty and function, enrich daily life, and stand as a lasting expression of thoughtful design.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;