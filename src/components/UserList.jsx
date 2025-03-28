import React, { useState } from "react";
import EditUser from "./EditUser";

function UserList({ user, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
        {isEditing ? (
          <EditUser
            user={user}
            onClose={(e) => setIsEditing(false)}
            onUpdate={onUpdate}
          />
        ) : (
          <>
            <h3 className="text-lg font-bold">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <img
              className="w-24 h-24 rounded-full mb-3"
              src={user.avatar}
              alt={user.first_name}
            />
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserList;
