import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Includes/Sidebar'
import { Link } from 'next/navigation'
import UploadVideo from '../../components/Functions/UploadVideo'
import profilePic from "../@/public/images/profile-pic.jpg";
import { authHttps } from "../../auth/AuthUser";
import axios from 'axios';
import { FileUpload } from "@mui/icons-material";



function Customization() {
  const http = authHttps();

  const [name, setName] = useState('');
  const [handel, setHandel] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState('');
  const [banner, setBanner] = useState('');

  const [namese, setNames] = useState('');
  const [conatcte, setEmails] = useState('');
  const [desce, setdescs] = useState('');
  const [handale, setHandals] = useState('');




  const [selectedFile, setselectedFile] = useState('');
  const [selectedFile1, setselectedFile1] = useState('');

  const fetchChannel = async () => {
    try {
      const response = await fetchAll('user/myChanel');
      // console.log(response);
      if (response.data && response.data.status === 1) {

        setName(response.data.data.name);
        setHandel(response.data.data.url);
        setDescription(response.data.data.description);
        setContact(response.data.data.contact);
        setPhoto(response.data.data.photo);
        setBanner(response.data.data.banner);

      }
    } catch (error) {
      console.error('Error fetching Channel:', error);
    }
  };


  useEffect(() => {
    fetchChannel();
  }, []);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];


    try {
      const FILENAME_TO_UPLOAD = selectedFile.name;
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
      });

      if (response.data.status === 1) {
        setselectedFile(selectedFile);
        const channel = response.data.url;
        setPhoto(channel);
      } else {
        alert(response.data.message);
      }



    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }

  const handleFileChanges1 = async (event) => {

    const selectedFile12 = event.target.files[0];


    try {
      const FILENAME_TO_UPLOAD = selectedFile12.name;
      const formData = new FormData();
      formData.append('file', selectedFile12);
      const response = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
      });

      if (response.data.status === 1) {
        setselectedFile1(selectedFile12);
        const banner = response.data.url;
        setBanner(banner);
      } else {
        alert(response.data.message);
      }



    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }





  const publishChange = async (event) => {
    try {
      const response = await fetchAll('user/createChanel', {
        "name": name,
        "contact": contact,
        "description": description,
        "photo": photo,
        "banner": banner,
        "subscriber": 0,
        "url": handel
      });


      if (response.data.status === 1) {
        window.location.href = './customization';
      } else {

        response.data.message.map((category) => {
          if (category.param === "name") {
            setNames(category.msg);
          }
          if (category.param === "contact") {
            setEmails(category.msg);
          }
          if (category.param === "description") {
            setdescs(category.msg);
          }
          if (category.param === "url") {
            setHandals(category.msg);
          }
        });

      }
    } catch (error) {
      console.error('Error fetching video categories:', error);
    }
  };





  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
        <Sidebar />
      </div>
      <div className="col-xxl-10 col-xl-9 col-lg-9">

        <div className="main__body__wrap left__right__space pb-60 pt-20">
          <div className='container'>
            <div className='row g-2'>
              <div className='col-lg-7'>
                <h1 className='h5'>{name ? 'Customization' : 'Create'} Channel </h1>
              </div>

            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='profile-box'>

                  <div className='row'>
                    <div className='col-12 theme-tabs'>
                      <nav>
                        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-Basic-tab" data-bs-toggle="tab" data-bs-target="#nav-Basic" type="button" role="tab" aria-controls="nav-Basic" aria-selected="false">Basic info</button>
                          <button className="nav-link" id="nav-Branding-tab" data-bs-toggle="tab" data-bs-target="#nav-Branding" type="button" role="tab" aria-controls="nav-Branding" aria-selected="false">Branding</button>

                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">

                        <div className="tab-pane fade" id="nav-Branding" role="tabpanel" aria-labelledby="nav-Branding-tab">
                          <div className='row'>
                            <div className='col-lg-9'>
                              <div className='box'>
                                <h3 className='h5'>Picture </h3>
                                <p><small>Your profile picture will appear where your channel is presented on kbtube, like next to your videos and comments</small></p>
                                <div className='row align-items-center'>
                                  <div className='col-lg-4'>
                                    <div className='bg-light border-2 border-dark p-3 rounded-3 text-center'>
                                      <div className='profile-pic-box rounded-circle m-auto'>
                                        {selectedFile ? (
                                          <img src={URL.createObjectURL(selectedFile)} className="rounded-circle  img-fluid" />
                                        ) : (
                                          photo ? (
                                            <img src={photo} className="rounded-circle  img-fluid" />
                                          ) : (
                                            <img src={profilePic} className="rounded-circle  img-fluid" />
                                          )

                                        )}

                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-lg-8'>
                                    <p><small>It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the kbtube Community Guidelines. </small></p>
                                    <div className="video-upload-btn w-50">
                                      <label className="input-group-text h-auto thumbnail" htmlFor="inputGroupFile011">
                                        <div className="m-auto file-icon"><FileUpload /></div>
                                        <span>Upload</span></label>
                                      <input type="file" className="form-control" id="inputGroupFile011" accept=".png, .jpg, .jpeg, .gif" name="file" onChange={handleFileChange} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='box mt-3'>
                                <h3 className='h5'>Banner image </h3>
                                <p><small>This image will appear across the top of your channel</small></p>
                                <div className='row align-items-center'>
                                  <div className='col-lg-4'>
                                    <div className='bg-light border-2 border-dark p-3 rounded-3 text-center'>
                                      <div className='profile-pic-box  m-auto'>

                                        {selectedFile1 ? (
                                          <img src={URL.createObjectURL(selectedFile1)} className="img-fluid" />
                                        ) : (
                                          banner ? (
                                            <img src={banner} className="img-fluid" />
                                          ) : (
                                            <img src={profilePic} className="img-fluid" />
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-lg-8'>
                                    <p><small>It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the kbtube Community Guidelines. </small></p>
                                    <div className="video-upload-btn w-50">
                                      <label className="input-group-text h-auto thumbnail" htmlFor="inputGroupFile013">
                                        <div className="m-auto file-icon"><FileUpload /></div>
                                        <span>Upload</span></label>
                                      <input type="file" className="form-control" id="inputGroupFile013" accept=".png, .jpg, .jpeg, .gif" name="file" onChange={handleFileChanges1} />
                                    </div>
                                  </div>




                                </div>
                                <Link href="URL:void(0)" style={{ float: 'right' }} onClick={publishChange} className='cmn--btn rounded-5 px-3 pull-right' >
                                  <span>PUBLISH</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>




                        <div className="tab-pane fade show active" id="nav-Basic" role="tabpanel" aria-labelledby="nav-Basic-tab">
                          <div className='row'>
                            <div className='col-lg-9'>
                              <div className='box mb-3'>
                                <h3 className='h6'>Name</h3>
                                <p><small>Choose a channel name that represents you and your content.</small></p>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="ChannelName"
                                    placeholder="Enter your Channel Name *"
                                  />

                                </div>
                                <div className="text-danger">{namese}</div>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Handle</h3>
                                <p><small>Choose your unique handle by adding letters and numbers.</small></p>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={handel}
                                    onChange={(e) => {
                                      const filteredValue = e.target.value.replace(/[^A-Za-z0-9-_]/g, '');
                                      setHandel(filteredValue);
                                    }}
                                    id="uChannelName"
                                    placeholder="Enter Handle *"
                                  />

                                </div>
                                {/* <p><small>url: https://www.kbtube.com/@{handel}</small></p> */}
                                <div className="text-danger">{handale}</div>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Description</h3>
                                <div className="form-group">
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    id="uChannelName"
                                    placeholder="Enter Description *"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                  ></textarea>

                                </div>
                                <div className="text-danger">{desce}</div>
                              </div>

                              <div className='box mb-3'>
                                <h3 className='h6'>Contact info</h3>
                                <div className="form-group">
                                  <input type="text"
                                    className="form-control"
                                    id="EMail"
                                    placeholder="Enter your Email *"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                  />
                                </div>
                                <div className="text-danger">{conatcte}</div>
                              </div>

                              <Link href="URL:void(0)" style={{ float: 'right' }} onClick={publishChange} className='cmn--btn rounded-5 px-3 pull-right' >
                                <span>PUBLISH</span>
                              </Link>
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
      </div>
      <UploadVideo />
    </>
  )
}

export default Customization