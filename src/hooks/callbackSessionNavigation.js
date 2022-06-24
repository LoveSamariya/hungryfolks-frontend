import { useSelector, useDispatch } from 'react-redux';
import {
  selectCallbackSession,
  setCallbackSession,
} from '../services/auth/auth.slice';

export function useCallBackSessionNavigation(navigation) {
  const callbackSession = useSelector(selectCallbackSession);
  const dispatch = useDispatch();

  const sessionAwareNavigate = (path, handleNavigation) => {
    if (callbackSession && callbackSession.path) {
      navigation.replace(callbackSession.path, callbackSession.params || {});
      dispatch(setCallbackSession({}));

      return;
    }
    if (handleNavigation) {
      handleNavigation();
      return;
    }
    navigation.replace(path);
  };

  return { sessionAwareNavigate };
}
