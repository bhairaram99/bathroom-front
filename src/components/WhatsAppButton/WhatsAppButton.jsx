import { useState, useEffect } from 'react';
import api from '../../services/api';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [phoneNumber, setPhoneNumber] = useState('447912345678'); // Default fallback
  const message = 'Hello! I would like to inquire about your services.';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.getSettings();
        if (response.data?.settings?.whatsappNumber) {
          // Remove all non-digit characters except + at the beginning
          let cleanNumber = response.data.settings.whatsappNumber.trim();
          // Remove spaces, dashes, parentheses, and any other formatting
          cleanNumber = cleanNumber.replace(/[\s()\-]/g, '');
          // Remove the + sign (WhatsApp API doesn't need it in the URL)
          cleanNumber = cleanNumber.replace(/^\+/, '');
          console.log('WhatsApp number cleaned:', cleanNumber);
          setPhoneNumber(cleanNumber);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp settings:', error);
        // Continue using default number on error
      }
    };

    fetchSettings();
  }, []);
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-icon"
      >
        <path
          d="M27.281 4.65C24.318 1.686 20.373 0.028 16.192 0C7.355 0 0.154 7.2 0.151 16.037C0.15 18.882 0.876 21.665 2.259 24.116L0 32L8.072 29.782C10.452 31.045 13.099 31.709 15.788 31.71H15.793C24.628 31.71 31.831 24.509 31.834 15.671C31.835 11.495 30.244 7.614 27.281 4.65ZM16.192 29.032H16.187C13.763 29.031 11.385 28.398 9.308 27.2L8.822 26.912L3.815 28.175L5.104 23.293L4.788 22.79C3.476 20.639 2.787 18.17 2.788 15.638C2.79 8.636 8.554 2.872 15.559 2.872C19.026 2.873 22.263 4.224 24.732 6.695C27.201 9.166 28.551 12.404 28.55 15.87C28.548 22.872 22.784 29.032 16.192 29.032ZM22.752 18.959C22.402 18.783 20.677 17.934 20.353 17.809C20.029 17.684 19.791 17.622 19.553 17.972C19.315 18.322 18.653 19.121 18.44 19.359C18.227 19.597 18.014 19.622 17.664 19.446C17.314 19.27 16.159 18.885 14.783 17.663C13.711 16.709 12.998 15.527 12.785 15.177C12.572 14.827 12.762 14.627 12.938 14.452C13.097 14.293 13.288 14.037 13.464 13.824C13.64 13.611 13.702 13.461 13.827 13.223C13.952 12.985 13.889 12.772 13.801 12.596C13.713 12.42 12.999 10.694 12.7 9.994C12.408 9.311 12.112 9.407 11.892 9.396C11.684 9.386 11.446 9.384 11.208 9.384C10.97 9.384 10.595 9.472 10.271 9.822C9.947 10.172 9.048 11.021 9.048 12.747C9.048 14.473 10.296 16.149 10.472 16.387C10.648 16.625 12.997 20.364 16.616 21.875C17.485 22.259 18.163 22.488 18.693 22.659C19.564 22.929 20.36 22.89 20.989 22.8C21.693 22.7 23.102 21.95 23.401 21.125C23.7 20.3 23.7 19.597 23.612 19.447C23.524 19.297 23.102 19.135 22.752 18.959Z"
          fill="white"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
