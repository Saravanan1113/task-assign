import { useState } from "react";
import avatar from "../assets/uifaces-popular-image.jpg";
const people = ["Jane Smith", "Saravanan", "Dwyane Johnson", "Will Jacks"];

const EventDetailsModal = () => {
  const [title, setTitle] = useState("Flower Arrangement");
  const [dateTime, setDateTime] = useState("Dec 5, 2024 at 8:00-10:00 AM");
  const [assignedTo, setAssignedTo] = useState("Jane Smith");
  const [note, setNote] = useState("09382049832\nwww.flowervendor.com");
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Thanks for assigning me on the task. We'll get the details ironed out.",
      author: "Jane Smith",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      if (editCommentId !== null) {
        // Editing existing comment
        const updatedComments = comments.map((comment) =>
          comment.id === editCommentId
            ? { ...comment, text: newComment }
            : comment
        );
        setComments(updatedComments);
        setEditCommentId(null);
      } else {
        // Adding new comment
        setComments([
          ...comments,
          { id: comments.length + 1, text: newComment, author: "Jane Smith" },
        ]);
      }
      setNewComment("");
      setErrorMessage(""); // Clear error message if comment added successfully
    } else {
      setErrorMessage("Comment cannot be empty");
    }
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.text);
      setEditCommentId(id);
    }
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateTimeChange = (e) => setDateTime(e.target.value);
  const handleAssignedToChange = (e) => setAssignedTo(e.target.value);
  const handleNoteChange = (e) => setNote(e.target.value);
  const handleCommentChange = (e, id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text: e.target.value } : comment
      )
    );
  };
  const toggleComplete = () => setIsComplete(!isComplete);
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <div className=" pb-4 mb-2 flex flex-col items-center">
        <div className="p-2 mb-2 border  rounded-3xl w-full flex justify-center">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full focus:outline-none text-2xl font-semibold text-red-600 border-0 focus:ring-0 text-center"
          />
        </div>
        <div className="border  rounded-3xl p-2 mb-4 flex flex-row w-full items-center justify-center">
          <div className="justify-center ">
            <svg
              className="w-5 h-5 text-gray-500 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-5 7h4M5 20h14a2 2 0 002-2V7H3v11a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={dateTime}
            onChange={handleDateTimeChange}
            className=" text-gray-500 border-0 focus:ring-0 text-center focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4 border p-2  rounded-3xl flex flex-row justify-center">
        <div className="flex flex- items-center justify-evenly w-1/2">
          <svg
            className=" h-5 text-gray-500 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <label className=" block text-sm font-medium text-gray-700 mb-1">
            Assign to:
          </label>
        </div>
        <div className="flex items-center  w-1/2 ">
          <img src={avatar} alt="avatar" className="rounded-full mr-2 h-8" />
          <select
            value={assignedTo}
            onChange={handleAssignedToChange}
            className="block p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4 w-full flex flex-row gap-3 items-center justify-center">
        <label className=" w-1/3block text-sm font-medium text-gray-700 mb-1">
          Note:
        </label>
        <textarea
          value={note}
          onChange={handleNoteChange}
          className="w-2/3 border-blue-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg text-left  font-medium text-gray-900">
          Comments
        </h3>
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start mt-2">
            <img
              src={avatar}
              alt="avatar"
              className="h-8 rounded-full mr-2 mt-1"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {comment.author}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={
                    comment.id === editCommentId ? newComment : comment.text
                  }
                  onChange={(e) => handleCommentChange(e, comment.id)}
                  className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="flex ml-2 space-x-2">
                  {/* Edit icon */}
                  <svg
                    onClick={() => handleEditComment(comment.id)}
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 8a2 2 0 00-2-2M8 20a1 1 0 01-1-1v-2a2 2 0 012-2h8a2 2 0 012 2v2a1 1 0 01-1 1M15 16v4M15 20h4M15 12H9"
                    />
                  </svg>
                  {/* Delete icon */}
                  <svg
                    onClick={() => handleDeleteComment(comment.id)}
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write comment..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editCommentId !== null ? "Save Edit" : "Add Comment"}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={toggleComplete}
          className={`px-4 py-2 rounded-md shadow-sm ${
            isComplete
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white focus:ring-2 focus:ring-offset-2 ${
            isComplete ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
        >
          {isComplete ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
