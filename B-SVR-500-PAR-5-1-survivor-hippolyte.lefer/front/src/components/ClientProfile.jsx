import React from 'react';

const ClientProfile = () => {
  const client = {
    name: 'John Doe',
    photo: 'url/to/photo.jpg',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    description: 'Looking for a serious relationship.',
    meetings: [
      { date: '2024-08-01', rating: 4, comment: 'Good meeting', method: 'Dating App' },
      { date: '2024-08-05', rating: 2, comment: 'No chemistry', method: 'Mutual Friend' },
    ],
    payments: [
      { date: '2024-07-01', amount: '$100' },
      { date: '2024-08-01', amount: '$100' },
    ],
  };

  return (
    <div className="w-full h-full p-8 bg-[#FFD6A5]">
      <h1 className="text-3xl font-bold text-[#4B4B4B] mb-6">Client Profile</h1>
      <div className="bg-white p-4 shadow-xl rounded-md">
        <h2 className="text-xl font-semibold text-[#7D7D7D]">{client.name}</h2>
        <img src={client.photo} alt="Client Photo" className="rounded-full w-24 h-24 my-4"/>
        <p><strong>Address:</strong> {client.address}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Description:</strong> {client.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Meetings</h3>
          {client.meetings.map((meeting, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p>Date: {meeting.date}</p>
              <p>Rating: {meeting.rating} / 5</p>
              <p>Comment: {meeting.comment}</p>
              <p>Method: {meeting.method}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
