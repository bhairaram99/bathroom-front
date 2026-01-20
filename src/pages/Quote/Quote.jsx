import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quote.css';

const Quote = () => {
  const navigate = useNavigate();

  // Form configuration - designed to be fetched from admin panel in future
  const formConfig = {
    projectTypes: ['Bathroom', 'Kitchen', 'Both'],
    projectScopes: ['New Installation', 'Renovation', 'Remodeling'],
    budgetRanges: [
      { label: 'Under €5,000', value: 'under-5000' },
      { label: '€5,000 - €10,000', value: '5000-10000' },
      { label: '€10,000 - €20,000', value: '10000-20000' },
      { label: '€20,000 - €50,000', value: '20000-50000' },
    ],
    projectTimelines: [
      'ASAP',
      'Within 1 month',
      'Within 3 months',
      'Within 6 months',
      'Not sure yet',
    ],
    propertyTypes: ['House', 'Flat/Apartment', 'Commercial'],
  };

  const [formData, setFormData] = useState({
    name: '',
    howAreYou: '',
    email: '',
    phone: '',
    projectType: '',
    projectScope: '',
    budgetRange: '',
    projectTimeline: '',
    propertyType: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.howAreYou.trim()) {
      newErrors.howAreYou = 'This field is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.projectScope) {
      newErrors.projectScope = 'Please select a project scope';
    }

    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select a budget range';
    }

    if (!formData.projectTimeline) {
      newErrors.projectTimeline = 'Please select a timeline';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Send form data to backend API
      console.log('Form submitted:', formData);
      
      // Show success message (you can replace with a toast notification)
      alert('Thank you! Your quote request has been submitted.');
      
      // Navigate back to home or success page
      navigate('/');
    }
  };

  return (
    <div className="quote-page">
      <div className="quote-page__container">
        <div className="quote-form">
          <h1 className="quote-form__title">Get a Quote</h1>
          <p className="quote-form__subtitle">
            Request a quote for your bathroom or kitchen project
          </p>

          <form onSubmit={handleSubmit}>
            {/* Your Name */}
            <div className="form-field">
              <label htmlFor="name" className="form-field__label">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`form-field__input ${
                  errors.name ? 'form-field__input--error' : ''
                }`}
              />
              {errors.name && (
                <span className="form-field__error">{errors.name}</span>
              )}
            </div>

            {/* How are you? */}
            <div className="form-field">
              <label htmlFor="howAreYou" className="form-field__label">
                How are you? <span className="required">*</span>
              </label>
              <input
                type="text"
                id="howAreYou"
                name="howAreYou"
                value={formData.howAreYou}
                onChange={handleChange}
                placeholder=""
                className={`form-field__input ${
                  errors.howAreYou ? 'form-field__input--error' : ''
                }`}
              />
              {errors.howAreYou && (
                <span className="form-field__error">{errors.howAreYou}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="form-field">
              <label htmlFor="email" className="form-field__label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`form-field__input ${
                  errors.email ? 'form-field__input--error' : ''
                }`}
              />
              {errors.email && (
                <span className="form-field__error">{errors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-field">
              <label htmlFor="phone" className="form-field__label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 (0) 123 456 7890"
                className={`form-field__input ${
                  errors.phone ? 'form-field__input--error' : ''
                }`}
              />
              {errors.phone && (
                <span className="form-field__error">{errors.phone}</span>
              )}
            </div>

            {/* Project Type */}
            <div className="form-field">
              <label htmlFor="projectType" className="form-field__label">
                Project Type <span className="required">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`form-field__select ${
                  errors.projectType ? 'form-field__select--error' : ''
                }`}
              >
                <option value="">Select a project type</option>
                {formConfig.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <span className="form-field__error">{errors.projectType}</span>
              )}
            </div>

            {/* Project Scope */}
            <div className="form-field">
              <label htmlFor="projectScope" className="form-field__label">
                Project Scope <span className="required">*</span>
              </label>
              <select
                id="projectScope"
                name="projectScope"
                value={formData.projectScope}
                onChange={handleChange}
                className={`form-field__select ${
                  errors.projectScope ? 'form-field__select--error' : ''
                }`}
              >
                <option value="">Select project scope</option>
                {formConfig.projectScopes.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope}
                  </option>
                ))}
              </select>
              {errors.projectScope && (
                <span className="form-field__error">{errors.projectScope}</span>
              )}
            </div>

            {/* Budget Range */}
            <div className="form-field">
              <label htmlFor="budgetRange" className="form-field__label">
                Budget Range <span className="required">*</span>
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className={`form-field__select ${
                  errors.budgetRange ? 'form-field__select--error' : ''
                }`}
              >
                <option value="">Select your budget range</option>
                {formConfig.budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budgetRange && (
                <span className="form-field__error">{errors.budgetRange}</span>
              )}
            </div>

            {/* Project Timeline */}
            <div className="form-field">
              <label htmlFor="projectTimeline" className="form-field__label">
                Project Timeline <span className="required">*</span>
              </label>
              <select
                id="projectTimeline"
                name="projectTimeline"
                value={formData.projectTimeline}
                onChange={handleChange}
                className={`form-field__select ${
                  errors.projectTimeline ? 'form-field__select--error' : ''
                }`}
              >
                <option value="">When do you need this done?</option>
                {formConfig.projectTimelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
              {errors.projectTimeline && (
                <span className="form-field__error">
                  {errors.projectTimeline}
                </span>
              )}
            </div>

            {/* Property Type */}
            <div className="form-field">
              <label htmlFor="propertyType" className="form-field__label">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="form-field__select"
              >
                <option value="">Select property type</option>
                {formConfig.propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Details */}
            <div className="form-field">
              <label htmlFor="additionalDetails" className="form-field__label">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                placeholder="Tell us more about your project..."
                rows="4"
                className="form-field__textarea"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="quote-form__submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quote;
