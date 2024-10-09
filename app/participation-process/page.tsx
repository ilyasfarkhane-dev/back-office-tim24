"use client";

import { useState } from "react";

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    star: "July 1, 2024",
    deadline: "september 30, 2024",
    notification: "October 15, 2024",
    final: "October 30, 2024",
    conference: "November 26 - 27, 2024",
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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Start of Submission
        </label>
        <input
          type="text"
          name="star"
          id="star"
          value={formData.star}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Submission Deadline
        </label>
        <input
          name="deadline"
          id="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="place"
          className="block text-sm font-medium text-gray-700"
        >
          Notification of Acceptance
        </label>
        <input
          name="notification"
          id="notification"
          value={formData.notification}
          onChange={handleChange}
          required
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Final Manuscript Due
        </label>
        <input
          type="text"
          name="final"
          id="final"
          value={formData.final}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date of the Conference
        </label>
        <input
          type="text"
          name="conference"
          id="conference"
          value={formData.conference}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
