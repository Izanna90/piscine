import { NavLink } from 'react-router-dom';


export default function Sidebar() {

  const sidebarItems = [
    { to: '/dashboard', label: 'Home' },
    { to: '/account-management', label: 'Coaches' },
    { to: '/client-profile', label: 'Customers' },
    { to: '/statistics', label: 'Statistics' },
    { to: '/advice', label: 'Tips' },
    { to: '/events', label: 'Events' },

    { to: '/astral', label: 'Astral'},
    { to: '/pantry', label: 'Pantry'}
  ];
  
  return (
    <aside className='fixed-top my-8'>
      <div className='w-fit h-full border-solid border-r-2 border-black'>
        <nav className='p-4'>
          <ul className='space-y-0'>
            {sidebarItems.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg text-[#000000] ${
                      isActive ? 'bg-[#707070] shadow-sm shadow-black' : 'bg-white'
                    }`
                  }
                >
                  <span className='text-2xl px-2'>{item.label}</span>
                </NavLink>
                {index < sidebarItems.length - 1 && (
                  <hr className='border-solid border-t-2 p-1 border-black' />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
