import { useState, useEffect } from 'react';
import './DynamicForm.css';

/**
 * DynamicForm Component
 * Renders a form based on field configuration from the backend
 * 
 * @param {Array} fields - Array of field configurations from backend
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {string} submitButtonText - Text for submit button
 * @param {boolean} loading - Loading state
 * @param {string} successMessage - Message to show on success
 */
const DynamicForm = ({ 
  fields = [], 
  onSubmit, 
  submitButtonText = 'Submit',
  loading = false,
  successMessage = '',
  className = ''
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize form data when fields change
  useEffect(() => {
    const initialData = {};
    fields.forEach(field => {
      if (field.type === 'checkbox') {
        initialData[field.key] = false;
      } else {
        initialData[field.key] = '';
      }
    });
    setFormData(initialData);
    setErrors({});
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      const value = formData[field.key];
      
      if (field.required) {
        if (field.type === 'checkbox' && !value) {
          newErrors[field.key] = `${field.label} is required`;
        } else if (field.type !== 'checkbox' && (!value || !value.toString().trim())) {
          newErrors[field.key] = `${field.label} is required`;
        }
      }
      
      // Email validation
      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field.key] = 'Please enter a valid email address';
      }
      
      // Phone validation (basic)
      if (field.type === 'tel' && value && !/^[\d\s\-+()]+$/.test(value)) {
        newErrors[field.key] = 'Please enter a valid phone number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      const resetData = {};
      fields.forEach(field => {
        if (field.type === 'checkbox') {
          resetData[field.key] = false;
        } else {
          resetData[field.key] = '';
        }
      });
      setFormData(resetData);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const { key, label, type, required, placeholder, options } = field;
    const value = formData[key] ?? '';
    const error = errors[key];
    
    switch (type) {
      case 'select':
        return (
          <div className={`dynamic-form__field ${error ? 'dynamic-form__field--error' : ''}`} key={key}>
            <label htmlFor={key} className="dynamic-form__label">
              {label} {required && <span className="dynamic-form__required">*</span>}
            </label>
            <select
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              className={`dynamic-form__select ${value ? 'has-value' : ''}`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <span className="dynamic-form__error">{error}</span>}
          </div>
        );
      
      case 'textarea':
        return (
          <div className={`dynamic-form__field dynamic-form__field--full ${error ? 'dynamic-form__field--error' : ''}`} key={key}>
            <label htmlFor={key} className="dynamic-form__label">
              {label} {required && <span className="dynamic-form__required">*</span>}
            </label>
            <textarea
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={5}
              className="dynamic-form__textarea"
            />
            {error && <span className="dynamic-form__error">{error}</span>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className={`dynamic-form__field dynamic-form__field--full dynamic-form__field--checkbox ${error ? 'dynamic-form__field--error' : ''}`} key={key}>
            <label className="dynamic-form__checkbox-label">
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={value}
                onChange={handleChange}
                className="dynamic-form__checkbox"
              />
              <span className="dynamic-form__checkbox-box"></span>
              <span className="dynamic-form__checkbox-text">
                {label} {required && <span className="dynamic-form__required">*</span>}
              </span>
            </label>
            {error && <span className="dynamic-form__error">{error}</span>}
          </div>
        );
      
      case 'radio':
        return (
          <div className={`dynamic-form__field dynamic-form__field--full ${error ? 'dynamic-form__field--error' : ''}`} key={key}>
            <label className="dynamic-form__label">
              {label} {required && <span className="dynamic-form__required">*</span>}
            </label>
            <div className="dynamic-form__radio-group">
              {options?.map((option, idx) => (
                <label key={idx} className="dynamic-form__radio-label">
                  <input
                    type="radio"
                    name={key}
                    value={option}
                    checked={value === option}
                    onChange={handleChange}
                    className="dynamic-form__radio"
                  />
                  <span className="dynamic-form__radio-box"></span>
                  <span className="dynamic-form__radio-text">{option}</span>
                </label>
              ))}
            </div>
            {error && <span className="dynamic-form__error">{error}</span>}
          </div>
        );
      
      default: // text, email, tel, number, date
        return (
          <div className={`dynamic-form__field ${error ? 'dynamic-form__field--error' : ''}`} key={key}>
            <label htmlFor={key} className="dynamic-form__label">
              {label} {required && <span className="dynamic-form__required">*</span>}
            </label>
            <input
              type={type}
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className="dynamic-form__input"
            />
            {error && <span className="dynamic-form__error">{error}</span>}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="dynamic-form__loading">
        <div className="dynamic-form__spinner"></div>
        <p>Loading form...</p>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="dynamic-form__empty">
        <p>Form is not available at the moment. Please try again later.</p>
      </div>
    );
  }

  return (
    <form className={`dynamic-form ${className}`} onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="dynamic-form__success">
          {successMessage || 'Thank you! Your submission has been received.'}
        </div>
      )}
      
      {submitError && (
        <div className="dynamic-form__submit-error">
          {submitError}
        </div>
      )}
      
      <div className="dynamic-form__grid">
        {fields
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(field => renderField(field))}
      </div>
      
      <div className="dynamic-form__submit">
        <button 
          type="submit" 
          className="dynamic-form__button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
