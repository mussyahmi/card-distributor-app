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
      setError("Invalid input value.");
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
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Card Distributor</h1>
      <input
        type="number"
        className="border p-2 rounded mr-2"
        placeholder="Number of people"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
      />
      <button
        onClick={handleDistribute}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Distribute
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <pre className="text-left bg-gray-100 mt-4 p-4 rounded">
          {result}
        </pre>
      )}
    </div>
  );
}

export default App;
