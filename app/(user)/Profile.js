import React, { useEffect, useState } from "react";
import profilePic from "/images/profile-pic.jpg";
import Link from 'next/link';
import axios from 'axios';


function Profile() {

    const http = authHttps();
    const [selected, setselected] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setProfilePhoto] = useState("");

    const [namee, setNamee] = useState('');
    const [emaile, setEmaile] = useState('');
    const [phonee, setPhonee] = useState('');




    const [passsmsg, setPassMsg] = useState('');
    const [profilemgs, setProfileMgs] = useState('');

    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');




    const [selectedFile1, setselectedFile1] = useState('');
    const [uploadedthumbnail, setuploadedthumbnail] = useState('');

    const fetchChannel = async () => {
        try {
            const response = await fetchAll('user/getUser');



            if (response.data && response.data.status === 1) {

                setselected(response.data.data);
                setName(response.data.data.full_name);
                setEmail(response.data.data.email);
                setPhone(response.data.data.phone);

                if (response.data.data.photo) {

                    setProfilePhoto(response.data.data.photo);

                } else {
                    setProfilePhoto(profilePic);
                }



            }
        } catch (error) {
            console.error('Error get User:', error);
        }
    };





    useEffect(() => {
        fetchChannel();
    }, []);


    const handleFileChanges = async (event) => {

        const selectedFile1 = event.target.files[0];


        try {
            const formData = new FormData();
            formData.append('file', selectedFile1);
            const response = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
            });

            // console.log('photo1', response);

            if (response.data.status == 1) {
                setProfilePhoto(response.data.url);

                if (response.data.url){
                    setselectedFile1(selectedFile1);
                }
            } else {
                console.log(response.data.message);
            }

        } catch (error) {
            console.log('error');
        }
    }



    const handleSubmit = async (event) => {

        try {

            const formData = {
                "full_name": name,
                "email": email,
                "phone": phone,
                "photo": photo
            }




            const response = await fetchAll('/user/profileUpdate/', formData);



            if (response.data.status === 1) {
                setProfileMgs('Update success');

                window.location = window.location.href;

            } else {
                if (Array.isArray(response.data.message)) {
                    response.data.message.map((category) => {
                        if (category.param === "full_name") {
                            setNamee(category.msg);
                        }
                        if (category.param === "email") {
                            setEmaile(category.msg);
                        }
                        if (category.param === "phone") {
                            setPhonee(category.msg);
                        }

                    });
                } else {
                    setNamee('');
                    setEmaile('');
                    setPhonee('');



                }

                setProfileMgs('Profile Not Updsated');
            }
        }
        catch (error) {
            alert('error');
        }
    }


    const handleSubmits = async (event) => {

        try {

            const formData = {
                "password": newpassword,
                "confirm_password": confirmpassword
            }




            const response = await fetchAll('/user/changePassword/', formData);



            if (response.data.status === 1) {
                setPassMsg('Password Change Success');

            } else {
                setPassMsg(response.data.message);
            }
        }
        catch (error) {

        }
    }
    return (
        <>
            <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
                <Sidebar />
            </div>
            <div className="col-xxl-10 col-xl-9 col-lg-9">

                <div className="main__body__wrap left__right__space pb-60">
                    <div className="content-registration pt-3 bg-dark ">
                        <div className="container">
                            <div className='row g-3' >
                                <div className='col-lg-6 text-center'>
                                    <div className="cainoform__wrap">
                                        <div className="profile-pic-box bg-white rounded-circle  m-auto">

                                            {selectedFile1 ? (
                                                <img src={URL.createObjectURL(selectedFile1)} className="rounded-circle  img-fluid" />
                                            ) : (

                                                <img src={photo} className="rounded-circle  img-fluid" />

                                            )}



                                        </div>

                                        <h1 className="h4 mt-3">{selected.full_name}</h1>

                                        <div className="d-block p-4">

                                            <div className="text-success mb-3 text-center">{profilemgs}</div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Fname"
                                                    placeholder="Enter your Name *"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}

                                                />
                                                <label htmlFor="Fname">Name</label>
                                                <div className="text-danger">{namee}</div>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="email" autocomplete="off" className="form-control"
                                                    id="EmailId"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="E.g., name@example.com *"
                                                    readOnly
                                                />
                                                <label htmlFor="EmailId">Email address</label>
                                                <div className="text-danger">{emaile}</div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="tel" autocomplete="off" className="form-control" id="PhoneNo"
                                                    placeholder="E.g., 9876543210 *"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <label htmlFor="EmailId">Phone No.</label>
                                                <div className="text-danger">{phonee}</div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="d-block"><small className="float-start">Upload/change Profile photo</small></label>
                                                <input type="file" className="form-control" name="phone" id="profilePic" onChange={handleFileChanges} placeholder="Enter Your Mobile Number" required="" />
                                            </div>

                                            <div className="create__btn">
                                                <Link href="URL:void(0)" onClick={handleSubmit} className="cmn--btn w-100">
                                                    <span>Update</span>
                                                </Link>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6'>

                                    <div className='cainoform__wrap'>

                                        <div className="d-block p-4">
                                            <div className="content-top  mb-3">
                                                <h2 className="h4 text-center">
                                                    <span >Change Password</span>
                                                </h2>
                                            </div>

                                            <div className="text-success text-center">{passsmsg}</div>
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" id="Password"
                                                    value={newpassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter Your New Password*" />
                                                <label htmlFor="Password">New Password</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" id="Password"
                                                    value={confirmpassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Enter Your Confirm Password*" />
                                                <label htmlFor="Password">Confirm Password</label>
                                            </div>


                                            <div className="create__btn">
                                                <Link href="URL:void(0)" onClick={handleSubmits} className="cmn--btn2 w-100">
                                                    <span>Update</span>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <div className='col-lg-4'>
                                <div className="content-top  mb-3">
                                    <h2 className="h4  text-center">
                                        <span>Updated Address</span>
                                    </h2>
                                </div>
                                <div className='rounded-4 shadow bg-gray login-form-box'>
                                    <form className="p-4">
                                        <div className="form-group">
                                            <select className="form-select py-3" name="country" id="country">
                                                <option>--Select Country--</option>
                                                <option>India</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-3">
                                            <select className="form-select py-3" name="state" id="state">
                                                <option>--Select State--</option>
                                                <option>Karnatka</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-3">
                                            <select className="form-select py-3" name="city" id="city">
                                                <option>--Select City--</option>
                                                <option>Bengalure</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-3">
                                            <textarea className="form-control" name="address1" id="address1" placeholder="Default Address" required=""></textarea>
                                        </div>

                                        <button className="w-100  btn btn-lg btn-primary rounded-5 mt-3 " type="submit">Update</button>


                                    </form>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile