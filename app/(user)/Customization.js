import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import { Link } from 'next/navigation'
import UploadVideo from '@/app/components/UploadVideo'
import profilePic from "@/public/images/profile-pic.jpg";

function Customization() {
  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
        <Sidebar />
      </div>
      
      <div className="col-xxl-10 col-xl-9 col-lg-9">

        <div className="main__body__wrap left__right__space pt-20 pb-60">
          <div className='container'>
            <div className='row g-2'>
              <div className='col-lg-7'>
                <h1 className='h5'>Channel Customization</h1>
              </div>
              <div className='col-lg-5 text-end position-relative '>
                <div className='customization-top-btns d-none d-lg-block'>
                  <Link href="/channel" className='text-primary text-decoration-none'>VIEW CHANNEL</Link>
                  <button type='button' className='btn text-secondary border-0' disabled>CANCEL</button>
                  <button type='button' className='btn btn-secondary rounded-0 px-3' disabled>PUBLISH</button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='profile-box'>

                  <div className='row'>
                    <div className='col-12 theme-tabs'>
                      <nav>
                        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-Layout-tab" data-bs-toggle="tab" data-bs-target="#nav-Layout" type="button" role="tab" aria-controls="nav-Layout" aria-selected="false">Layout</button>
                          <button className="nav-link" id="nav-Branding-tab" data-bs-toggle="tab" data-bs-target="#nav-Branding" type="button" role="tab" aria-controls="nav-Branding" aria-selected="false">Branding</button>
                          <button className="nav-link" id="nav-Basic-tab" data-bs-toggle="tab" data-bs-target="#nav-Basic" type="button" role="tab" aria-controls="nav-Basic" aria-selected="false">Basic info</button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-Layout" role="tabpanel" aria-labelledby="nav-Layout-tab">
                          <h2 className='h6'>Video spotlight</h2>
                          <p><small>Add a video to the top of your channel homepage</small></p>
                          <div className='row'>
                            <div className='col-lg-10'>
                              <div className='box'>
                                <div className="card mb-3">
                                  <div className="card-body theme-card-body">
                                    <div className='icon-box'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                      </svg>
                                    </div>
                                    <div className='content'>
                                      <h3 className='h6'>Channel trailer for people who haven't subscribed</h3>
                                      <p>Share a preview of your channel shown with people who haven’t subscribed yet.  </p>
                                    </div>
                                    <div className='action'>
                                      <button type='button' className='btn text-primary' data-bs-toggle="modal" data-bs-target="#videoUpload" ><strong>ADD</strong></button>
                                    </div>
                                  </div>
                                </div>
                                <div className="card mb-3">
                                  <div className="card-body theme-card-body">
                                    <div className='icon-box'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                      </svg>
                                    </div>
                                    <div className='content'>
                                      <h3 className='h6'>Featured video for returning subscribers</h3>
                                      <p>Highlight a video for your subscribers to watch. This video won’t be shown again at the top of your page for subscribers who have watched it  </p>
                                    </div>
                                    <div className='action'>
                                      <button type='button' className='btn text-primary' data-bs-toggle="modal" data-bs-target="#videoUpload" ><strong>ADD</strong></button>
                                    </div>
                                  </div>
                                </div>
                                <h3 className='h6'>Recommendations for your viewers</h3>
                                <div className="card mb-3">
                                  <div className="card-body theme-card-body">
                                    <div className='icon-box'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                      </svg>
                                    </div>
                                    <div className='content'>
                                      <h3 className='h6'>Featured video for returning subscribers</h3>
                                      <p>Highlight a video for your subscribers to watch. This video won’t be shown again at the top of your page for subscribers who have watched it  </p>
                                    </div>
                                    <div className='action'>
                                      <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Branding" role="tabpanel" aria-labelledby="nav-Branding-tab">
                          <div className='row'>
                            <div className='col-lg-9'>
                              <div className='box'>
                                <h3 className='h5'>Picture </h3>
                                <p><small>Your profile picture will appear where your channel is presented on kbtube, like next to your videos and comments</small></p>
                                <div className='row align-items-center'>
                                  <div className='col-lg-4'>
                                    <div className='bg-light text-center p-3'>
                                      <div className='profile-pic-box rounded-circle m-auto'>
                                        <img src={profilePic} className="rounded-circle  img-fluid" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-lg-8'>
                                    <p><small>It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the kbtube Community Guidelines. </small></p>
                                    <div className="video-upload-btn w-50">
                                      <label className="input-group-text h-auto" htmlFor="inputGroupFile01">
                                        <span className='text-white'>Upload</span></label>
                                      <input type="file" className="form-control" id="inputGroupFile01" name="file" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='box mt-3'>
                                <h3 className='h5'>Banner image </h3>
                                <p><small>This image will appear across the top of your channel</small></p>
                                <div className='row align-items-center'>
                                  <div className='col-lg-4'>
                                    <div className='bg-light text-center p-3'>
                                      <div className='profile-pic-box rounded-circle m-auto'>
                                        <img src={profilePic} className="rounded-circle  img-fluid" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-lg-8'>
                                    <p><small>For the best results on all devices, use an image that’s at least 2048 x 1152 pixels and 6MB or less. </small></p>
                                    <div className="video-upload-btn w-50">
                                      <label className="input-group-text h-auto text-light" htmlFor="inputGroupFile01">
                                        <span className='text-light'>Upload</span></label>
                                      <input type="file" className="form-control" id="inputGroupFile01" name="file" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Basic" role="tabpanel" aria-labelledby="nav-Basic-tab">
                          <div className='row'>
                            <div className='col-lg-9'>
                              <div className='box mb-3'>
                                <h3 className='h6'>Name</h3>
                                <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on kbtube and not other Google services. You can change your name twice in 14 days. </small></p>
                                <div className="form-group">
                                  <input type="text" className="form-control" id="ChannelName" placeholder="Enter your Channel Name *" />
                                </div>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Handle</h3>
                                <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on kbtube and not other Google services. You can change your name twice in 14 days.</small></p>
                                <div className="form-group">
                                  <input type="text" className="form-control" id="uChannelName" placeholder="Enter Handle *" />
                                </div>
                                <p><small>url: https://www.kbtube.com/@azsm-dfas4</small></p>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Description</h3>
                                <div className="form-group">
                                  <textarea type="text" className="form-control" id="uChannelName" placeholder="Enter Description *" ></textarea>
                                </div>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Channel URL</h3>
                                <p><small>This is the standard web address for your channel. It includes your unique channel ID, which is the numbers and letters at the end of the URL. </small></p>
                                <div className="input-group mb-3">
                                  <input type="text" className="form-control" value="https://www.kbtube.com/channel/UCOylmxZH8WwwQTnFxHsI0" readOnly />
                                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">Copy</button>
                                </div>
                              </div>
                              <div className='box mb-3'>
                                <h3 className='h6'>Contact info</h3>
                                <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on kbtube and not other Google services. You can change your name twice in 14 days. </small></p>
                                <div className="form-group">
                                  <input type="text" className="form-control" id="EMail" placeholder="Enter your EMail *" />
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
          <div className='customization-top-btns d-block d-lg-none text-center'>
            <Link href="/channel" className='text-primary text-decoration-none'>VIEW CHANNEL</Link>
            <button type='button' className='btn text-secondary border-0' disabled>CANCEL</button>
            <button type='button' className='btn btn-secondary rounded-0 px-3' disabled>PUBLISH</button>
          </div>
        </div>
      </div>
      <UploadVideo />
    </>
  )
}

export default Customization