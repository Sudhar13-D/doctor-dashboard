import React, { useState } from 'react';
import AiAssistanceChat from './components/AiAssistanceChat';
import VideoCall from './components/VideoCall';


import './index.css';

const patients = ['John Doe', 'Jane Smith', 'Alice'];

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState('');

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r" aria-label="Patient list">
        <h2 className="text-xl font-bold mb-4">Patients</h2>
        <ul className="space-y-2" role="list">
          {patients.map((name) => (
            <li key={name}>
              <button
                onClick={() => setSelectedPatient(name)}
                className="w-full text-left p-2 rounded hover:bg-blue-100 focus:outline-none focus:ring"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

        {selectedPatient ? (
          <>
            <section className="bg-white p-4 rounded shadow mb-4" aria-labelledby="profile-header">
              <h2 id="profile-header" className="text-lg font-semibold mb-2">Patient Profile</h2>
              <p>Name: <strong>{selectedPatient}</strong></p>
              <p>Age: 32</p>
              <p>Symptoms: Headache, Fever</p>
            </section>

            <section className="bg-white p-4 rounded shadow mb-4" aria-labelledby="diagnosis-header">
              <h2 id="diagnosis-header" className="text-lg font-semibold mb-2">AI Diagnosis Suggestion</h2>
              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter symptoms here..."
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Get Suggestion
              </button>
            </section>

            <AiAssistanceChat />
            <VideoCall />
          </>
        ) : (
          <p className="text-gray-500">Select a patient to begin.</p>
        )}
      </main>
    </div>
  );
};

export default App;
