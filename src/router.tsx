import { createRootRouteWithContext, createRoute } from '@tanstack/react-router';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import UserDetails from './pages/UserDetails';
import { QueryClient } from '@tanstack/react-query'

// Define the root route
const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
});

// Define the index route (Dashboard)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

// Define the users route
const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users',
  component: UserList,
});

// Define the new user route
const newUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users/new',
  component: UserForm,
});

// Define the edit user route
const editUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users/$userId/edit',
  component: UserForm,
  // loader: async ({ context: { queryClient }, params }) => {
  //   return queryClient.ensureQueryData(['user', params.userId], () =>
  //     fetch(`/api/users/${params.userId}`).then(res => res.json())
  //   );
  // },
});

// Define the user details route
const userDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users/$userId',
  component: UserDetails,
  // loader: async ({ params }) => {
  //   return queryClient.ensureQueryData(['user', params.userId], () =>
  //     fetch(`/api/users/${params.userId}`).then(res => res.json())
  //   );
  // },
});

// Create the route tree
export const routeTree = rootRoute.addChildren([indexRoute, usersRoute, newUserRoute, editUserRoute, userDetailsRoute]);


