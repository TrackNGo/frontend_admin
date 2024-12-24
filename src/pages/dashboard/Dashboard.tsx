import Headline from "../../components/headline/Headline"
import DashBoardCard from "../../components/card/DashBoardCard"

const Dashboard = () => {
  const cards =
  {
    title: 'Total Buses',
    count: 150,
    description: 'Total Number of the Buses Estimate in the System.',
    iconClass: 'fas fa-bus',
    iconColor: 'text-blue-500',
  }


  return (
    <div className="px-2">
      <Headline title={"Dashboard"} />
      <div>
        <div className="min-h-screen p-10">
          <div className="flex items-center gap-8 justify-center">
            <DashBoardCard
              title={cards.title}
              description={cards.description}
              count={cards.count}
              iconClass={cards.iconClass}
              iconColor={cards.iconColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
