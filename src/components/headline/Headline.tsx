import HeadlineType from "../../types/headline/HeadlineType"

const Headline = (headline:HeadlineType) => {
    return (
        <div className="md:text-center border-b border-b-slate-200 pt-2 pb-2 md:mb-4">
            <h1 className="text-2xl md:text-3xl capitalize font-medium">{headline.title}</h1>
        </div>
    )
}

export default Headline