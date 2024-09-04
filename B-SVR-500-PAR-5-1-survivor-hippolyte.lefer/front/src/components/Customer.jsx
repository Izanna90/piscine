import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Customers = () => {
  // State to manage selected customer
  const [selectedCustomer, setSelectedCustomer] = useState("Louis Delanata");

  // State to handle profile pictures for each customer
  const [profilePictures, setProfilePictures] = useState({
    "Louis Delanata": null,
    "Marie Curie": null,
    "Albert Einstein": null,
    "Isaac Newton": null,
  });

  // Sample customer data
  const customerList = ["Louis Delanata", "Marie Curie", "Albert Einstein", "Isaac Newton"];

  const customerDetails = {
    "Louis Delanata": {
      birthDate: "09/06/1996",
      address: "3 Rue de la Tour, 34000 Montpellier, France",
      payments: [
        { date: "2023-12-01", amount: "200e", comment: "Subscription" },
        { date: "2024-01-10", amount: "300e", comment: "Subscription" },
        { date: "2024-02-20", amount: "200e", comment: "Subscription" },
      ],
      meetings: [
        { date: "2024-02-14", rating: "3/5", report: "Very good moment", source: "Dating App" },
        { date: "2024-03-12", rating: "4/5", report: "I love her!", source: "Friend of my friend" },
        { date: "2024-03-20", rating: "1/5", report: "HORRIBLE MOMENT", source: "At the bar" },
      ],
    },
    "Marie Curie": {
      birthDate: "07/11/1867",
      address: "24 Rue des Martyrs, 75009 Paris, France",
      payments: [
        { date: "2023-10-15", amount: "250e", comment: "Conference" },
        { date: "2024-01-05", amount: "400e", comment: "Research Fund" },
      ],
      meetings: [
        { date: "2024-02-18", rating: "5/5", report: "Great collaboration", source: "Science Expo" },
      ],
    },
    "Albert Einstein": {
      birthDate: "14/03/1879",
      address: "112 Mercer Street, Princeton, NJ, USA",
      payments: [
        { date: "2023-11-01", amount: "150e", comment: "Lecture" },
      ],
      meetings: [
        { date: "2024-02-25", rating: "5/5", report: "Brilliant mind", source: "Physics Conference" },
      ],
    },
    "Isaac Newton": {
      birthDate: "04/01/1643",
      address: "Woolsthorpe Manor, Lincolnshire, England",
      payments: [
        { date: "2023-09-10", amount: "300e", comment: "Publication" },
        { date: "2024-02-01", amount: "100e", comment: "Book Sales" },
      ],
      meetings: [
        { date: "2024-01-20", rating: "4/5", report: "Interesting discussion", source: "Royal Society" },
      ],
    },
  };

  // Function to handle customer change from the dropdown
  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  // Function to handle profile picture upload
  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newProfilePictures = { ...profilePictures };
      newProfilePictures[selectedCustomer] = URL.createObjectURL(file);
      setProfilePictures(newProfilePictures);
    }
  };

  // Function to trigger file input click
  const handlePictureClick = () => {
    document.getElementById("profile-picture-input").click();
  };

  return (
    <div className='flex h-screen w-screen'>
    <Sidebar></Sidebar>
    <div className="h-screen w-full p-8 bg-white text-black">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black">
        <h1 className="text-3xl mb-4">Customers</h1>
      </div>

      {/* Dropdown for customer selection */}
      <div className="mb-4">
        <label htmlFor="customer-select" className="mr-4 text-lg">Customer:</label>
        <select
          id="customer-select"
          value={selectedCustomer}
          onChange={handleCustomerChange}
          className="p-2 border border-gray-400 w-96 bg-gray-100 text-black rounded-lg shadow-md"
          style={{ width: '300px', height: '40px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0' }}
        >
          {customerList.map((customer, index) => (
            <option key={index} value={customer}>
              {customer}
            </option>
          ))}
        </select>
      </div>

      {/* Customer details and Profile picture section */}
      <div className="flex items-center mb-8 border-b-2 border-black">
        {/* Customer Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">👤 {selectedCustomer}</h2>
          <p className="text-lg">⭐ {customerDetails[selectedCustomer].birthDate}</p>
          <p className="text-lg">📍 {customerDetails[selectedCustomer].address}</p>
        </div>

        {/* Profile picture placeholder */}
        <div className="w-1/4 border-2 border-black h-48 flex items-center justify-center ml-4 cursor-pointer mb-6" onClick={handlePictureClick}>
          {profilePictures[selectedCustomer] ? (
            <img src={profilePictures[selectedCustomer]} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full border border-black flex items-center justify-center">
              <span className="text-4xl font-bold">X</span>
            </div>
          )}
        </div>
        {/* Hidden file input for uploading profile picture */}
        <input
          type="file"
          id="profile-picture-input"
          className="hidden"
          accept="image/*"
          onChange={handlePictureUpload}
        />
      </div>

      {/* Tables for Payments and Meetings */}
      <div className="flex justify-between">
        {/* Payments Table */}
        <div className="w-1/2 p-4 mr-2">
          <h3 className="text-xl font-bold mb-2">Payments</h3>
          <table className="table-auto w-full text-left border-collapse border-2 border-black">
            <thead className="bg-blue-400">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-white">Date</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Amount</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Comment</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails[selectedCustomer].payments.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{payment.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{payment.amount}</td>
                  <td className="border border-gray-400 px-4 py-2">{payment.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Meetings Table */}
        <div className="w-1/2 p-4 ml-2">
          <h3 className="text-xl font-bold mb-2">Meetings</h3>
          <table className="table-auto w-full text-left border-collapse border-2 border-black">
            <thead className="bg-blue-400">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-white">Date</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Rating</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Report</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Source</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails[selectedCustomer].meetings.map((meeting, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{meeting.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.rating}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.report}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Customers;
