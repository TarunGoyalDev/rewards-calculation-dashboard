import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading data...</p>
    </div>
  );
}
