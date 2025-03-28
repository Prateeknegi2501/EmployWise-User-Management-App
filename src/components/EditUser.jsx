import axios from "axios";
import React, { useState } from "react";

function EditUser({ user, onClose,onUpdate }) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>(
    setFormData({ ...formData, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      const updateUser={...user,...formData}
      onUpdate(updateUser)
      setMessage("User updated successfully!");
      setTimeout(onClose, 1500);
    } catch (error) {
      setMessage("Error updating user.");
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {message && <p className="text-green-600 text-center">{message}</p>}
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-600 w-full"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-2 w-full"
      >
        Cancel
      </button>
    </div>
  );
}

export default EditUser;
