import React from 'react';
import Sidebar from './Sidebar';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area,
  LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';

const data = [
  { name: '2012', value: 200 },
  { name: '2013', value: 400 },
  { name: '2014', value: 100 },
  { name: '2015', value: 300 },
  { name: '2016', value: 500 },
];

const gaugeData = [
  { name: 'Good', value: 33, fill: '#00C49F' },
  { name: 'OK', value: 33, fill: '#FFBB28' },
  { name: 'Bad', value: 34, fill: '#FF8042' },
];

const pieData = [
  { name: '2012', value: 1290 },
  { name: '2013', value: 4677 },
  { name: '2014', value: 1728 },
  { name: '2015', value: 1060 },
  { name: '2016', value: 1244 },
];

const Statistics = () => {
  return (
    <div className='flex h-screen w-screen'>
    <Sidebar></Sidebar>
    <div className="h-screen w-full p-8 bg-white text-black">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black">
        <h1 className="text-3xl mb-4">Statistics</h1>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Gauge Chart */}
        <div className="border-2 border-gray-300 p-4">
          <h3 className="text-center mb-2">Quality Score</h3>
          <ResponsiveContainer width="100%" height={150}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={gaugeData}>
              <RadialBar minAngle={15} clockWise dataKey="value" />
              <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data} layout="vertical" margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Second Horizontal Bar Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data} layout="vertical" margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vertical Bar Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Second Area Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="border-2 border-gray-300 p-4">
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Statistics;
  