// API Service for connecting to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  // ==================== Quote Form ====================
  
  // Get quote form configuration (fields)
  async getQuoteFormConfig() {
    try {
      const response = await fetch(`${API_BASE_URL}/quote/config`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch quote form config');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching quote form config:', error);
      throw error;
    }
  }

  // Submit quote form
  async submitQuoteForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/quote/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quote form');
      }
      
      return data;
    } catch (error) {
      console.error('Error submitting quote form:', error);
      throw error;
    }
  }

  // ==================== Contact Form ====================
  
  // Get contact form configuration (fields)
  async getContactFormConfig() {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/config`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contact form config');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching contact form config:', error);
      throw error;
    }
  }

  // Submit contact form
  async submitContactForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }
      
      return data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
}

export const api = new ApiService();
export default api;
