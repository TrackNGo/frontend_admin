import { useNavigate } from "react-router-dom"
import Card from "../../components/card/Card"
import Headline from "../../components/headline/Headline"

const FareEstimate = () => {
    const navigate = useNavigate() // Hook for navigation

    const handleManage = (path: string) => {
        navigate(path) // Navigate to the specified route
    }

    const cards = [
        {
            title: 'View Fare Estimate',
            description: 'Check and view the list of Fare Estimate in the system.',
            iconClass: 'fas fa-search',
            iconColor: 'text-blue-500',
            action: () => handleManage('/fareestimate/add'), // Route to "View Buses" page
        },
        {
            title: 'Add Fare Estimate',
            description: 'Add a new Fare Estimate to the system with all details.',
            iconClass: 'fas fa-plus-circle',
            iconColor: 'text-green-500',
            action: () => handleManage('/fareestimate/view'), // Route to "Add Bus" page
        },
    ]

    return (
        <div className='px-2'>
            <Headline title="Fare Estimate" />
            <div className="min-h-screen p-10">
                <div className="flex items-center gap-8 justify-center">
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

export default FareEstimate
