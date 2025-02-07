import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Patient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:3000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patient details");
        }

        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-patient/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:3000/api/patients/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to delete patient");
        }

        alert("Patient deleted successfully!");
        navigate("/patients");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="px-6 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and medical records.
        </p>
      </div>
      
      <div className="mt-6 border-t border-gray-200 bg-white p-6 shadow-md rounded-lg">
        <dl className="divide-y divide-gray-200">
          {[
            { label: "Full Name", value: `${patient.first_name} ${patient.last_name}` },
            { label: "Date of Birth", value: new Date(patient.dob).toLocaleDateString() },
            { label: "Gender", value: patient.gender },
            { label: "Email", value: patient.email },
            { label: "Phone", value: patient.phone },
            { label: "Address", value: patient.address },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-start space-x-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ← Go Back
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
