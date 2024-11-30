interface EditableFieldProps {
    name: string
    label: string
    value: string | number | boolean | any
    onChange: (e: any) => void
    isSelect?: boolean
    options?: string[]
}

const CheckField: React.FC<EditableFieldProps> = ({
    name,
    label,
    value,
    onChange,
    isSelect = false,
    options = []
}) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (name === 'status') {
            // Convert Active/Inactive to boolean true/false
            onChange({
                target: {
                    name,
                    value: e.target.value === 'Active' ? true : false,
                },
            });
        } else {
            onChange(e);
        }
    };

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="py-4 px-6 font-medium text-gray-700">{label}</td>
            <td className="py-4 px-6">
                {isSelect ? (
                    <select
                        name={name}
                        value={value ? 'Active' : 'Inactive'} // Map true/false to Active/Inactive
                        onChange={handleSelectChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                )}
            </td>
        </tr>
    );
};

export default CheckField;
