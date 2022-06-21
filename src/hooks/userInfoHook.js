import { useSelector } from 'react-redux';
import { selectUserInfo } from '../services/auth/auth.slice';

function useUserInfoHook() {
  const user = useSelector(selectUserInfo);
  return user;
}

export { useUserInfoHook };
