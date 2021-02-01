import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';

import { SIGN_IN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password }});
    const accessToken = data.authorize.accessToken;
    await authStorage.setAccessToken(accessToken);
    return accessToken;
  };

  return [signIn, result];
};

export default useSignIn;