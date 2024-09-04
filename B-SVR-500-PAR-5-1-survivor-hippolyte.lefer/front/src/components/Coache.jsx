import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]); // State to store employees data
  const [selectedCoach, setSelectedCoach] = useState(null); // State to keep track of selected coach's customers
  const [checkedCustomers, setCheckedCustomers] = useState({}); // State to manage checked customers dynamically
  const [currentPage, setCurrentPage] = useState(1); // State to handle pagination
  const [coachesPerPage] = useState(5); // Number of coaches per page
  const [detailedCoaches, setDetailedCoaches] = useState({}); // State to store detailed coach data by ID

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch employees data when component mounts
  useEffect(() => {
    fetchCoachesData();
  }, []);

  const fetchCoachesData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees data');
      }
      const data = await response.json();
      setCoaches(data); // Update state with fetched employees data
      initializeCheckedCustomers(data); // Initialize checked customers dynamically
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Function to fetch detailed coach data by ID
  const fetchCoachDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for employee ID: ${id}`);
      }
      const data = await response.json();
      setDetailedCoaches((prevState) => ({
        ...prevState,
        [id]: data,
      }));
    } catch (error) {
      console.error(`Error fetching employee details for ID ${id}:`, error);
    }
  };

  // Initialize checkedCustomers state based on the fetched coaches
  const initializeCheckedCustomers = (coachesData) => {
    const initialCheckedCustomers = {};
    coachesData.forEach((coach) => {
      const coachName = `${coach.Name} ${coach.Surname}`;
      initialCheckedCustomers[coachName] = []; // Initialize each coach's customer list as empty
    });
    setCheckedCustomers(initialCheckedCustomers);
  };

  // Function to handle the "Edit list..." click event
  const handleEditListClick = (coachName) => {
    setSelectedCoach(coachName); // Set the selected coach's name
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (coachName, customerName) => {
    setCheckedCustomers((prevState) => {
      const isChecked = prevState[coachName]?.includes(customerName);
      if (isChecked) {
        return {
          ...prevState,
          [coachName]: prevState[coachName].filter((name) => name !== customerName),
        };
      } else {
        return {
          ...prevState,
          [coachName]: [...(prevState[coachName] || []), customerName],
        };
      }
    });
  };

  // Shared fake customer data for all coaches
  const fakeCustomers = ["Louis Bagneul", "Véronique Tanson", "Angele Labelge", "Nicolas Tarabavich"];

  // Get current coaches for pagination
  const indexOfLastCoach = currentPage * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(coaches.length / coachesPerPage);

  // Generate pagination buttons
  const paginationButtons = [];
  if (totalPages > 1) {
    // First page
    paginationButtons.push(
      <button
        key="first"
        onClick={() => paginate(1)}
        className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        1
      </button>
    );

    // Ellipsis for pages between the first and current page
    if (currentPage > 3) {
      paginationButtons.push(<span key="dots1" className="px-2">...</span>);
    }

    // Previous page
    if (currentPage > 2) {
      paginationButtons.push(
        <button
          key={currentPage - 1}
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 mx-1 bg-gray-300"
        >
          {currentPage - 1}
        </button>
      );
    }

    // Current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      paginationButtons.push(
        <button
          key={currentPage}
          onClick={() => paginate(currentPage)}
          className="px-4 py-2 mx-1 bg-blue-500 text-white"
        >
          {currentPage}
        </button>
      );
    }

    // Next page
    if (currentPage < totalPages - 1) {
      paginationButtons.push(
        <button
          key={currentPage + 1}
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gray-300"
        >
          {currentPage + 1}
        </button>
      );
    }

    // Ellipsis for pages between the current and last page
    if (currentPage < totalPages - 2) {
      paginationButtons.push(<span key="dots2" className="px-2">...</span>);
    }

    // Last page
    paginationButtons.push(
      <button
        key="last"
        onClick={() => paginate(totalPages)}
        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className='flex h-screen w-screen'>
      <Sidebar />
      <div className="h-screen w-full p-8 bg-white text-black overflow-auto">
        {/* Coaches Header */}
        <div className="mb-8 border-b-2 border-black">
          <h1 className="text-4xl text-left mb-4">Coaches</h1>
        </div>

        {/* Coaches Table with Pagination */}
        <div className="border-2 border-black m-4 bg-gray-100">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-blue-400">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-white">#</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Name</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Email</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Customers</th>
                <th className="border border-gray-400 px-4 py-2 text-white">Birth Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentCoaches) && currentCoaches.map((coach, index) => {
                const coachDetails = detailedCoaches[coach.ID];
                // Fetch birth date if not already fetched
                if (!coachDetails) {
                  fetchCoachDetails(coach.ID);
                }
                const coachName = `${coach.Name} ${coach.Surname}`;
                return (
                  <tr key={coach.ID}>
                    <td className="border border-gray-400 px-4 py-2">{indexOfFirstCoach + index + 1}</td>
                    <td className="border border-gray-400 px-4 py-2">{coachName}</td>
                    <td className="border border-gray-400 px-4 py-2">{coach.Email}</td>
                    <td className="border border-gray-400 px-4 py-2 text-blue-500 cursor-pointer" onClick={() => handleEditListClick(coachName)}>Edit list ...</td>
                    <td className="border border-gray-400 px-4 py-2">{coachDetails ? coachDetails.Birth_date : 'Loading...'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {paginationButtons}
          </div>
        </div>

        {/* List of Customers Associated with Selected Coach */}
        {selectedCoach && (
          <div className="mt-8">
            <h2 className="text-2xl mb-4">Customers for {selectedCoach}</h2>
            <ul className="list-none pl-0">
              {fakeCustomers.map((customer, index) => (
                <li key={index} className="pb-2">
                  <input
                    type="checkbox"
                    id={`customer-${selectedCoach}-${index}`}
                    name={`customer-${selectedCoach}-${index}`}
                    className="mr-2"
                    checked={checkedCustomers[selectedCoach]?.includes(customer)}
                    onChange={() => handleCheckboxChange(selectedCoach, customer)}
                  />
                  <label htmlFor={`customer-${selectedCoach}-${index}`}>{customer}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Register Button */}
      <button
        className='bg-blue-500 text-white px-4 py-2 fixed bottom-4 right-12 hover:bg-blue-600'
        onClick={() => navigate('/register')}
      >
        Register
      </button>
    </div>
  );
};

export default Coaches;
