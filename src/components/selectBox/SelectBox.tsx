import OptionType from "../../types/input/selectBox/SelectType";

const SelectBox = (option: OptionType) => {
    return (
        <div className="w-full">
            <label className="capitalize text-md font-medium text-gray-700">{option.title}</label>
            <select
                className="text-slate-400 w-full mt-1 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                required
                defaultValue=""
                name={option.name}
            >
                <option className="text-black" value="" disabled>
                    {option.placeholder}
                </option>
                {option.options?.map((op, index) => (
                    <option className="text-black" key={index} value={op}>
                        {op}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox;
