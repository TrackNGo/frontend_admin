import { useState, useEffect, useRef } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const NavBar = () => {
    const [activeDropdown, setActiveDropdown] = useState<'bus' | 'timeTable' | null>(null)

    const busDropdownRef = useRef<HTMLUListElement | null>(null)
    const timeTableDropdownRef = useRef<HTMLUListElement | null>(null)
    const navRef = useRef<HTMLDivElement | null>(null)

    const navItems = [
        { label: 'Dashboard', link: '/' },
        { label: 'Login', link: '/login' },
        { label: 'Account', link: '/account' }
    ]

    const busItems = [
        { label: 'Bus', link: '/bus' },
        { label: 'Bus Search', link: '/bus/view' },
        { label: 'Buses', link: '/bus/buses' },
        { label: 'Add Bus', link: '/bus/addbus' },
        { label: 'Add Bus Route', link: '/bus/addbusroute' }
    ]

    const timeTableItems = [
        { label: 'Time Table', link: '/timetable' },
        { label: 'View Time Table', link: '/timetable/view' },
        { label: 'Add Time Table', link: '/timetable/add' }
    ]

    const toggleDropdown = (dropdown: 'bus' | 'timeTable') => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null) // Close the dropdown if it's already open
        } else {
            setActiveDropdown(dropdown) // Open the selected dropdown and close the other
        }
    }

    // Close dropdowns if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        if (
            navRef.current && !navRef.current.contains(event.target as Node) // Check if the click is outside the nav bar
        ) {
            setActiveDropdown(null) // Close all dropdowns
        }
    }

    useEffect(() => {
        // Add event listener for clicks outside the dropdown
        document.addEventListener('click', handleClickOutside)

        // Automatically close the dropdown after 8 seconds
        const timer = setTimeout(() => {
            setActiveDropdown(null)
        }, 8000)

        // Clean up the event listener and timer on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside)
            clearTimeout(timer)
        }
    }, [])

    return (
        <nav ref={navRef} className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Branding */}
                <div className="text-2xl font-bold">Admin Panel</div>

                {/* Navigation Links */}
                <ul className="flex space-x-6 relative">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.link}
                                className="hover:text-gray-300 transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}

                    {/* Bus Dropdown */}
                    <li className="relative cursor-pointer">
                        <div
                            className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200"
                            onClick={() => toggleDropdown('bus')}
                        >
                            <span>Bus</span>
                            {activeDropdown === 'bus' ? (
                                <FaChevronUp className="text-sm" />
                            ) : (
                                <FaChevronDown className="text-sm" />
                            )}
                        </div>
                        {activeDropdown === 'bus' && (
                            <ul
                                ref={busDropdownRef}
                                className="absolute bg-gray-800 mt-2 rounded shadow-lg w-48"
                            >
                                {busItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {/* Time Table Dropdown */}
                    <li className="relative cursor-pointer">
                        <div
                            className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200"
                            onClick={() => toggleDropdown('timeTable')}
                        >
                            <span>Time Table</span>
                            {activeDropdown === 'timeTable' ? (
                                <FaChevronUp className="text-sm" />
                            ) : (
                                <FaChevronDown className="text-sm" />
                            )}
                        </div>
                        {activeDropdown === 'timeTable' && (
                            <ul
                                ref={timeTableDropdownRef}
                                className="absolute bg-gray-800 mt-2 rounded shadow-lg w-48"
                            >
                                {timeTableItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>

                {/* Profile/Logout */}
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Admin</span>
                    <button className="bg-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
