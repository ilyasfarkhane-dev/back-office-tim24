"use client";

import { useState } from "react";

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    title:
      "TIM'24: 7th International Conference on Information Technology and Modeling.",
    description:
      "The proceedings of the TIM'24 conference will be published in Springer's CCIS series, and extended versions of selected papers will be submitted to Scopus-indexed journals.",
    place: "Faculty of Sciences Ben M'Sik | Casablanca - Morocco",
    date: "November 26 - 27, 2024",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Conference Details
        </h2>

        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="place"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Place
          </label>
          <textarea
            name="place"
            id="place"
            value={formData.place}
            onChange={handleChange}
            required
            rows={2}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="text"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
