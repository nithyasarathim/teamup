import React from "react";
import Select from "react-select";

const skillOptions = [
  { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Fullstack Developer', label: 'Fullstack Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Mobile App Developer', label: 'Mobile App Developer' },
    { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'AI Developer', label: 'AI Developer' },
    { value: 'Embedded Systems Engineer', label: 'Embedded Systems Engineer' },
    { value: 'IoT Developer', label: 'IoT Developer' },
    { value: 'Cloud Engineer', label: 'Cloud Engineer' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' },
    { value: 'QA/Testing Engineer', label: 'QA/Testing Engineer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Technical Writer', label: 'Technical Writer' },
    { value: 'AR/VR Developer', label: 'AR/VR Developer' },
    { value: 'Blockchain Developer', label: 'Blockchain Developer' },
    { value: 'Game Developer', label: 'Game Developer' },
    { value: 'System Designer', label: 'System Designer' }
];

const SpecializationForm = ({
  department,
  setDepartment,
  skills,
  setSkills,
  handleSignUp,
  handleBack,
}) => {
  return (
    <div>
      {/* Department Selection */}
      <label className="font-bold m-2">Department</label>
      <select
        className="w-full border p-2 mb-4 rounded"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        <option value="CSE">Department of CSE</option>
        <option value="AIDS">Department of AIDS</option>
        <option value="AIML">Department of AIML</option>
        <option value="CCE">Department of CCE</option>
        <option value="ECE">Department of ECE</option>
        <option value="EEE">Department of EEE</option>
        <option value="IT">Department of IT</option>
        <option value="CSBS">Department of CSBS</option>
      </select>

      {/* Skills Selection */}
      <label className="font-bold m-2">Skills</label>
      <Select
        options={skillOptions}
        isMulti
        className="w-full mb-4"
        placeholder="Select or type skills..."
        value={skillOptions.filter((option) => skills.includes(option.value))}
        onChange={(selectedOptions) =>
          setSkills(selectedOptions.map((option) => option.value))
        }
      />

      {/* Buttons: Back & Signup */}
      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="w-1/2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition-all"
        >
          Back
        </button>

        <button
          onClick={handleSignUp}
          className="w-1/2 bg-sky-500 text-white p-2 rounded hover:bg-sky-600 transition-all"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SpecializationForm;
