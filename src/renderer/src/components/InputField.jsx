import React from 'react';

export default function InputField({ label, value, onChange, placeholder }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Check if inputValue is a non-negative number
    if (/^\d*$/.test(inputValue)) {
      onChange(e);
    }
  };

  return (
    <div className="text-3xl">
      <label>{label}: </label>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}

        className='input-field w-20 bg-transparent appearance-none text-blue-400'

      />
    </div>
  );
}
