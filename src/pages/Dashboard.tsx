import { useUsers } from '../hooks/useUsers';

const Dashboard = () => {
  const { data: users, error, isPending, isFetching } = useUsers();

  const activeUsers = users?.filter(user => user.status === 'active').length || 0;
  const inactiveUsers = users?.filter(user => user.status === 'inactive').length || 0;

  if (isPending) {
    return <div className="flex justify-center p-12">Loading dashboard data...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{users?.length || 0}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Inactive Users</p>
              <p className="text-2xl font-bold">{inactiveUsers}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">User Roles</p>
              <p className="text-2xl font-bold">{new Set(users?.map(user => user.role)).size}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          {users && users.length > 0 ? (
            <ul className="divide-y">
              {users.slice(0, 5).map(user => (
                <li key={user.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className={`inline-block h-8 w-8 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center text-white`}>
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="inline-flex items-center text-sm font-semibold text-gray-700">
                      {user.role}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>
        <div>{isFetching ? 'Background Updating...' : ' '}</div>
      </div>
    </div>
  );
};

export default Dashboard;
