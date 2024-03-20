import React from 'react'
import Sidebar from '@/app/components/Includes/Sidebar'
import IcoUpload from "../assets/icons/uploadIco.svg";
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import video1 from '../assets/videos/video-1.mp4';
import img1 from '@/public/images/thumnail-1.jpg';
import img2 from '@/public/images/thumnail-2.jpg';

function VideoDetails() {
  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
        <Sidebar />
      </div>
      <div className="col-xxl-10 col-xl-9 col-lg-9">
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-6'>
              <h3 className='h5'>Details</h3>
            </div>
            <div className='col-6 text-end'>
              <button className='btn btn-primary px-4'>Save</button>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-lg-8'>
              <div className='box'>

                <div className="form-floating">
                  <textarea className="form-control mb-3" placeholder="Title" id="floatingTextarea2" style={{ height: '80px' }}></textarea>
                  <label htmlFor="floatingTextarea2">Title (Required)</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="Tell viewers about your video" id="floatingTextarea3" style={{ height: '120px' }}></textarea>
                  <label htmlFor="floatingTextarea3">Description (Required) <br /> </label>
                </div>
              </div>
              <div className='box'>
                <h4 className='h6'>Thumbnail</h4>
                <p><small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small></p>
                <div className='row align-items-start g-3'>
                  <div className='col-lg-4 col-12'>
                    <div className="video-upload-btn">
                      <label className="input-group-text" htmlFor="inputGroupFile01" style={{ height: '117.58px' }}>
                        <img src={IcoUpload} alt="UploadCloudIcon" className="m-auto" width={20} />
                        <span>Upload Thumbnail</span></label>
                      <input type="file" className="form-control" id="inputGroupFile01" name="file" />
                    </div>
                  </div>
                  <div className='col-lg-4 col-6'>
                    <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail1" autocomplete="off" checked />
                    <label className="btn btn-outline-secondary" htmlFor="Thumbnail1"><img src={img1} alt="UploadCloudIcon" className="m-auto w-100" /></label>
                  </div>
                  <div className='col-lg-4 col-6'>
                    <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail2" autocomplete="off" />
                    <label className="btn btn-outline-secondary" htmlFor="Thumbnail2"><img src={img2} alt="UploadCloudIcon" className="m-auto w-100" /></label>
                  </div>
                </div>
              </div>
              {/* box end */}
              <div className='box mt-3'>
                <h3 className='h5'>Playlist</h3>
                <p><small>Add your video to one or more playlists to organize your content for viewers.</small></p>

                <div className="form-floating">
                  <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>--select--</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <label htmlFor="floatingSelect">Selects playlist Category</label>
                </div>
              </div>
              {/* box end */}
              <div className='box mt-2'>
                <h3 className='h5'>Audience</h3>
                <p><strong>Is this video made for kids? (required)</strong></p>
                <p><small>Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids. What's content made for kids?</small></p>
                <div className="form-check">
                  <input className="form-check-input border-dark" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Yes, it's made for kids.
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input border-dark" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    No, it's not made for kids
                  </label>
                </div>
                <p className='mt-2'><strong>Do you want to restrict your video to an adult audience?</strong></p>
                <div className="form-check">
                  <input className="form-check-input border-dark" type="radio" name="exampleRadios2" id="exampleRadios3" value="option1" checked />
                  <label className="form-check-label" htmlFor="exampleRadios3">
                    Yes, restrict my video to viewers over 18
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input border-dark" type="radio" name="exampleRadios2" id="exampleRadios4" value="option2" />
                  <label className="form-check-label" htmlFor="exampleRadios4">
                    No, don't restrict my video to viewers over 18 only
                  </label>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='video-box-single-v rounded-0 sticky-lg-top'>
                <Card className='rounded-0'>
                  <CardMedia
                    component="video" // specify that this is a video
                    alt="Video Poster" // specify an alt text for accessibility
                    // set the height of the video player
                    //  poster={img3} // replace with your poster image URL
                    autoPlay={false} // enable autoplay
                    controls // enable video controls (play, pause, etc.)
                    className='w-100'
                    muted
                  >
                    <source src={video1} className='w-100' type="video/mp4" />
                  </CardMedia>
                </Card>
                <div className="input-group my-3">
                  <label className='w-100'><small>Video Link</small></label>
                  <input type="text" className="form-control" value='https://youtu.be/ewntP-Xf_iU' placeholder="https://youtu.be/ewntP-Xf_iU" aria-label="https://youtu.be/ewntP-Xf_iURecipient's username" aria-describedby="basic-addon2" readOnly />
                  <span className="input-group-text" id="basic-addon2">Copy</span>
                </div>
                <div className="input-group mb-3">
                  <label className='w-100'><small>Filename</small></label>
                  <input type="text" className="form-control" value='video.mp4' placeholder="https://youtu.be/ewntP-Xf_iU" aria-label="https://youtu.be/ewntP-Xf_iURecipient's username" aria-describedby="basic-addon2" readOnly />
                </div>
                <div className='d-flex gap-2'>
                  <button className='btn btn-secondary disabled' disabled>Delete</button>
                  <button className='btn btn-secondary disabled' disabled>Draft</button>
                  <button className='btn btn-primary w-50'>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VideoDetails