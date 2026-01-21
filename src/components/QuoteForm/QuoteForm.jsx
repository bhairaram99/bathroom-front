import { useState, useEffect } from 'react';
import DynamicForm from '../DynamicForm';
import api from '../../services/api';
import './QuoteForm.css';

const QuoteForm = ({ isOpen, onClose }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSettings, setFormSettings] = useState({
    submitButtonText: 'Request Quote',
    successMessage: 'Thank you! Your quote request has been submitted successfully.',
  });

  // Fetch form configuration from backend
  useEffect(() => {
    if (isOpen) {
      fetchFormConfig();
    }
  }, [isOpen]);

  const fetchFormConfig = async () => {
    try {
      setLoading(true);
      const response = await api.getQuoteFormConfig();
      
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
      console.error('Error fetching quote form config:', error);
      // Use fallback fields if API fails
      setFields(getFallbackFields());
    } finally {
      setLoading(false);
    }
  };

  // Fallback fields in case API is not available
  const getFallbackFields = () => [
    { key: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name', order: 1 },
    { key: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com', order: 2 },
    { key: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+44 (0) 123 456 7890', order: 3 },
    { key: 'projectType', label: 'Project Type', type: 'select', required: true, placeholder: 'Select project type', options: ['Bathroom Renovation', 'Kitchen Renovation', 'New Construction', 'Commercial Project', 'Other'], order: 4 },
    { key: 'description', label: 'Project Description', type: 'textarea', required: true, placeholder: 'Please describe your project requirements...', order: 5 },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      const response = await api.submitQuoteForm(formData);
      
      if (response.status === 'success') {
        // Close modal after short delay to show success message
        setTimeout(() => {
          onClose();
        }, 2000);
        return response;
      } else {
        throw new Error(response.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting quote form:', error);
      throw error;
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('quote-modal__overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quote-modal">
      <div className="quote-modal__overlay" onClick={handleOverlayClick}>
        <div className="quote-modal__content">
          <button
            className="quote-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="quote-form">
            <h2 className="quote-form__title">Get a Quote</h2>
            <p className="quote-form__subtitle">
              Request a quote for your bathroom or kitchen project
            </p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              loading={loading}
              submitButtonText={formSettings.submitButtonText}
              successMessage={formSettings.successMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
