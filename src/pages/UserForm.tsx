import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useUser, useCreateUser, useUpdateUser } from '../hooks/useUsers';
import { NewUser } from '../types/types';
import { useEffect } from 'react';

const UserForm = () => {
  const params = useParams({ from: '/users/$userId/edit' });
  const userId = params?.userId;
  const isEditMode = !!userId;

  const { data: user } = useUser(userId || '');
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  // Setup form with react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewUser>({
    defaultValues: isEditMode && user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    } : {
      name: '',
      email: '',
      role: 'User',
      status: 'active',
    }
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (isEditMode && user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, reset, isEditMode]);

  const onSubmit = async (data: NewUser) => {
    try {
      if (isEditMode && userId) {
        updateUser.mutate({ userId, data });
      } else {
        createUser.mutate(data);
      }
      navigate({ to: '/users' });
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{isEditMode ? 'Edit User' : 'Create New User'}</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border ${errors.name ? 'border-red-500' : ''}`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email format'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                {...register('role', { required: 'Role is required' })}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate({ to: '/users' })}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              disabled={createUser.isPending || updateUser.isPending}
            >
              {createUser.isPending || updateUser.isPending ? 'Saving...' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
