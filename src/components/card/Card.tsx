import CardType from "../../types/card/CardType";

const Card = (card: CardType) => (
    <div className="bg-zinc-50 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow transform hover:scale-101">
        <div className={`flex items-center justify-center ${card.iconColor} mb-4`}>
            <i className={`${card.iconClass} text-5xl`}></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{card.title}</h3>
        <p className="text-gray-600 text-sm">{card.description}</p>
        <div className="text-center">
            <button
                onClick={card.onManage}
                className="mt-4 px-4 py-2 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 transition-all"
            >
                Manage
            </button>
        </div>
    </div>
)

export default Card