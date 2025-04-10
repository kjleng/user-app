import { useNavigate } from '@tanstack/react-router';
import { useCreateUser } from '../hooks/useUsers';
import { NewUser } from '../types/types';
import UserForm from './UserForm';

const NewUserPage = () => {
  const createUserHandler = useCreateUser();
  const navigate = useNavigate();

  const createUser = async (data: NewUser) => {
    try {
      createUserHandler.mutate(data);
      navigate({ to: '/users' });
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <UserForm
      mode="create"
      onSubmit={createUser}
    />
  );
};

export default NewUserPage;
