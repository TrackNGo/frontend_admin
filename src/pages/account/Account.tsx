import { useNavigate } from "react-router-dom"
import Card from "../../components/card/Card"
import Headline from "../../components/headline/Headline"

const Account = () => {
    const navigate = useNavigate() // Hook for navigation

    const handleManage = (path: string) => {
        navigate(path) // Navigate to the specified route
    }

    const cards = [
        {
            title: 'View Account',
            description: 'Check and view the list of all accounts in the system.',
            iconClass: 'fas fa-search',
            iconColor: 'text-blue-500',
            action: () => handleManage('/account/view'), // Route to "View Timetable" page
        },
        {
            title: 'Add Account',
            description: 'Register a new account to the system with all details.',
            iconClass: 'fas fa-plus-circle',
            iconColor: 'text-green-500',
            action: () => handleManage('/account/createaccount'), // Route to "Add Timetable" page
        }
    ]

    return (
        <div className='px-2'>
            <Headline title="Accounts" />
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

export default Account