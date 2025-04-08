import { Link, Outlet } from '@tanstack/react-router';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management System</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/users" className="hover:underline">
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 shadow-md">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block p-2 rounded hover:bg-gray-200"
                  activeProps={{ className: "bg-gray-200 font-bold" }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className="block p-2 rounded hover:bg-gray-200"
                  activeProps={{ className: "bg-gray-200 font-bold" }}
                >
                  Users List
                </Link>
              </li>
              <li>
                <Link
                  to="/users/new"
                  className="block p-2 rounded hover:bg-gray-200"
                  activeProps={{ className: "bg-gray-200 font-bold" }}
                >
                  Add User
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} User Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
