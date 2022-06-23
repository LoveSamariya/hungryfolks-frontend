import { useSelector, useDispatch } from 'react-redux';
import {
  selectCallbackSession,
  setCallbackSession,
} from '../services/auth/auth.slice';

export function useCallBackSessionNavigation(navigation) {
  const callbackSession = useSelector(selectCallbackSession);
  const dispatch = useDispatch();

  const sessionAwareNavigate = path => {
    if (callbackSession && callbackSession.path) {
      navigation.replace(callbackSession.path, callbackSession.params || {});
      dispatch(setCallbackSession({}));

      return;
    }
    navigation.replace(path);
  };

  return { sessionAwareNavigate };
}
