
import "./Input.css";

function Input({ label, id, type = "text", placeholder }) {
  return (
    <div className="campus-input-group">
      <label className="campus-input-label" htmlFor={id}>
        {label}
      </label>

      <input
        className="campus-input"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
