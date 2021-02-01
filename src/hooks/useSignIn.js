import { useMutation } from '@apollo/react-hooks';

import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    return await mutate({ variables: { username, password }});
  };

  return [signIn, result];
};

export default useSignIn;