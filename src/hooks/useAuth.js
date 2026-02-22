import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useRef, useEffect } from 'react';
import { clearUser, setUserData, mergeAuthState } from '../store/slices/userAuthSlice';
import Cookies from 'js-cookie';

/** In-flight promise refs for deduplicating concurrent API calls */
const userDataPromiseRef = { current: null };

export const useAuth = () => {
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);

  const cookieToken = Cookies.get('token');

  const data = useSelector((state) => state.userAuth);
  const user = data?.userData;
  const token = data?.token ?? cookieToken;

  const clear = useCallback(() => {
    userDataPromiseRef.current = null;
    dispatch(clearUser());
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    localStorage.clear();
  }, [dispatch]);

  const setUser = useCallback(
    (userData) => {
      const { token: tradeToken, refreshToken: tradeRefreshToken, user: tradeUser } = userData;

      if (tradeToken) Cookies.set('token', tradeToken);
      if (tradeRefreshToken) Cookies.set('refreshToken', tradeRefreshToken);
      dispatch(
        setUserData({
          userData: tradeUser,
          token: tradeToken,
          refreshToken: tradeRefreshToken,
        })
      );
    },
    [dispatch]
  );

  // const fetchUserData = useCallback(async () => {
  //   if (!token || user) return Promise.resolve(user ?? null);

  //   if (userDataPromiseRef.current) {
  //     return userDataPromiseRef.current;
  //   }

  //   const promise = (async () => {
  //     try {
  //       const response = await authService.getUser();
  //       if (!isMountedRef.current) return null;
  //       if (response?.success && response?.data?.user) {
  //         dispatch(mergeAuthState({ userData: response.data.user }));
  //         return response.data.user;
  //       }
  //       return null;
  //     } catch (error) {
  //       if (isMountedRef.current) {
  //         console.error('[useAuth] Error fetching user data:', error);
  //       }
  //       return null;
  //     } finally {
  //       userDataPromiseRef.current = null;
  //     }
  //   })();

  //   userDataPromiseRef.current = promise;
  //   return promise;
  // }, [token, user, dispatch]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // useEffect(() => {
  //   if (token && !user) {
  //     fetchUserData();
  //   }
  // }, [token, user, fetchUserData]);

  return {
    userData: user,
    token,
    isLoggedIn: Boolean(token),
    clear,
    setUser,
  };
};

export default useAuth;
