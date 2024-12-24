import Headline from "../../components/headline/Headline"
import DashBoardCard from "../../components/card/DashBoardCard"

const Dashboard = () => {
  const cards =
  {
    title: 'Total Buses',
    count: 150,
    description: 'Total Number of the Buses Estimate in the System.',
    iconClass: 'fas fa-bus',
    iconColor: 'text-blue-500 hover:text-blue-600',
  }
  const cards1 =
  {
    title: 'Active Buses',
    count: 100,
    description: 'Total Number of the Buses Estimate in the System.',
    iconClass: 'fas fa-bus',
    iconColor: 'text-green-500 hover:text-green-600',
  }
  const cards2 =
  {
    title: 'Non-Active Buses',
    count: 100,
    description: 'Total Number of the Buses Estimate in the System.',
    iconClass: 'fas fa-bus',
    iconColor: 'text-red-500 hover:text-red-600',
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
            <DashBoardCard
              title={cards1.title}
              description={cards1.description}
              count={cards1.count}
              iconClass={cards1.iconClass}
              iconColor={cards1.iconColor}
            />
            <DashBoardCard
              title={cards2.title}
              description={cards2.description}
              count={cards2.count}
              iconClass={cards2.iconClass}
              iconColor={cards2.iconColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
