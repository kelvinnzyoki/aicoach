import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border rounded-full px-4 py-2 w-full outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
}
