import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import Headline from '../../components/headline/Headline'
import Card from '../../components/card/Card'

const Bus = () => {
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
        <div className='px-2'>
            <Headline title="Bus" />
            <div className="min-h-screen p-10 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards && cards.map((card, index) => (
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
