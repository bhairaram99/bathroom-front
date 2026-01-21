import { useState, useEffect } from 'react';
import DynamicForm from '../../components/DynamicForm';
import api from '../../services/api';
import './Contacts.css';

const Contacts = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSettings, setFormSettings] = useState({
    submitButtonText: 'Send Message',
    successMessage: 'Thank you for contacting us. We will respond to your inquiry shortly.',
  });

  // Fetch form configuration from backend
  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        setLoading(true);
        const response = await api.getContactFormConfig();
        
        if (response.status === 'success' && response.data) {
          setFields(response.data.fields || []);
          if (response.data.settings) {
            setFormSettings(prev => ({
              ...prev,
              ...response.data.settings,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching contact form config:', error);
        // Use fallback fields if API fails
        setFields(getFallbackFields());
      } finally {
        setLoading(false);
      }
    };

    fetchFormConfig();
  }, []);

  // Fallback fields in case API is not available
  const getFallbackFields = () => [
    { key: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name', order: 1 },
    { key: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com', order: 2 },
    { key: 'phone', label: 'Phone Number', type: 'tel', required: false, placeholder: '+44 (0) 123 456 7890', order: 3 },
    { key: 'subject', label: 'Subject', type: 'select', required: true, placeholder: 'Select a subject', options: ['General Inquiry', 'Product Information', 'Order Status', 'Technical Support', 'Feedback', 'Other'], order: 4 },
    { key: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Enter your message...', order: 5 },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      const response = await api.submitContactForm(formData);
      
      if (response.status === 'success') {
        return response;
      } else {
        throw new Error(response.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  return (
    <div className="contacts-page">
      {/* Page Header */}
      <section className="contacts-header">
        <div className="contacts-header__container">
          <h1 className="contacts-header__title">CONTACTS</h1>
          <p className="contacts-header__description">
            Whether you are exploring our collections or planning a bespoke project, our team is ready to assist with expert advice and dedicated support tailored to your needs.
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
          <h2 className="contacts-form-section__title">CONTACT US</h2>

          <DynamicForm
            fields={fields}
            onSubmit={handleSubmit}
            loading={loading}
            submitButtonText={formSettings.submitButtonText}
            successMessage={formSettings.successMessage}
            className="contacts-form"
          />
        </div>
      </section>
    </div>
  );
};

export default Contacts;
