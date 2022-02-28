import { Auth } from "aws-amplify";

export const useAuth = () => Auth;

export const useCognitoToken = async () => {
  try {
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    return token;
  } catch (error) {
    // eslint-disable-next-line
        console.log('error retrieving JWT Token', error);
  }
};

export const useCognitoLogout = async () => {
  try {
    await Auth.signOut({global: true});
  } catch (error) {
    // eslint-disable-next-line
        console.log('error signing out: ', error);
    throw error;
  }
};