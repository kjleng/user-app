import { useNavigate } from '@tanstack/react-router';
import { useCreateUser } from '../hooks/useUsers';
import { NewUser } from '../types/types';
import UserForm from './UserForm';

const NewUserPage = () => {
  const createUser = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = async (data: NewUser) => {
    try {
      createUser.mutate(data);
      navigate({ to: '/users' });
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <UserForm
      mode="create"
      onSubmit={onSubmit}
    />
  );
};

export default NewUserPage;
