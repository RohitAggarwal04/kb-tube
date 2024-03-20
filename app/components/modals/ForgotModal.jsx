"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const ForgotModal = () => {


  const [isOpenForm, setIsOpenForm] = useState(false);


  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgoterror, setforgoterror] = useState('');
  const [forgotStatus, setforgotStatus] = useState(null);


  const router = useRouter();
  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };


  const handleforgot = async () => {
    setForgotSuccess('');
    setforgoterror('');

    try {

      const response = await fetchAll('user/forgotPassword', {
        email: email,
        otp: otp,
        password: password,
        confirm_password: password2,
      });

      // checking if api nrequest is successfull
      if (response && response.data && response.status == 200) {
        // getting response data 
        const forgot_response = response.data;
        setforgotStatus(forgot_response.status);

        if (forgot_response.status === 0) {
          // email wrong
          setforgoterror(forgot_response.message);
        }

        if (forgot_response.status === 1) {
          // otp sent
          setForgotSuccess(forgot_response.message);
        }

        if (forgot_response.status === 2) {
          // otp invalid
          setforgoterror(forgot_response.message);
        }

        if (forgot_response.status === 3) {
          // otp verified
          setForgotSuccess(forgot_response.message);
        }

        if (forgot_response.status === 4) {
          // password & confirm password not match
          setforgoterror(forgot_response.message);
        }

        if (forgot_response.status === 5) {
          // password updated successfully
          setForgotSuccess(forgot_response.message);
        }
      }

    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error during Forgot:', error);
      setforgoterror(error.response.data.message);
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const clearForgotSys = () => {

    setEmail('');
    setOTP('');
    setPassword('');
    setPassword2('');
    setForgotSuccess('');
    setforgoterror('');
    setforgotStatus(null);

  }


  return (
    <div
      className="modal register__modal"
      id="ForgotPin"
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
                  <img src="/images/img/modal/modal.png" alt="Forgot Password" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                  <div className="modal__right">
                    <h2 className="text-white text-center mb-4">Forgot Password</h2>
                    <div className="tab-content" id="myTabContent2">

                      <div
                        className="tab-pane fade show active"
                        id="contact2"
                        role="tabpanel"
                      >
                        <div className="form__tabs__wrap">

                          <form action="#0">
                            {(forgotStatus === null || forgotStatus === 0) &&
                              <div className="form__grp">
                                <label htmlFor="email34">Email</label>
                                <input
                                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                  placeholder="user@mail.com"
                                />
                              </div>
                            }

                            {forgotStatus === 1 || forgotStatus === 2 ?
                              <div className="form__grp">
                                <label htmlFor="otp34">OTP</label>
                                <input
                                  type="text" value={otp} onChange={(e) => setOTP(e.target.value)}
                                  placeholder="Enter Your OTP *"
                                />
                              </div>
                              : null}
                              
                            {forgotStatus === 3 || forgotStatus === 4 ?
                              <>
                                <div className="form__grp">
                                  <label htmlFor="toggle-password41">
                                    Password
                                  </label>
                                  <input
                                    id="toggle-password41"
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
                                <div className="form__grp">
                                  <label htmlFor="toggle-password31">
                                    Confirm Password
                                  </label>
                                  <input
                                    id="toggle-password31"
                                    type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}
                                    placeholder="Confirm Password"
                                  />
                                </div>
                              </>
                              : null}

                            {(forgotStatus === 5) ?
                              <div className="text-center">
                                <div className="success-ico"><span className="bi bi-check-circle"></span></div>
                                <h5 className="text-success">Password Changed Successfully.</h5>
                                <p>Please proceed to the sign-in page to log in.</p>
                              </div>
                              :
                              <>
                                <div className="text-success mb-2">{forgotSuccess}</div>
                                <div className="text-danger mb-2">{forgoterror}</div>
                              </>
                            }

                            {(forgotStatus !== 5) &&
                              <div className="create__btn">
                                <Link href="URL:void(0)" onClick={handleforgot} className="cmn--btn">
                                  {(forgotStatus === null || forgotStatus === 0) && <span>Verify Email</span>}
                                  {(forgotStatus === 1 || forgotStatus === 2) && <span>Verify OTP</span>}
                                  {(forgotStatus === 3 || forgotStatus === 4) && <span>Change Password</span>}
                                </Link>
                              </div>
                            }
                            <p>
                              Return to {" "}
                              <Link href="URL:void(0)" data-bs-dismiss="modal" data-bs-toggle="modal" onClick={clearForgotSys}
                                data-bs-target="#signInPin">Sign In</Link>
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

export default ForgotModal;
