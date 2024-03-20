'use client'

import AppLayout from '@/app/layouts/app'
import { useState, useContext } from 'react'
import Link from 'next/link';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { APP_URL } from '@/app/lib/auth/config';
import Head from 'next/head';
import Layout from '@/app/components/Layout';

export default function Login() {

    const { login } = useContext(AuthContext);

    const metadataBase = new URL(APP_URL || 'https://kbtube.com/');
    const metaData = {
        title: "Login | KB TuBE",
        keywords: "Login video, sharing, camera phone, video phone, free, upload",
        description: "Login KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience.",
        twitterCard: "Login KB TuBE",
        canonical: `${metadataBase}login/`,
        share_image: `${metadataBase}/images/share.png`,
    }

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [registerStatus, setRegisterStatus] = useState(null);
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

    const toggleForm = () => {
        setIsOpenForm(!isOpenForm);
    };


    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [showPassword2, setShowPassword2] = useState(false);

    const handlePasswordVisibility2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2);
    };


    const handleRegister = async () => {

        try {
            const responses = await axios.post('api/register', {
                full_name: name,
                email: emails,
                phone: phone,
                password: password1,
                confirm_password: password2,
                photo: '',
            });

            if (responses.data && responses.data.status === 1) {

                setRegisterStatus(responses.data.status);
                // const response = await http.post('user/login', {
                //     email: emails,
                //     password: password1,
                // });

                // if (response.data) {
                //     const token = response.data.user.token;
                //     localStorage.setItem('token', JSON.stringify(token))
                //     localStorage.setItem('user', JSON.stringify(response.data.user))
                //     //navigate('/');
                //     window.location.href = './';
                // }

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



    const handleLogin = async () => {

        const jsonData = {
            email: email,
            password: password,
            otp: otp,
        };


        try {
            const responseData = await axios.post('/api/authenticate', jsonData);
            const response = responseData.data;

            if (response) {
                if (response.success) {
                    setRespStatus(response.success);
                } else {
                    setRespStatus(response.status);
                }
            }

            if (response.success === 0) {
                setRespStatus(0);

                // invalid credential
                setLoginerror(response.message);
            }
            else if (response.status === 2) {
                // invalid email
                setLoginerror(response.message);
            }
            else if (response.status === 3) {
                // otp sent successs
                setLoginsuccess(response.message);
            }
            else if (response.status === 4) {
                // invalid otp
                setLoginerror(response.message);
            }

            else if (response && response.success === 1) {
                setLoginerror("");
                setLoginsuccess(response.message);

                const user = response.user;
                const token = response.user.token;

                login(token, user);
                console.log("response.user:", response.user);


                // localStorage.setItem('token', JSON.stringify(token))
                // localStorage.setItem('user', JSON.stringify(response.user))
                //navigate('/');
                // window.location.href = './';
            }
        } catch (error) {
            setLoginerror("Invalid User Credential.");
            setRespStatus(0);
        }



    };


    return (
            <>

                <Head>
                    <title>{metaData.title}</title>
                    <meta name="keywords" content={metaData.keywords} />
                    <meta name="description" content={metaData.description} />
                    <link rel="canonical" href={metaData.canonical} />

                    <meta property="og:title" content={metaData.title} />
                    <meta property="og:description" content={metaData.description} />
                    <meta property="og:image" content={metaData.share_image} />

                    <meta name="twitter:card" content={metaData.title} />
                    <meta name="twitter:title" content={metaData.title} />
                    <meta name="twitter:description" content={metaData.description} />
                    <meta name="twitter:image" content={metaData.share_image} />
                </Head>
                <Layout withoutSideBar={true}>
            <ErrorBoundary fallback={<Error />}>
                <div className='container p-lg-5 py-5'>
                    <div className='row justify-content-center align-items-center' >
                        <div className='col-lg-4 col-md-6 col-sm-10'>
                            <div className="content-top  mb-3">
                                <h2 className="fw-bolder text-center">
                                    <span className={`${isOpenForm ? 'd-none' : 'd-block'}`}>Sign in</span>
                                    <span className={`${isOpenForm ? 'd-block' : 'd-none'}`}>Sign up</span>
                                </h2>
                            </div>
                            <div className='rounded-4 shadow bg-gray login-form-box'>

                                <form action="/api/login" className={`p-3 ${isOpenForm ? 'd-none' : 'd-block'}`} >

                                    <div className="form-floating mb-3">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>

                                    <div className="text-danger mb-2">{loginerror}</div>
                                    <div className="text-success mb-2">{loginsuccess}</div>


                                    {respStatus === null || respStatus === 0 || respStatus === 2 ?

                                        <div className="form-floating mb-3">
                                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" />
                                            <label htmlFor="floatingPassword">Password</label>

                                            <a
                                                className="show-password"
                                                type="button"
                                                onClick={handlePasswordVisibility}
                                            >
                                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </a>
                                        </div>
                                        : null}

                                    {respStatus === 3 || respStatus === 4 ?
                                        <div className="form-floating mb-3">
                                            <input type="email" value={otp} onChange={(e) => setOTP(e.target.value)} className="form-control" id="otp345" placeholder="123456" />
                                            <label htmlFor="otp345">OTP</label>
                                        </div>
                                        : null}

                                    <div className='row my-3'>
                                        <div className='col-6'>
                                            <div className="form-check">
                                                <input className="form-check-input border-dark" type="checkbox" value="" id="RememberMe3" name='RememberMe' required />
                                                <label className="form-check-label" htmlFor="RememberMe3"><small>Remember me</small></label>
                                            </div>
                                        </div>
                                        {/* <div className='col-6 text-end'>
                                            <a href='/' className='text-theme text-decoration-none'> <small>Forgot Password</small> </a>
                                        </div> */}


                                    </div>
                                    <button type="button" className="w-100 mb-2 cmn--btn btn-lg rounded-5" onClick={handleLogin}>
                                        {(respStatus === 3 || respStatus === 4) &&
                                            <span>Verify OTP</span>
                                        }
                                        {(respStatus === null || respStatus === 0 || respStatus === 1 || respStatus === 2) &&
                                            <span>Sign In</span>
                                        }
                                    </button>
                                    <div className="mt-2">
                                        Don’t have an account? <a href="#" className="text-decoration-none secondary-color" onClick={toggleForm} >Sign up</a>
                                    </div>
                                </form>

                                {(registerStatus === 1) ?
                                    <div className="p-3 p-lg-5 text-center" onClick={() => setRegisterStatus(null)}>
                                        <div className="success-ico"><span className="bi bi-check-circle"></span></div>
                                        <h5 className="secondary-color">Registration Successfull.</h5>
                                        <p>Please proceed to the sign-in page to verify your account and log in.</p>
                                        <p>
                                            <Link href="URL:void(0)" className="text-decoration-none secondary-color" onClick={toggleForm} >Sign In</Link>
                                        </p>
                                    </div>
                                    :
                                    <form action="/api/register" className={`p-3 ${isOpenForm ? 'd-block' : 'd-none'}`}>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your Name *" />
                                            <label htmlFor="Fname">Name</label>
                                            <div className="text-danger">{namee}</div>

                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" value={emails} onChange={(e) => setEmails(e.target.value)} id="EmailId" placeholder="E.g., name@example.com *" />
                                            <label htmlFor="EmailId">Email address</label>
                                            <div className="text-danger">{emaile}</div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="9876543210 *" />
                                            <label htmlFor="EmailId">Phone</label>
                                            <div className="text-danger">{phonee}</div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type={showPassword2 ? 'text' : 'password'} className="form-control" value={password1} onChange={(e) => setPassword1(e.target.value)} id="Password2" placeholder="Enter Your New Password*" />
                                            <label htmlFor="Password2">Password</label>
                                            <div className="text-danger">{passworde1}</div>
                                            <a
                                                className="show-password"
                                                type="button"
                                                onClick={handlePasswordVisibility2}
                                            >
                                                {showPassword2 ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </a>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type='password' className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} id="Password" placeholder="Enter Your New Password*" />
                                            <label htmlFor="Password">Confirm Password</label>
                                            <div className="text-danger">{passworde2}</div>

                                        </div>

                                        <div className='row my-3'>
                                            <div className='col-12'>
                                                <div className="form-check">
                                                    <input className="form-check-input border-dark" type="checkbox" value="" id="RememberMe2" required name='RememberMe' />
                                                    <label className="form-check-label" checked htmlFor="RememberMe2">
                                                        <Link href="/privacy-policy" className="text-decoration-none secondary-color"><small>Accept our  Privacy Policy</small></Link>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* <div className='col-6 text-end'>
                                            <a href='/' className='text-theme text-decoration-none'> <small>Forgot Password</small> </a>
                                        </div> */}

                                        </div>
                                        <Link href="URL:void(0)" className="w-100 mb-2  btn-lg cmn--btn  rounded-5" onClick={handleRegister} >
                                            <span>Create an account</span>
                                        </Link>
                                        <div className="mt-2">
                                            Already have an account? <a href="#" className="text-decoration-none secondary-color" onClick={toggleForm} >Sign in</a>
                                        </div>
                                    </form>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
                </Layout>
                </>

    )
}
