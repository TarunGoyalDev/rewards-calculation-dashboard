import PropTypes from "prop-types";
import "./Error.css";

export default function Error({ message = "Something went wrong" }) {
  return (
    <div className="error-container">
      <div className="error-box">
        <h3 className="error-title">⚠️ Error</h3>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};
