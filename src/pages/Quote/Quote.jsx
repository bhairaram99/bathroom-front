import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/DynamicForm';
import api from '../../services/api';
import './Quote.css';

const Quote = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSettings, setFormSettings] = useState({
    submitButtonText: 'Request Quote',
    successMessage: 'Thank you! Your quote request has been submitted successfully.',
  });

  // Fetch form configuration from backend
  useEffect(() => {
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

    fetchFormConfig();
  }, []);

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
        return response;
      } else {
        throw new Error(response.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting quote form:', error);
      throw error;
    }
  };

  return (
    <div className="quote-page">
      <div className="quote-page__container">
        <div className="quote-form">
          <h1 className="quote-form__title">Get a Quote</h1>
          <p className="quote-form__subtitle">
            Please fill in the form below and we'll get back to you as soon as possible.
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
  );
};

export default Quote;
