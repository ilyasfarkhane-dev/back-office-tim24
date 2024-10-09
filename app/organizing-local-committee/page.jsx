"use client";

import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

export default function CommitteeTable() {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", affiliation: "" }); // State for new member

  // Function to open the update modal
  const openEditModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // Function to open the add member modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Function to close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedMember(null);
    setNewMember({ name: "", affiliation: "" });
  };

  // Function to handle form submission for editing
  const handleUpdate = (updatedMember) => {
    setData(
      data.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    closeModal();
  };

  // Function to add a new member
  const handleAddMember = () => {
    const newId = data.length + 1;
    setData([...data, { id: newId, ...newMember }]);
    closeModal();
  };

  // Function to delete a member
  const handleDelete = (id) => {
    setData(data.filter((member) => member.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Conference Organizing Local Committee (Juniors)
      </h1>
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Member
      </button>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Affiliation
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b last:border-none">
                <td className="py-4 px-6">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                </td>
                <td className="py-4 px-6 text-gray-600">{item.affiliation}</td>
                <td className="py-4 px-6 flex space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-600 transition"
                    onClick={() => openEditModal(item)}
                  >
                    <SquarePen className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate({
                  ...selectedMember,
                  name: e.target.name.value,
                  affiliation: e.target.affiliation.value,
                });
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedMember?.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Affiliation
                </label>
                <input
                  type="text"
                  name="affiliation"
                  defaultValue={selectedMember?.affiliation}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Adding */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMember();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={newMember.affiliation}
                  onChange={(e) =>
                    setNewMember({ ...newMember, affiliation: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
