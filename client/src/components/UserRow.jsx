import React from "react";

export default function UserRow({ user, onAction }) {
  return (
    <tr className="bg-white even:bg-gray-50">
      <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">
        {onAction && (
          <button
            onClick={() => onAction(user)}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Acción
          </button>
        )}
      </td>
    </tr>
  );
}
