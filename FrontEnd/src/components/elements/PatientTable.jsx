import { useState, useEffect } from "react";
import axios from "axios";
import AddPatientForm from "./AddPatientForm"; // import the AddPatientForm component

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // For controlling AddPatientForm visibility
  const [editingPatient, setEditingPatient] = useState(null); // For controlling edit form visibility
  const [newPatient, setNewPatient] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "male",
    email: "",
    contact: "",
    emergency_contact: "",
    address: "",
    disorder_id: [], // For storing selected disorder IDs
  });

  // Getting the doctor and disorders from localStorage or API
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor ? doctor._id : null;
  const doctorName = doctor ? `${doctor.first_name}  ${doctor.last_name}` : "Doctor";

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

  // Handle input changes for new patient data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the new patient data
  const handleSubmitNewPatient = async (patientData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/patients", patientData);
      console.log("Patient added successfully:", response.data);

      // Close the form and refresh patient list
      setShowAddForm(false);
      setPatients((prevPatients) => [...prevPatients, response.data]);
    } catch (error) {
      console.error("Error adding patient:", error.response?.data?.error || error.message);
    }
  };

  // Update the patient data
  const handleUpdatePatient = async (patientData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/patients/${editingPatient._id}`, patientData);
      console.log("Patient updated successfully:", response.data);

      // Close the form and refresh patient list
      setEditingPatient(null);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === editingPatient._id ? response.data : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient:", error.response?.data?.error || error.message);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete patient function
  const deletePatient = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/patients/${id}`);
      console.log(response.data.message);

      // Remove the deleted patient from state
      setPatients((prevPatients) => prevPatients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Welcome, Dr. {doctorName}</h2>

      {/* Search Bar & Add Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          className="border border-gray-300 p-2 rounded flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingPatient(null); // Clear any editing state
          }}
          className="bg-[#008170] text-white px-4 py-2 rounded-md shadow hover:bg-[#006b5a] transition"
        >
          Add Patient
        </button>
      </div>

      {/* Add or Edit Patient Form */}
      <AddPatientForm
        show={showAddForm}
        onClose={() => setShowAddForm(false)} // Close the form
        onSubmit={editingPatient ? handleUpdatePatient : handleSubmitNewPatient} // Adjust for add/edit
        handleInputChange={handleInputChange}
        newPatient={newPatient}
        disorders={[]} // Pass the disorders here (you can fetch them from API if needed)
        editingPatient={editingPatient} // Pass the editing patient data to the form
      />

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
                <tr key={patient._id} className="border-b">
                  <td className="p-3">{patient._id.slice(-4)}</td>
                  <td className="p-3">{patient.first_name} {patient.last_name}</td>
                  <td className="p-3">{new Date(patient.dob).toLocaleDateString()}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition"
                      onClick={() => {
                        setEditingPatient(patient);
                        setNewPatient(patient); // Pre-fill the form with current patient data
                        setShowAddForm(true); // Open the form in edit mode
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
                      onClick={() => deletePatient(patient._id)}
                    >
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
