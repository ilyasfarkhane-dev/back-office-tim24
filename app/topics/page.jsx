"use client";
import { useState } from "react";
import {
  SquarePen,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";

const ManageTopicsPage = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Robotics and Automation",
      subtopics: [
        { id: 1, title: "- Industrial applications of robotics" },
        { id: 2, title: "- Artificial intelligence in robot design" },
        {
          id: 3,
          title: "- Collaborative robotics and human-machine interaction",
        },
      ],
    },
    {
      id: 2,
      title: "Machine Learning and Artificial Intelligence",
      subtopics: [{ id: 2, title: "- Machine learning models and algorithms" }],
    },
    { id: 3, title: "Topic 3", subtopics: [] },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [expandedTopicId, setExpandedTopicId] = useState(null); // For accordion

  // State for managing subtopics
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [isSubtopicModalOpen, setIsSubtopicModalOpen] = useState(false);
  const [newSubtopicTitle, setNewSubtopicTitle] = useState("");

  // State for adding new topic
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  // State for adding new subtopic
  const [isAddSubtopicModalOpen, setIsAddSubtopicModalOpen] = useState(false); // Add this line

  // Open modal to update topic
  const openModal = (topic) => {
    setSelectedTopic(topic);
    setNewTitle(topic.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
  };

  const handleUpdate = () => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedTopic.id ? { ...topic, title: newTitle } : topic
      )
    );
    closeModal();
  };

  const handleDelete = (id) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
  };

  // Toggle accordion for subtopics
  const toggleAccordion = (topicId) => {
    setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
  };

  // Open modal to edit subtopic
  const openSubtopicModal = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setNewSubtopicTitle(subtopic.title);
    setIsSubtopicModalOpen(true);
  };

  const closeSubtopicModal = () => {
    setIsSubtopicModalOpen(false);
    setSelectedSubtopic(null);
  };

  const handleSubtopicUpdate = () => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedSubtopic.topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === selectedSubtopic.id
                  ? { ...sub, title: newSubtopicTitle }
                  : sub
              ),
            }
          : topic
      )
    );
    closeSubtopicModal();
  };

  // Open modal to add a new topic
  const openAddTopicModal = () => {
    setNewTopicTitle("");
    setIsAddTopicModalOpen(true);
  };

  const closeAddTopicModal = () => {
    setIsAddTopicModalOpen(false);
  };

  const handleAddTopic = () => {
    const newTopic = {
      id: topics.length + 1, // You can change this to a better ID generation method
      title: newTopicTitle,
      subtopics: [],
    };
    setTopics((prevTopics) => [...prevTopics, newTopic]);
    closeAddTopicModal();
  };

  // Open modal to add a new subtopic
  const openAddSubtopicModal = (topic) => {
    setNewSubtopicTitle("");
    setSelectedTopic(topic); // Set the selected topic to associate the subtopic
    setIsAddSubtopicModalOpen(true); // Use the state to open the modal
  };

  const closeAddSubtopicModal = () => {
    setIsAddSubtopicModalOpen(false);
    setSelectedTopic(null);
  };

  const handleAddSubtopic = () => {
    const newSubtopic = {
      id: Date.now(), // Unique ID based on timestamp
      title: newSubtopicTitle,
      topicId: selectedTopic.id, // Associate with the selected topic
    };
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedTopic.id
          ? { ...topic, subtopics: [...topic.subtopics, newSubtopic] }
          : topic
      )
    );
    closeAddSubtopicModal();
  };

  // Function to delete a specific subtopic
  const handleSubtopicDelete = (topicId, subtopicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.filter((sub) => sub.id !== subtopicId),
            }
          : topic
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Manage Topics</h1>
      <button
        onClick={openAddTopicModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4 flex items-center"
      >
        <Plus className="mr-2" /> Add Topic
      </button>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic.id} className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4">
              <span className="text-lg">{topic.title}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => openModal(topic)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <SquarePen className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleDelete(topic.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => toggleAccordion(topic.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {expandedTopicId === topic.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {/* Button to add subtopic */}
                <button
                  onClick={() => openAddSubtopicModal(topic)}
                  className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Accordion section for subtopics */}
            {expandedTopicId === topic.id && (
              <ul className="pl-8 pr-4 pb-4 space-y-2">
                {topic.subtopics.length === 0 ? (
                  <li className="text-gray-500">No subtopics available</li>
                ) : (
                  topic.subtopics.map((subtopic) => (
                    <li
                      key={subtopic.id}
                      className="flex justify-between items-center"
                    >
                      <span>{subtopic.title}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            openSubtopicModal({
                              ...subtopic,
                              topicId: topic.id,
                            })
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <SquarePen className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() =>
                            handleSubtopicDelete(topic.id, subtopic.id)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for updating topic */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Update Topic
            </h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
              placeholder="Enter new topic title"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for updating subtopic */}
      {isSubtopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeSubtopicModal}
            >
              <X className="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Update Subtopic
            </h2>
            <input
              type="text"
              value={newSubtopicTitle}
              onChange={(e) => setNewSubtopicTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
              placeholder="Enter new subtopic title"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSubtopicUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={closeSubtopicModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding topic */}
      {isAddTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeAddTopicModal}
            >
              <X className="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Topic
            </h2>
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
              placeholder="Enter topic title"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddTopic}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={closeAddTopicModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding subtopic */}
      {isAddSubtopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeAddSubtopicModal}
            >
              <X className="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Subtopic
            </h2>
            <input
              type="text"
              value={newSubtopicTitle}
              onChange={(e) => setNewSubtopicTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
              placeholder="Enter subtopic title"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddSubtopic}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={closeAddSubtopicModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTopicsPage;
