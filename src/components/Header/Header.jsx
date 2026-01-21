import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const location = useLocation();

  const mainNavItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      hasSubmenu: false,
    },
    {
      id: 'collections',
      label: 'Collections',
      hasSubmenu: true,
      submenu: {
        column1: [
          { label: 'Kitchens', path: '/collections/kitchens' },
          { label: 'Bathrooms', path: '/collections/bathrooms' },
          { label: 'Extra Collection', path: '/collections/extra-collection' },
        ],
      },
    },
    {
      id: 'about',
      label: 'About',
      path: '/about',
      hasSubmenu: false,
    },
    {
      id: 'brands',
      label: 'Our Brands',
      path: '/',
      hasSubmenu: true,
      submenu: {
        column1: [
          { label: 'Signature', path: '/about' },
          { label: 'Woodera', external: true },
          { label: 'Versatile', path: '', external: true },
        ],
      },
    },
    {
      id: 'projects',
      label: 'Bundles',
      hasSubmenu: true,
      submenu: {
        column1: [
          { label: 'Residential', path: '/projects?type=residential' },
          { label: 'Hospitality', path: '/projects?type=hospitality' },
          { label: 'All Bundles', path: '/projects' },
        ],
      },
    },
    {
      id: 'contacts',
      label: 'Contacts',
      path: '/contacts',
      hasSubmenu: false,
    },
  ];

  const quickNavItems = [];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'it', label: 'Italian' },
    { code: 'de', label: 'German' },
    { code: 'fr', label: 'French' },
  ];

  const handleMouseEnter = (id) => {
    setActiveSubmenu(id);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (id) => {
    setActiveMobileSubmenu(activeMobileSubmenu === id ? null : id);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="header header--desktop">
        <div className="header__container">
          <div className="header__left">
            {/* Logo */}
            <div className="header__logo">
              <Link to="/">
                <img src="/signature-logo-removebg-preview (2).png" alt="Signature Bath & Kitchens Ltd" />
              </Link>
            </div>

            {/* Main Navigation */}
            <nav className="header__nav">
              <ul className="menu__items menu__items--navigation">
                {mainNavItems.map((item) => (
                  <li
                    key={item.id}
                    className={`menu__item ${item.hasSubmenu ? 'has-children' : ''}`}
                    onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.path ? (
                      <Link to={item.path}>{item.label}</Link>
                    ) : (
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search Bar */}
            
          </div>

          <div className="header__right">
            {/* Quick Navigation */}
            <ul className="menu__items menu__items--quick">
              {quickNavItems.map((item) => (
                <li key={item.label} className="menu__item menu__item--quick">
                  {item.external ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <div className="language-switcher">
              <button className="language-switcher__toggle">English</button>
              <div className="language-switcher__menu">
                {languages.map((lang) => (
                  <a key={lang.code} href={`/${lang.code}`}>
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Get a Quote Button */}
            <Link to="/quote" className="quote-button">
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Submenu */}
        {mainNavItems.map(
          (item) =>
            item.hasSubmenu && (
              <div
                key={item.id}
                className={`header__submenu ${activeSubmenu === item.id ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="submenu__wrapper">
                  {item.submenu.column1 && (
                    <div className="submenu__column submenu__column--1">
                      {item.submenu.column1.map((subItem) => (
                        <div key={subItem.label} className="submenu__item">
                          {subItem.external ? (
                            <a
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <Link to={subItem.path}>{subItem.label}</Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {item.submenu.column2 && (
                    <div className="submenu__column submenu__column--2">
                      {item.submenu.column2.map((subItem) => (
                        <div key={subItem.label} className="submenu__item">
                          <Link to={subItem.path}>{subItem.label}</Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.submenu.featured && (
                    <div className="submenu__column submenu__column--3">
                      {item.submenu.featured.map((featured) => (
                        <Link
                          key={featured.title}
                          to={featured.path}
                          className="submenu__featured"
                        >
                          <div className="submenu__featured-image">
                            <img src={featured.image} alt={featured.title} />
                          </div>
                          <span className="submenu__featured-title">
                            {featured.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </header>

      {/* Mobile Header */}
      <header className="header header--mobile">
        <div className="header__container--mobile">
          <button
            className={`mobile-menu__toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="header__logo">
            <Link to="/">
              <img src="/signature-logo-removebg-preview.png" alt="Signature Bath & Kitchens Ltd" />
            </Link>
          </div>

          <Link to="/quote" className="quote-button">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {mainNavItems.map((item) => (
            <div
              key={item.id}
              className={`mobile-menu__item ${
                activeMobileSubmenu === item.id ? 'active' : ''
              }`}
            >
              {item.hasSubmenu ? (
                <>
                  <button onClick={() => toggleMobileSubmenu(item.id)}>
                    {item.label}
                    <span>{activeMobileSubmenu === item.id ? '−' : '+'}</span>
                  </button>
                  <div className="mobile-menu__submenu">
                    {item.submenu.column1?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={toggleMobileMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                    {item.submenu.column2?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={toggleMobileMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={item.path} onClick={toggleMobileMenu}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="mobile-menu__divider" style={{ height: '20px' }}></div>

          {quickNavItems.map((item) => (
            <div key={item.label} className="mobile-menu__item">
              <Link to={item.path} onClick={toggleMobileMenu}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`header-overlay ${activeSubmenu || mobileMenuOpen ? 'active' : ''}`}
        onClick={() => {
          setActiveSubmenu(null);
          setMobileMenuOpen(false);
        }}
      ></div>
    </>
  );
};

export default Header;
