import React, { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const SignOut = ({ setUserLoggedIn }) => {
  const authStorage = useContext(AuthStorageContext);

  authStorage.removeAccessToken()
    .then(() => {
      authStorage.getAccessToken()
      .then((clearedToken) => {
        console.log('token after sign out: ', clearedToken);
        setUserLoggedIn(false);
      });
    });

  return(<></>);
};

export default SignOut;