const FormInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  className,
  ...rest
}) => {
  return (
    <div className="flex w-full flex-col space-y-1">
      {label != 0 && (
        <label
          htmlFor=""
          className="text-base font-medium text-gray-600 capitalize"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        {...rest}
        className={`w-full rounded bg-green-100/40 px-1.5 py-2 ring-1 ring-green-600 focus:ring-2 focus:ring-green-700/80 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default FormInput;
