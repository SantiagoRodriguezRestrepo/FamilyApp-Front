import { LoginForm } from '../components/login/LoginForm';
import { TPropsSearchParams } from '../utils/types';

export const LoginPage = ({
  searchQuery,
  setSearchQuery,
}: TPropsSearchParams) => {
  return (
    <LoginForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  );
};
