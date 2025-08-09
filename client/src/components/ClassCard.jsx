import React from "react";

export default function ClassCard({ classData, onBook, onCancel }) {
  return (
    <div className="card space-y-2">
      <h2 className="text-xl font-semibold">{classData.title}</h2>
      <p className="text-sm text-gray-600">
        {new Date(classData.startTime).toLocaleString()} – {new Date(classData.endTime).toLocaleString()}
      </p>
      <p className="text-gray-700">{classData.description}</p>
      <div className="flex space-x-2">
        {onBook && (
          <button onClick={() => onBook(classData)} className="btn-primary">
            Inscribirme
          </button>
        )}
        {onCancel && (
          <button onClick={() => onCancel(classData)} className="btn-danger">
            Darme de baja
          </button>
        )}
      </div>
    </div>
  );
}
