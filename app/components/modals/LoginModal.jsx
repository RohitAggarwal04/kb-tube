"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const LoginModal = () => {


  const [isOpenForm, setIsOpenForm] = useState(false);


  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');


  const [namee, setNamee] = useState('');
  const [emaile, setEmaile] = useState('');
  const [phonee, setPhonee] = useState('');
  const [passworde1, setPassworde1] = useState('');
  const [passworde2, setPassworde2] = useState('');
  const [loginerror, setLoginerror] = useState('');
  const [loginsuccess, setLoginsuccess] = useState('');
  const [respStatus, setRespStatus] = useState(null);



  const router = useRouter();
  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };


  const handleLogin = async () => {

    setLoginsuccess('');
    setLoginerror('');

    try {
      const response = await fetchAll('user/login', {
        email: email,
        password: password,
        otp: otp,
      });

      setRespStatus(response.data.status);


      if (response.data.success === 0) {
        setRespStatus(0);

        // invalid credential
        setLoginerror(response.data.message);
      }
      else
        if (response.data.status === 2) {
          // invalid email
          setLoginerror(response.data.message);
        }
        else
          if (response.data.status === 3) {
            // otp sent successs
            setLoginsuccess(response.data.message);
          }
          else
            if (response.data.status === 4) {
              // invalid otp
              setLoginerror(response.data.message);
            }

            else
              if (response.data && response.data.success === 1) {
                setLoginsuccess(response.data.message);
        const token = response.data.user.token;
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
        //navigate('/');
        window.location.href = './';
      }

    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error during login:', error);
      setLoginerror(error.response.data.message);
      setRespStatus(0);
    }
  };



  const handleRegister = async () => {

    try {
      const responses = await fetchAll('user/register', {
        full_name: name,
        email: emails,
        phone: phone,
        password: password1,
        confirm_password: password2,
        photo: '',
      });

      if (responses.data && responses.data.status === 1) {

        const response = await fetchAll('user/login', {
          email: emails,
          password: password1,
        });

        if (response.data) {
          const token = response.data.user.token;
          // localStorage.setItem('token', JSON.stringify(token))
          // localStorage.setItem('user', JSON.stringify(response.data.user))
          //navigate('/');
          // window.location.href = './';

          router.push('/');
        }

      } else {

        console.error('Error during Register:', responses.data.message);

        setNamee('');
        setEmaile('');
        setPhonee('');
        setPassworde1('');
        setPassworde2('');


        if (Array.isArray(responses.data.message)) {
          responses.data.message.map((category) => {

            if (category.param === "full_name") {
              setNamee(category.msg);

            }
            if (category.param === "email") {
              setEmaile(category.msg);
            }
            if (category.param === "phone") {
              setPhonee(category.msg);
            }
            if (category.param === "password") {
              setPassworde1(category.msg);
            }
            if (category.param === "confirm_password") {
              setPassworde2(category.msg);
            }


          });


        } else {
          setNamee('');
          setEmaile('');
          setPhonee('');
          setPassworde1('');
          setPassworde2('');

          if (responses.data.message === 'User exists') {
            setEmaile(responses.data.message);
          } else {
            console.error(responses.data.message);
            // alert(responses.data.message);
          }
        }
      }
    }
    catch (error) {
      // Log the error to the console for debugging
      console.error('Error during Register:', error);
      // Display the server's error message to the user
      // alert(`Login failed. ${error.response.data.message}`);
    }
  };



  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const handlePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
  };



  return (
    <div
      className="modal register__modal"
      id="signInPin"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row align-items-center g-4">
                <div className="align-items-cener col-lg-6 d-flex justify-content-center">
                  <img src="/images/img/modal/modal.png" alt="Sign In" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                  <div className="modal__right">
                    <h2 className="text-white text-center mb-4">Sign In</h2>
                    <div className="tab-content" id="myTabContent2">

                      <div
                        className="tab-pane fade show active"
                        id="contact2"
                        role="tabpanel"
                      >
                        <div className="form__tabs__wrap">
                          <form action="#0">
                            <div className="form__grp">
                              <label htmlFor="email34">Email</label>
                              <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@mail.com"
                              />
                            </div>
                            <div className="text-danger mb-2">{loginerror}</div>
                            <div className="text-success mb-2">{loginsuccess}</div>

                            {respStatus === null || respStatus === 0 || respStatus === 1 || respStatus === 2 ?

                            <div className="form__grp">
                              <label htmlFor="toggle-password1">
                                Password
                              </label>
                              <input
                                id="toggle-password1"
                                type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="***************"
                              />

                              <Link href="URL:void(0)"
                                className="field-icon toggle-password9"
                                type="button"
                                onClick={handlePasswordVisibility}
                              >
                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                              </Link>
                              </div>
                              : null}

                            {respStatus === 3 || respStatus === 4 ?
                              <div className="form__grp">
                                <label htmlFor="otp34">OTP</label>
                                <input
                                  type="text" value={otp} onChange={(e) => setOTP(e.target.value)}
                                  placeholder="Enter Your OTP *"
                                />
                              </div>
                              : null}

                            <p className="text-end">
                              <Link href="URL:void(0)" data-bs-dismiss="modal" data-bs-toggle="modal"
                                data-bs-target="#ForgotPin">Forgot Password?</Link>
                            </p>
                            <div className="create__btn">
                              <Link href="URL:void(0)" onClick={handleLogin} className="cmn--btn">
                                {(respStatus === 3 || respStatus === 4) &&
                                  <span>Verify OTP</span>
                                }
                                {(respStatus === null || respStatus === 0 || respStatus === 1 || respStatus === 2) &&
                                <span>Sign In</span>
                                }
                              </Link>
                            </div>
                            <p>
                              Don’t have an account?{" "}
                              <Link href="URL:void(0)" data-bs-dismiss="modal" data-bs-toggle="modal"
                                data-bs-target="#signUpPin">Sign Up</Link>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
