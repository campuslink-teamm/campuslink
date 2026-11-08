
import "./Input.css";

function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
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
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Input;
