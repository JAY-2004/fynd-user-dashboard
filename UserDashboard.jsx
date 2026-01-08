import { useState } from "react";

const API_URL = "https://fynd-task2-backend-xya1.onrender.com/api/reviews";

function UserDashboard() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setAiResponse("");

    if (!review.trim()) {
      setError("Review cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, review }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setAiResponse(data.aiResponse);
        setReview("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>User Feedback</h2>

      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <label>Review:</label>
      <textarea
        rows="4"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{ width: "100%" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {aiResponse && (
        <div style={{ marginTop: "20px" }}>
          <h4>AI Response</h4>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
