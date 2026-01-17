import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'residential', label: 'Residential' },
    { id: 'hospitality', label: 'Hospitality' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Mougins, France',
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      link: '/project/mougins-france',
    },
    {
      id: 2,
      title: 'New York, USA',
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      link: '/project/new-york-usa',
    },
    {
      id: 3,
      title: 'Milan Penthouse',
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      link: '/project/milan-penthouse',
    },
    {
      id: 4,
      title: 'London Residence',
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      link: '/project/london-residence',
    },
    {
      id: 5,
      title: 'Four Seasons Hotel',
      type: 'hospitality',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      link: '/project/four-seasons',
    },
    {
      id: 6,
      title: 'Luxury Resort Maldives',
      type: 'hospitality',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      link: '/project/maldives-resort',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.type === activeFilter);

  return (
    <div className="page page--projects">
      <Header />
      
      <main className="main">
        {/* Hero Section */}
        <section className="projects-hero">
          <h1>Projects</h1>
          <p className="projects-hero__subtitle">
            Discover our worldwide installations and collaborations
          </p>
        </section>

        {/* Filter */}
        <section className="projects-filter">
          <div className="projects-filter__container">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="projects-grid-section">
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <Link key={project.id} to={project.link} className="project-card">
                <div className="project-card__image">
                  <img src={project.image} alt={project.title} />
                </div>
                <h3 className="project-card__title">{project.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
