export default function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
    >
      {children}
    </button>
  );
}
