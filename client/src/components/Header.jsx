import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <header className="flex justify-between items-center px-4 py-3 md:px-8 flex-wrap">
        {/* Logo Section */}
        <Link to={'/'} className="flex items-center gap-1 mb-2 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-lg md:text-xl">StayFinder</span>
        </Link>

        {/* Search Section */}
        <div className="hidden md:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 mb-2 md:mb-0">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        {/* User Account Section */}
        <Link
          to={user ? '/account' : '/login'}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-3 md:px-4 relative group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 md:w-6 md:h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
         
          {!!user && (
            <>
              <div className="hidden md:block">{user.email}</div>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-max px-3 py-1 bg-gray-700 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out md:hidden">
                {user.email}
              </div>
            </>
          )}
        </Link>
      </header>
    </div>
  );
}
