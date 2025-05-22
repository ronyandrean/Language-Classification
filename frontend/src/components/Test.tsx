import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    setConfidence(null);
    setError("");

    try {
      interface PredictResponse {
        language: string;
        confidence: number;
      }

      const res = await axios.post<PredictResponse>(
        "http://localhost:5000/predict",
        { text }
      );

      setResult(res.data.language);
      setConfidence(res.data.confidence);
    } catch (err: any) {
      setError("Error classifying language");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌍 Language Classifier</h1>
      <input
        type="text"
        placeholder="Enter text to classify"
        className="input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Classifying..." : "Classify"}
      </button>

      {result && (
        <p>
          <strong>Detected Language:</strong> {result} <br />
          <strong>Confidence:</strong> {(confidence! * 100).toFixed(2)}%
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Test;
