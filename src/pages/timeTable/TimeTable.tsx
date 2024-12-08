import { useNavigate } from "react-router-dom"
import Card from "../../components/card/Card"
import Headline from "../../components/headline/Headline"

const TimeTable = () => {
    const navigate = useNavigate() // Hook for navigation

    const handleManage = (path: string) => {
        navigate(path) // Navigate to the specified route
    }
    
    const cards = [
        {
            title: 'View Time Table',
            description: 'Check and view the list of all buses in the system.',
            iconClass: 'fas fa-search',
            iconColor: 'text-blue-500',
            action: () => handleManage('/timetable/view'), // Route to "View Timetable" page
        },
        {
            title: 'Add Time Table',
            description: 'Register a new bus to the system with all details.',
            iconClass: 'fas fa-plus-circle',
            iconColor: 'text-green-500',
            action: () => handleManage('/timetable/add'), // Route to "Add Timetable" page
        }
    ]

    return (
        <div className='px-2'>
            <Headline title="Bus" />
            <div className="min-h-screen p-10">
                <div className="flex items-center gap-8 justify-center">
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

export default TimeTable