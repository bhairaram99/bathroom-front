import { useState } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    requestType: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    postalCode: '',
    message: '',
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.requestType &&
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.email &&
      formData.country &&
      formData.city &&
      formData.message &&
      formData.consent
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          requestType: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          country: '',
          city: '',
          postalCode: '',
          message: '',
          consent: false,
        });
      }, 3000);
    }
  };

  return (
    <div className="contacts-page">
      {/* Page Header */}
      <section className="contacts-header">
        <div className="contacts-header__container">
          <h1 className="contacts-header__title">CONTACTS</h1>
          <p className="contacts-header__description">
            We are here to assist you with any inquiries regarding our luxury collections, 
            bespoke design services, or project collaborations. Our team is dedicated to 
            providing exceptional support and personalized consultation.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contacts-info-section">
        <div className="contacts-info-section__container">
          <div className="contacts-info-section__left">
            {/* Headquarter */}
            <div className="contact-block">
              <h3 className="contact-block__title">HEADQUARTER</h3>
              <div className="contact-block__content">
                <p>Signature (BATH & KITCHENS LTD)</p>
                <p>42 Berkeley Square</p>
                <p>London, W1J 5AW</p>
                <p>United Kingdom</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="contact-block">
              <h3 className="contact-block__title">CONTACT US</h3>
              <div className="contact-block__content">
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+442078123456">+44 (0) 20 7812 3456</a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@signaturebk.com">info@signaturebk.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="contacts-info-section__right">
            <div className="contacts-info-image">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
                alt="Office Interior" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contacts-form-section">
        <div className="contacts-form-section__container">
          <h2 className="contacts-form-section__title">CONTACTS</h2>

          {isSubmitted && (
            <div className="form-success">
              Thank you for contacting us. We will respond to your inquiry shortly.
            </div>
          )}

          <form className="contacts-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Request Type */}
              <div className="form-field form-field--full">
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleInputChange}
                  required
                  className={formData.requestType ? 'has-value' : ''}
                >
                  <option value="">Request type *</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="project">Project Consultation</option>
                  <option value="showroom">Showroom Visit</option>
                  <option value="press">Press Office</option>
                  <option value="careers">Careers</option>
                </select>
              </div>

              {/* First Name */}
              <div className="form-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Country */}
              <div className="form-field">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className={formData.country ? 'has-value' : ''}
                >
                  <option value="">Country *</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="DE">Germany</option>
                  <option value="ES">Spain</option>
                  <option value="CH">Switzerland</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* City */}
              <div className="form-field">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Postal Code */}
              <div className="form-field">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>

              {/* Message */}
              <div className="form-field form-field--full">
                <textarea
                  name="message"
                  placeholder="Message *"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="form-consent">
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                />
                <span className="consent-checkbox__box"></span>
                <span className="consent-checkbox__text">
                  I have read and accept the{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>{' '}
                  and consent to the processing of my personal data for the purposes 
                  indicated therein. *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button 
                type="submit" 
                className="submit-button"
                disabled={!isFormValid()}
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
