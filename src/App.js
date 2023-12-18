// src/components/RegistrationForm.js

import React, { useState } from 'react';
import './RegistrationForm.css';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    gender: '',
    selectedBatch: '',
    city: '',
    payment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate age
    if (!formData.age || isNaN(formData.age) || formData.age < 18 || formData.age > 65) {
      newErrors.age = 'Age must be between 18 and 65';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    
    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // Validate payment
    if (!formData.payment.trim()) {
      newErrors.payment = 'Payment details are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform form submission logic, e.g., make an API call
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div>
      <h2> Yoga Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:     <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <br />
        <label>
          Age:  <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>
        <br />
        <label>
          Email:  <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <br />
        <label>
          
          Gender:   <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </label>
        <br />
        
        <label>
          City:  <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </label>
        <br />
        <label>
          Payment:  <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          />
          {errors.payment && <span className="error">{errors.payment}</span>}
        </label>
        <br />
        
        <label>
          Select Batch:
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
          >
            <option value="">Select a batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
