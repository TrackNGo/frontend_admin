import BusDetailsType from "../../types/busDetails/BusDetailsTypes"
import EditableField from "../editableField/EditableField"
import CheckField from "../editableField/CheckField"
import React from "react"

interface BusDetailsTableProps {
    busDetails: BusDetailsType
    isEditing: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const BusDetailsTable = React.memo(({ busDetails, isEditing, handleChange }: BusDetailsTableProps) => (
    <table className="mb-4 min-w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
        <thead>
            <tr className="bg-zinc-600 text-white">
                <th className="py-3 px-6 text-md font-medium text-left">Field</th>
                <th className="py-3 px-6 text-md font-medium text-left">Value</th>
            </tr>
        </thead>
        <tbody>
            {isEditing ? (
                <>
                    <EditableField
                        name="busNumber"
                        label="Bus Number"
                        value={busDetails.busNumber}
                        onChange={handleChange}
                    />
                    <EditableField
                        name="routeNumber"
                        label="Route Number"
                        value={busDetails.routeNumber}
                        onChange={handleChange}
                    />
                    <EditableField
                        name="startLocation"
                        label="Start Location"
                        value={busDetails.startLocation}
                        onChange={handleChange}
                    />
                    <EditableField
                        name="endLocation"
                        label="End Location"
                        value={busDetails.endLocation}
                        onChange={handleChange}
                    />
                    <EditableField
                        name="fareEstimate"
                        label="Fare Estimate"
                        value={busDetails.fareEstimate}
                        onChange={handleChange}
                    />
                    <CheckField
                        name="status"
                        label="Status"
                        value={busDetails.status ? true : false}
                        isSelect
                        options={["Active", "Inactive"]}
                        onChange={handleChange}
                    />
                    <EditableField
                        name="type"
                        label="Type"
                        value={busDetails.type}
                        isSelect
                        options={['Normal', 'Semi-Luxury', 'Luxury']}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Bus Number</td>
                        <td className="py-4 px-6 uppercase">{busDetails.busNumber}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Route Number</td>
                        <td className="py-4 px-6 capitalize">{busDetails.routeNumber}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Start Location</td>
                        <td className="py-4 px-6 capitalize">{busDetails.startLocation}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">End Location</td>
                        <td className="py-4 px-6 capitalize">{busDetails.endLocation}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Fare Estimate</td>
                        <td className="py-4 px-6 capitalize">Rs. {busDetails.fareEstimate}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Status</td>
                        <td className="py-4 px-6">
                            {busDetails.status ? (
                                <div className="relative flex items-center">
                                    <span className="absolute flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                                    </span>
                                    <span className="ml-5 text-green-600">Active</span>
                                </div>
                            ) : (
                                <div className="relative flex items-center">
                                    <span className="absolute flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <span className="ml-5 text-red-600">Inactive</span>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-700">Type</td>
                        <td className="py-4 px-6">{busDetails.type}</td>
                    </tr>
                </>
            )}
        </tbody>
    </table>
))

export default BusDetailsTable
