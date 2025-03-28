import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );
        const data = await response.json();
        setUsers(data.data);
        setTotalPage(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page, navigate]);

  const handleDelete = async (id) => {
    const originalUser = [...users];
    setUsers(users.filter((user) => user.id !== id));
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setMessage("User Deleted Successfully");
    } catch (error) {
      console.error("Error deleting User", error);
      setUsers(originalUser);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Users List
      </h1>
      
      {message && <p className="text-green-600 mb-4">{message}</p>}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {users.length > 0 ? (
          users.map((user) => (
            <UserList key={user.id} user={user} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))
        ) : (
          <p className="text-gray-700">No User Found</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 mx-2 rounded-lg ${
            page === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-lg font-bold">
          {page} / {totalPage}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
          disabled={page === totalPage}
          className={`px-4 py-2 mx-2 rounded-lg ${
            page === totalPage ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;
