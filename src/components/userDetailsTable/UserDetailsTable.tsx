import React from "react"
import UserTypes from "../../types/user/UserTypes"
import EditableField from "../editableField/EditableField"

interface UserDetailsTableProps {
  userDetails: UserTypes
  isEditing: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const UserDetailsTable = React.memo(({ userDetails, isEditing, handleChange }: UserDetailsTableProps) => (
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
                      name="username"
                      label="Username"
                      value={userDetails.username}
                      onChange={handleChange}
                  />
                  <EditableField
                      name="firstName"
                      label="First Name"
                      value={userDetails.firstName}
                      onChange={handleChange}
                  />
                  <EditableField
                      name="lastName"
                      label="Last Name"
                      value={userDetails.lastName}
                      onChange={handleChange}
                  />
                  <EditableField
                      name="nic"
                      label="NIC"
                      value={userDetails.nic}
                      onChange={handleChange}
                  />
                  <EditableField
                      name="mobile"
                      label="Mobile"
                      value={userDetails.mobile}
                      onChange={handleChange}
                  />
              </>
          ) : (
              <>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">Username</td>
                      <td className="py-4 px-6">{userDetails.username}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">First Name</td>
                      <td className="py-4 px-6 capitalize">{userDetails.firstName}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">Last Name</td>
                      <td className="py-4 px-6 capitalize">{userDetails.lastName}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">Account Type</td>
                      <td className="py-4 px-6 capitalize">{userDetails.accType}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">NIC</td>
                      <td className="py-4 px-6 capitalize">{userDetails.nic}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">Mobile</td>
                      <td className="py-4 px-6 capitalize">{userDetails.mobile}</td>
                  </tr>
              </>
          )}
      </tbody>
  </table>
))

export default UserDetailsTable
