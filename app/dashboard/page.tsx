import Card from "@/components/ui/Card.js";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <Card>
        <p>🔥 Streak: 3 days</p>
      </Card>

      <Card>
        <p>📈 Progress: Improving</p>
      </Card>

      <Card>
        <p>🏋️ Total Workouts: 12</p>
      </Card>
    </div>
  );
}
