"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const LoginModal = () => {


  const [isOpenForm, setIsOpenForm] = useState(false);


  const [registerStatus, setRegisterStatus] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');


  const [namee, setNamee] = useState('');
  const [emaile, setEmaile] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passworde1, setPassworde1] = useState('');
  const [passworde2, setPassworde2] = useState('');
  const [loginerror, setLoginerror] = useState('');


  const navigate = useRouter();
  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };


  const handleLogin = async () => {
    try {
      const response = await fetchAll('user/login', {
        email: email,
        password: password,
      });

      if (response.data) {
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

        setRegisterStatus(responses.data.status);


        // const response = await fetchAll('user/login', {
        //   email: emails,
        //   password: password1,
        // });

        // if (response.data) {
        //   const token = response.data.user.token;
        //   localStorage.setItem('token', JSON.stringify(token))
        //   localStorage.setItem('user', JSON.stringify(response.data.user))
        //   //navigate('/');
        //   window.location.href = './';
        // }

      } else {

        console.error('Error during Register:', responses.data.message);

        setNamee('');
        setEmaile('');
        setPhoneError('');
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
              setPhoneError(category.msg);
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
          setPhoneError('');
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

  const validatePhone = () => {
    try {
      const phoneRegex = /^[0-9]+$/; // Updated regex to allow one or more digits
      if (!phoneRegex.test(phone)) {
        setPhoneError('Please enter a valid phone number');
      } else {
        setPhoneError('');
      }
    } catch (error) {
      setPhoneError('Error validating phone number');
    }
  };



  return (
    <div
      className="modal register__modal"
      id="signUpPin"
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
                    <img src="/images/img/modal/modal.png" alt="Sign Up" className="img-fluid" />
                </div>
                <div className="col-lg-6 modal__right__outer">
                  <div className="modal__right">
                    <h2 className="text-white text-center mb-4">Sign Up</h2>
                    <div className="tab-content" id="myTabContent2">

                      <div
                        className="tab-pane fade show active"
                        id="contact2"
                        role="tabpanel"
                      >
                        <div className="form__tabs__wrap">
                          {(registerStatus === 1) ?
                            <div className="text-center">
                              <div className="success-ico"><span className="bi bi-check-circle"></span></div>
                              <h5 className="text-success">Registration Successfull.</h5>
                              <p>Please proceed to the sign-in page to verify your account and log in.</p>
                              <p>
                                <Link href="URL:void(0)" className="secondary-color" data-bs-dismiss="modal" data-bs-toggle="modal"
                                  data-bs-target="#signInPin">Sign In</Link>
                              </p>
                            </div>
                            :
                            
                          <form action="#0">
                            <div className="form__grp">
                              <label htmlFor="name34">Name</label>
                              <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name *"
                              />
                              <div className="text-danger">{namee}</div>
                            </div>
                            <div className="form__grp">
                              <label htmlFor="phone34">Phone</label>
                              <input
                                type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                onBlur={validatePhone}
                                placeholder="Enter Your Phone *"
                              />
                              <div className="text-danger">{phoneError}</div>
                            </div>
                            <div className="form__grp">
                              <label htmlFor="email34">Email</label>
                              <input
                                type="email" value={emails} onChange={(e) => setEmails(e.target.value)}
                                placeholder="user@mail.com"
                              />
                              <div className="text-danger">{emaile}</div>
                            </div>
                            <div className="form__grp">
                              <label htmlFor="toggle-password10">
                                Password
                              </label>
                              <input
                                id="toggle-password10"
                                type={showPassword ? 'text' : 'password'} value={password1} onChange={(e) => setPassword1(e.target.value)}
                                placeholder="Enter Your Password"
                              />

                              <a
                                className="field-icon toggle-password9"
                                type="button"
                                onClick={handlePasswordVisibility}
                              >
                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                              </a>
                            </div>
                            <div className="form__grp">
                              <label htmlFor="toggle-password4">
                                Confirm Password
                              </label>
                              <input
                                id="toggle-password4"
                                type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Confirm Password"
                              />

                             
                            </div>

                            <div className="form-check">
                              <input className="form-check-input border-dark" type="checkbox" value="" id="RememberMe" required name='RememberMe' />
                              <label className="form-check-label" checked htmlFor="RememberMe">
                                <small>Accept our <Link href="/privacy-policy" className="text-theme"><span data-bs-dismiss="modal" >Privacy Policy</span></Link></small>
                              </label>
                            </div>
                            <div className="create__btn">
                              <Link href="URL:void(0)" onClick={handleRegister} className="cmn--btn">
                                <span>Sign Up</span>
                              </Link>
                            </div>
                            <p>
                              Already have an account?{" "}
                              <Link href="URL:void(0)" data-bs-dismiss="modal"  data-bs-toggle="modal"
                                data-bs-target="#signInPin">Sign In</Link>
                            </p>
                          </form>
}
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
