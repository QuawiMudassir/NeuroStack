import { useState } from "react";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([
    {
      patient_id: 1,
      first_name: "John",
      last_name: "Doe",
      date_of_birth: "1990-05-20",
      gender: "Male",
      contact_number: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Main St, Toronto",
      emergency_contact: "Jane Doe - 987-654-3210",
      medical_history: "None",
      doctor_id: 101,
      created_at: "2024-02-01",
    },
    {
      patient_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      date_of_birth: "1985-10-15",
      gender: "Female",
      contact_number: "456-789-1234",
      email: "jane.smith@example.com",
      address: "456 Elm St, Toronto",
      emergency_contact: "John Smith - 654-321-0987",
      medical_history: "Asthma",
      doctor_id: 102,
      created_at: "2024-02-02",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Patient Dashboard</h2>

      {/* Search Bar & Add Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          className="border border-gray-300 p-2 rounded flex-1"
        />
        <button className="bg-[#008170] text-white px-4 py-2 rounded-md shadow hover:bg-[#006b5a] transition">
          Add
        </button>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr className="text-left text-[#008170]">
              <th className="p-3">Patient ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Doctor ID</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patient_id} className="border-b">
                <td className="p-3">{patient.patient_id}</td>
                <td className="p-3">{patient.first_name} {patient.last_name}</td>
                <td className="p-3">{patient.date_of_birth}</td>
                <td className="p-3">{patient.gender}</td>
                <td className="p-3">{patient.contact_number}</td>
                <td className="p-3">{patient.doctor_id}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-gray-200 px-3 py-1 rounded-md shadow hover:bg-gray-300 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;
