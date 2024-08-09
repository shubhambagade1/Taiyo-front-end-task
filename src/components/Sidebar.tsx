import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaAddressBook, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    // setting the state variable for toggler
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the sidebar open/closed state
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='lg:mr-4'>
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-4 text-2xl text-gray-700"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-64 sm: z-20`}
            >
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <h1 className="text-xl font-bold">Sidebar</h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl text-white"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ul>
                    <li>
                        <Link
                            to="/contact"
                            onClick={toggleSidebar} 
                            className="flex items-center p-4 hover:bg-gray-700"
                        >
                            <FaAddressBook className="mr-3" />
                            <span>Contact</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/graphs"
                            onClick={toggleSidebar}  
                            className="flex items-center p-4 hover:bg-gray-700"
                        >
                            <FaChartBar className="mr-3" />
                            <span>Covid Record</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
