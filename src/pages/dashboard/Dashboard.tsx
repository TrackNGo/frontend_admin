import Headline from "../../components/headline/Headline"
import DashBoardCard from "../../components/card/DashBoardCard"
import { useEffect, useState } from "react"
import axios from "axios"
import summaryApi from "../../common/summaryApi"

const Dashboard = () => {
  const [busCounts, setBusCounts] = useState({
    total: 0,
    active: 0,
    nonActive: 0,
  })

  const fetchBusData = async () => {
    try {
      const [totalResponse, activeResponse, nonActiveResponse] = await Promise.all([
        axios({ method: summaryApi.bus.totalBuses.method, url: summaryApi.bus.totalBuses.url }),
        axios({ method: summaryApi.bus.totalActiveBuses.method, url: summaryApi.bus.totalActiveBuses.url }),
        axios({ method: summaryApi.bus.totalNonActiveBuses.method, url: summaryApi.bus.totalNonActiveBuses.url }),
      ])
      setBusCounts({
        total: totalResponse.data.totalBuses,
        active: activeResponse.data.activeBuses,
        nonActive: nonActiveResponse.data.nonActiveBuses,
      })
      console.log(totalResponse.data)
      console.log(activeResponse.data)
      console.log(nonActiveResponse.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBusData()
  }, [])

  const cardsData = [
    {
      title: 'Total Buses',
      count: busCounts.total,
      description: 'Total Number of Buses in the System.',
      iconClass: 'fas fa-bus',
      iconColor: 'text-blue-500 hover:text-blue-600',
    },
    {
      title: 'Active Buses',
      count: busCounts.active,
      description: 'Total Number of Active Buses.',
      iconClass: 'fas fa-bus',
      iconColor: 'text-green-500 hover:text-green-600',
    },
    {
      title: 'Non-Active Buses',
      count: busCounts.nonActive,
      description: 'Total Number of Non-Active Buses.',
      iconClass: 'fas fa-bus',
      iconColor: 'text-red-500 hover:text-red-600',
    },
  ]

  return (
    <div className="px-2">
      <Headline title="Dashboard" />
      <div className="min-h-screen p-10">
        <div className="flex items-center gap-8 justify-center">
          {cardsData.map((card, index) => (
            <DashBoardCard
              key={index}
              title={card.title}
              description={card.description}
              count={card.count}
              iconClass={card.iconClass}
              iconColor={card.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
