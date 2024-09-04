import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [picture, setPicture] = useState(null);
  const [work, setWork] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data object to include the picture file
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Surname', surname);
    formData.append('Email', email);
    formData.append('Gender', gender);
    formData.append('Birth_date', birthDate);
    formData.append('Work', work);
    formData.append('Picture', picture); // Appending the picture file
    
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    // Show loading indicator
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/employees/signup', {
        method: 'POST',
        body: formData, // Sending formData directly for file uploads
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);

      alert('Registration form submitted successfully!');

      // Reset form fields
      setName('');
      setSurname('');
      setEmail('');
      setGender('');
      setBirthDate('');
      setPicture(null);
      setWork('');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      // Hide loading indicator
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Surname</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              className="w-full border p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Birth Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Work</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="Enter your work"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Upload Picture</label>
            <input
              type="file"
              className="w-full"
              onChange={handlePictureChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
