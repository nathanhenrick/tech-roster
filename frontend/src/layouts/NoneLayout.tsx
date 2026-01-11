import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <main className="bg-red-500 grid grid-cols-1 sm:grid-cols-2">
      <Outlet />
    </main>
  );
}
