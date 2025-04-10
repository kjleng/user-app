import { useNavigate, useParams } from '@tanstack/react-router';
import { useUser, useUpdateUser } from '../hooks/useUsers';
import { NewUser } from '../types/types';
import UserForm from './UserForm';

const EditUserPage = () => {
  const userId = useParams({ from: "/users/$userId/edit", select: (params) => params.userId, });
  const { data: user, isPending, isError } = useUser(userId);
  const updateUserHandler = useUpdateUser();
  const navigate = useNavigate();

  if (isPending) return <div className="flex justify-center p-12">Loading...</div>;
  if (isError) return <div className="text-red-500">Error loading user</div>;
  if (!user) return <div className="text-red-500">No user found</div>;

  const updateUser = async (data: NewUser) => {
    try {
      updateUserHandler.mutate({ userId, data });
      navigate({ to: '/users' });
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <UserForm
      mode="edit"
      user={user}
      onSubmit={updateUser}
    />
  );
};

export default EditUserPage;
