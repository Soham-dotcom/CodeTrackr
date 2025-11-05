// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { fetchUserSummary } from "../lib/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchUserSummary("user123").then(setData).catch(console.error);
  }, []);
  if (!data) return <div>Loading…</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
