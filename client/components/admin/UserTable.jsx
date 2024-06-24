"use client";

import React, { useEffect, useState } from "react";

import AdminPanelComponent from "@/client/components/admin/AdminPanel";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const response = await fetch("/api/remove-user");

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    deleteUser();
  }, []);

  return (
    <>
      <AdminPanelComponent countUsers={users.length} />
      <div className="flex justify-center p-4">
        <div className="relative w-fit overflow-x-auto shadow-md sm:rounded-lg">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Име на потребител:
                </th>
                <th scope="col" className="px-6 py-3">
                  Имейл
                </th>
                <th scope="col" className="px-6 py-3">
                  Път на потребителска снимка
                </th>
                <th scope="col" className="px-6 py-3">
                  Потребителска снимка
                </th>
                <th scope="col" className="px-6 py-3">
                  Промяна
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.avatar}</td>
                  <td className="px-1 py-1">
                    <img className="m-auto" width={"64"} height={"64"} src={user.avatar} alt="User Avatar" />
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserTable;
