import { createBrowserRouter, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import Graphs from "./components/Graphs";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Outlet will replace the children components with sidebar */}
        <Outlet />
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/graphs",
        element: <Graphs />
      },
    ]
  },
]);

export { App, appRouter };
