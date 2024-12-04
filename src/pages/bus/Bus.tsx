import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import Headline from '../../components/headline/Headline'

interface CardProps {
    title: string
    description: string
    iconClass: string
    iconColor: string
    onManage?: () => void
}

const Card: React.FC<CardProps> = ({ title, description, iconClass, iconColor, onManage }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow transform hover:scale-101">
        <div className={`flex items-center justify-center ${iconColor} mb-4`}>
            <i className={`${iconClass} text-5xl`}></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className='text-center'>
        <button
            onClick={onManage} // Handle button click
            className={`mt-4 px-4 py-2 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 transition-all`}
        >
            Manage
        </button>
        </div>
    </div>
)

const Bus: React.FC = () => {
    const navigate = useNavigate() // Hook for navigation

    const handleManage = (path: string) => {
        navigate(path) // Navigate to the specified route
    }

    const cards = [
        {
            title: 'View Buses',
            description: 'Check and view the list of all buses in the system.',
            iconClass: 'fas fa-search',
            iconColor: 'text-blue-500',
            action: () => handleManage('/bus/buses'), // Route to "View Buses" page
        },
        {
            title: 'Search Bus',
            description: 'Check and view the list of all buses in the system.',
            iconClass: 'fas fa-bus',
            iconColor: 'text-blue-500',
            action: () => handleManage('/bus/view'), // Route to "View Buses" page
        },
        {
            title: 'Add Bus',
            description: 'Register a new bus to the system with all details.',
            iconClass: 'fas fa-plus-circle',
            iconColor: 'text-green-500',
            action: () => handleManage('/bus/addbus'), // Route to "Add Bus" page
        },
        {
            title: 'Update & Modify Bus Details',
            description: 'Edit existing bus information as needed.',
            iconClass: 'fas fa-edit',
            iconColor: 'text-yellow-500',
            action: () => handleManage('/bus/view'), // Route to "Update Bus" page
        },
        {
            title: 'Delete Bus',
            description: 'Remove bus records that are no longer needed.',
            iconClass: 'fas fa-trash',
            iconColor: 'text-red-500',
            action: () => handleManage('/bus/view'), // Route to "Delete Bus" page
        },
    ]

    return (
        <div>
            <Headline title="Bus" />
            <div className="bg-gray-50 min-h-screen p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            iconClass={card.iconClass}
                            iconColor={card.iconColor}
                            onManage={card.action}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bus
