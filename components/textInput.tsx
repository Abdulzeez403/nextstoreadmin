"use client";

import React, { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextarea?: boolean; // New prop to differentiate between input and textarea
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  isTextarea = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  if (isTextarea) {
    return (
      <div className="input-group">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="input-group relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="absolute top-[35px] right-3 text-sm text-gray-500 focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;
