// src/components/RegistrationForm.js

import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    gender: '',
    phoneNumber: '',
    city: '',
    payment: '',
  });

  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Implement your validation logic here
    return true; // For simplicity, assume the form is always valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        const result = await response.json();
        console.log(result.message);
        // You can reset the form or perform any other actions upon successful submission
      } catch (error) {
        console.error('Error submitting the form:', error.message);
      }
    } else {
      setErrors('Form validation failed');
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (your form fields and error handling) */}
        <br />
        {errors && <span className="error">{errors}</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
