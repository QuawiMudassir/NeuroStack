import React from "react";

const AddPatientForm = ({
  show,
  onClose,
  onSubmit,
  handleInputChange,
  newPatient,
  disorders,
}) => {
  if (!show) return null;

  // Getting doctor ID from localStorage
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor ? doctor._id : null;

  // Automatically set the doctor_id field
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctorId) {
      console.error("Doctor ID is missing.");
      return;
    }

    // Create patient data in the format expected by the API
    const patientData = {
      ...newPatient,
      doctor_id: doctorId, // Add the doctor_id from localStorage
      status: "active", // Default status to active
      created_At: new Date().toISOString(), // Set the current timestamp
    };

    // Call the parent onSubmit function with the formatted patient data
    onSubmit(patientData);

    // Close the form/modal after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-20">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[800px] max-w-lg space-y-6 mt-12">
        <h2 className="text-3xl font-semibold text-center text-[#008170]">Add New Patient</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First and Last Name */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.first_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.last_name}
              onChange={handleInputChange}
            />
          </div>

          {/* Date of Birth and Gender */}
          <div className="flex space-x-4">
            <input
              type="date"
              name="dob"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.dob}
              onChange={handleInputChange}
            />
            <select
              name="gender"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email, Contact, and Emergency Contact */}
          <div className="flex space-x-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.contact}
              onChange={handleInputChange}
            />
          </div>

          {/* Emergency Contact and Address */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="emergency_contact"
              placeholder="Emergency Contact"
              className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
              value={newPatient.emergency_contact}
              onChange={handleInputChange}
            />
          </div>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
            value={newPatient.address}
            onChange={handleInputChange}
          />

          {/* Disorder Select
          <select
            name="disorder_id"
            className="border p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-[#008170] outline-none"
            onChange={handleInputChange}
            multiple
            value={newPatient.disorder_id}
          >
            {disorders.map((disorder) => (
              <option key={disorder._id} value={disorder._id}>
                {disorder.name}
              </option>
            ))}
          </select> */}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#008170] text-white px-6 py-3 rounded-lg shadow-sm hover:bg-[#006f59] transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
