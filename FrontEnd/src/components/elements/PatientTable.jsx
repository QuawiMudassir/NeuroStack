import { useState, useEffect } from "react";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Retrieve doctor object from localStorage
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor ? doctor._id : null;
  const doctorName = doctor ? `${doctor.first_name} ${doctor.last_name}` : "Doctor";

  useEffect(() => {
    const fetchPatients = async () => {
        if (!doctorId) {
          setError("Doctor ID is missing. Please log in.");
          setLoading(false);
          return;
        }
      
        try {
          const token = localStorage.getItem("authToken");  // Adjust based on your token storage
          const response = await fetch(`http://localhost:3000/api/doctors/${doctorId}/patients`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
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
  }, [doctorId]);

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Welcome, Dr.{doctorName}!</h2>

      {/* Search Bar & Add Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          className="border border-gray-300 p-2 rounded flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#008170] text-white px-4 py-2 rounded-md shadow hover:bg-[#006b5a] transition">
          Add Patient
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredPatients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
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
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.patient_id} className="border-b">
                  <td className="p-3">{patient._id.slice(-4)}</td>
                  <td className="p-3">
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td className="p-3">{new Date(patient.dob).toLocaleDateString()}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.email}</td>
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
