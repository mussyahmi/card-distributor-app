import { useState } from 'react'
import './App.css'

function App() {
  const [people, setPeople] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleDistribute = async () => {
    setError("");
    setResult("");

    if (!people || isNaN(people) || parseInt(people) <= 0) {
      setError("Input value does not exist or value is invalid.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/index.php?people=${people}`);
      const text = await res.text();
      if (text.includes("error")) {
        setError(JSON.parse(text).error);
      } else {
        setResult(text);
      }
    } catch (err) {
      setError("Irregularity occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Card Distributor</h1>
      <input
        type="number"
        value={people}
        onChange={e => setPeople(e.target.value)}
        className="p-2 border rounded mb-2 w-64"
        placeholder="Enter number of people"
      />
      <button
        onClick={handleDistribute}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Distribute Cards
      </button>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-4 whitespace-pre font-mono bg-white p-4 rounded shadow">
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
