"use client";

import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

export default function CommitteeTable() {
  const [data, setData] = useState([
    {
      id: 1,
      imageUrl: "/assets/img/speakers/lhabib.jpg",
      name: "Pr. El Habib Benlahmar",
      affiliation:
        "Faculty of Sciences Ben M’Sick, Hassan II University of Casablanca,Morocco",
      about:
        "Professor in the Department of Mathematics and Computer Science at the Faculty of Sciences Ben M'Sik at Hassan II University of Casablanca, Morocco.",
    },
    {
      id: 2,
      imageUrl: "/assets/img/speakers/filali.jpg",
      name: "Pr. Sanaa El Filali",
      affiliation:
        "Faculty of Sciences Ben M’Sick, Hassan II University of Casablanca,Morocco",
      about:
        "Professor in the Department of Mathematics and Computer Science at the Faculty of Sciences Ben M'Sik at Hassan II University of Casablanca, Morocco.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal state
  const [selectedMember, setSelectedMember] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Function to open the update modal
  const openEditModal = (member) => {
    setSelectedMember(member);
    setNewImage(member.imageUrl); // Set the current image as default
    setIsModalOpen(true);
  };

  // Function to open the add speaker modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setNewImage(null);
  };

  // Function to close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setNewImage(null);
    setIsAddModalOpen(false); // Close add modal
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

  // Function to handle form submission for adding
  const handleAdd = (newMember) => {
    setData([...data, { ...newMember, id: data.length + 1 }]);
    closeModal();
  };

  // Function to delete a member
  const handleDelete = (id) => {
    setData(data.filter((member) => member.id !== id));
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Conference Speakers
      </h1>

      {/* Add Speaker Button */}
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Speaker
      </button>

      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Affiliation
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                About
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
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-12 w-auto rounded-full object-cover shadow-md"
                  />
                </td>
                <td className="py-4 px-6">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                </td>
                <td className="py-4 px-6 text-gray-600">{item.affiliation}</td>
                <td className="py-4 px-6 text-gray-600">{item.about}</td>
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

      {/* Modal for Adding Speaker */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Speaker</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd({
                  name: e.target.name.value,
                  affiliation: e.target.affiliation.value,
                  about: e.target.about.value,
                  imageUrl: newImage || "/default/image/path", // Default image if none provided
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <textarea
                  name="about"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="Selected"
                    className="mt-4 h-20 w-20 object-cover rounded-md"
                  />
                )}
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
                  Add Speaker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Editing Speaker */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Speaker</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate({
                  id: selectedMember.id,
                  name: e.target.name.value,
                  affiliation: e.target.affiliation.value,
                  about: e.target.about.value,
                  imageUrl: newImage || selectedMember.imageUrl, // Keep the same image if none is uploaded
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
                  defaultValue={selectedMember.name}
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
                  defaultValue={selectedMember.affiliation}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <textarea
                  name="about"
                  defaultValue={selectedMember.about}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="Selected"
                    className="mt-4 h-20 w-20 object-cover rounded-md"
                  />
                )}
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
    </div>
  );
}
