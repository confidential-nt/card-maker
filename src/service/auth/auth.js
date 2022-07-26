import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

class Auth {
  provider;
  auth;
  constructor(Provider) {
    this.provider = new Provider();
    this.auth = getAuth();
  }

  async login() {
    try {
      await setPersistence(this.auth, browserSessionPersistence);
      const result = await signInWithPopup(this.auth, this.provider);

      // const credential = await this.provider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Auth;
