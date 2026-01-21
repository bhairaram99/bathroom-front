import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../data/collectionsData';
import './MegaMenu.css';

const MegaMenu = ({ isOpen, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categories = getCategories();

  const handleCategoryClick = () => {
    onClose();
  };

  const handleMouseEnter = () => {
    // Keep menu open when hovering over it
  };

  const handleMouseLeave = () => {
    onClose();
  };

  return (
    <div 
      className={`mega-menu ${isOpen ? 'mega-menu--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mega-menu__overlay" onClick={onClose}></div>
      <div className="mega-menu__content">
        <div className="mega-menu__container">
          <div className="mega-menu__categories">
            <h3 className="mega-menu__title">Collections</h3>
            <ul className="mega-menu__list">
              {categories.map((category) => (
                <li 
                  key={category.id}
                  className={`mega-menu__item ${hoveredCategory === category.id ? 'mega-menu__item--active' : ''}`}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                >
                  <Link 
                    to={`/collections/${category.slug}`}
                    className="mega-menu__link"
                    onClick={handleCategoryClick}
                  >
                    <span className="mega-menu__link-text">{category.name}</span>
                    <svg className="mega-menu__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mega-menu__preview">
            {hoveredCategory && (
              <div className="mega-menu__preview-content">
                {categories.find(c => c.id === hoveredCategory) && (
                  <>
                    <div className="mega-menu__preview-image">
                      <img 
                        src={categories.find(c => c.id === hoveredCategory).image} 
                        alt={categories.find(c => c.id === hoveredCategory).name}
                      />
                    </div>
                    <p className="mega-menu__preview-description">
                      {categories.find(c => c.id === hoveredCategory).description}
                    </p>
                  </>
                )}
              </div>
            )}
            {!hoveredCategory && (
              <div className="mega-menu__preview-placeholder">
                <p>Hover over a category to preview</p>
              </div>
            )}
          </div>
        </div>
        
        <button className="mega-menu__close" onClick={onClose} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MegaMenu;
