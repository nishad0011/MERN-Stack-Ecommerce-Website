import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { MdOutlineMail, MdLockOpen } from "react-icons/md";
import { BiFace } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom";


import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";


const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const { error, loading, isAuthenticated } = useSelector(state => state.user)

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form Submitted");
    dispatch(login(loginEmail, loginPass))
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("Signup Form Submitted");

    dispatch(register(myForm))
  };

  const registerDataChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        //0=initial , 1=Loading , 2=Read Complete
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/account`);
    }

  }, [dispatch, error, alert, isAuthenticated])

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");

      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");

      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">

          {(loading) ? <Loader /> :
            <>
              <div>
                <div className="login_signup_toggle">
                  <div>
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  </div>
                  <div>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                  </div>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form
                className="loginform"
                ref={loginTab}
                onSubmit={loginSubmit}
                action=""
              >
                <div className="loginEmail">
                  <MdOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPass">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </div>
                <Link className="fpLink" to="/password/forgot">
                  Forgot Password
                </Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signupform"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                action=""
              >
                <div className="signupName">
                  <BiFace />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupEmail">
                  <MdOutlineMail />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signupPass">
                  <MdLockOpen />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signupBtn" disabled={loading ? true : false}
                />
              </form>

            </>
          }
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
