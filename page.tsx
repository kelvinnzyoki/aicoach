export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        AI Fitness Coach
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6 max-w-md">
        Your personal AI coach that tracks workouts, builds plans, and keeps you consistent.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Get Started
        </a>

        <a
          href="/chat"
          className="border px-6 py-2 rounded-full"
        >
          Try Demo
        </a>
      </div>

    </div>
  );
}
