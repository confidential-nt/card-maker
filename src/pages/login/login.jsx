import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = ({ user, AuthSys, onSocialLogin, database }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/app");
      return;
    }
  });

  const socialLogin = async (provider) => {
    const authSys = new AuthSys(provider);
    const userInfo = await authSys.login();
    const userObject = { ...userInfo, cards: [{}] };
    onSocialLogin(userObject, authSys);
    data.readDataById("users", userInfo.uid, (value) => {
      if (!value) {
        database.writeData("users", userObject, userInfo.uid);
      }
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Login</h2>
        <div className={styles.btns}>
          <button onClick={() => socialLogin(GoogleAuthProvider)}>
            Google
          </button>
          <button onClick={() => socialLogin(GithubAuthProvider)}>
            Github
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
