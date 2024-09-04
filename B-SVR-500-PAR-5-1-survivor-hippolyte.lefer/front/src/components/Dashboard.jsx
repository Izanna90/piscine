import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className='flex h-screen w-screen'>
    <Sidebar></Sidebar>
    <div className="h-screen w-full p-8 bg-white text-black">
      <div className='border-b-2 border-black mb-8'>
        <h1 className="text-6xl text-center uppercase">Soul Connection</h1>
        <h2 className='text-4xl text-center pb-4'>Dashboard</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 pl-4 pr-4">

        <div className="border-2 border-black p-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#606060" />
              <Bar dataKey="uv" fill="#aeb0af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border-2 border-black p-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#606060" />
              <Bar dataKey="uv" fill="#aeb0af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border-2 border-black p-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#606060" />
              <Bar dataKey="uv" fill="#aeb0af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="m-8 border-2 border-black">
        <table className="table-auto w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Seq</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Period</th>
              <th className="border px-4 py-2">Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Tea</td>
              <td className="border px-4 py-2">cat1</td>
              <td className="border px-4 py-2">Jan-11</td>
              <td className="border px-4 py-2">20K</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Coffee</td>
              <td className="border px-4 py-2">cat2</td>
              <td className="border px-4 py-2">Jan-11</td>
              <td className="border px-4 py-2">15K</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">Milk</td>
              <td className="border px-4 py-2">cat3</td>
              <td className="border px-4 py-2">Jan-11</td>
              <td className="border px-4 py-2">5K</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">Cereal</td>
              <td className="border px-4 py-2">cat4</td>
              <td className="border px-4 py-2">Jan-11</td>
              <td className="border px-4 py-2">30K</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">Chocolate</td>
              <td className="border px-4 py-2">cat5</td>
              <td className="border px-4 py-2">Jan-11</td>
              <td className="border px-4 py-2">25K</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
