import { useState, useEffect } from "react";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/:doctor_id/patients"); 
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
                  <td className="p-3">
                    {patient.first_name} {patient.last_name}
                  </td>
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
      )}
    </div>
  );
};

export default PatientDashboard;
