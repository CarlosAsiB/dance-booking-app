// client/src/components/ClassCard.jsx
import React from "react";

export default function ClassCard({ classData, onBook, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
      <h2 className="text-xl font-semibold">{classData.title}</h2>
      <p className="text-sm text-gray-600">
        {new Date(classData.startTime).toLocaleString()} – {new Date(classData.endTime).toLocaleString()}
      </p>
      <p className="text-gray-700">{classData.description}</p>
      <div className="flex space-x-2">
        {onBook && (
          <button
            onClick={() => onBook(classData)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Inscribirme
          </button>
        )}
        {onCancel && (
          <button
            onClick={() => onCancel(classData)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Darme de baja
          </button>
        )}
      </div>
    </div>
  );
}
