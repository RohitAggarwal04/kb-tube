"use client"

import React, { useState, useEffect } from 'react';
import { FileUpload } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import '@/public/css/Loader.css';
import { TagInput } from 'rsuite';
import { libraryID, AccessKey, thumbnail_size } from '@/app/lib/utils/routeUtils';


function UploadVideo({ token }) {

  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState(true);
  const [uploadedfilename, setuploadedfilename] = useState('');
  const [uploadedvideo, setuploadedvideo] = useState('');

  const [newVideoId, setVideoId] = useState(null);

  const [selectedFile, setselectedFile] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedFile1, setselectedFile1] = useState('');
  const [selectedFile1Error, setselectedFile1Error] = useState('');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [uploadedthumbnail, setuploadedthumbnail] = useState('');
  const [videotype, setvideotype] = useState(1);








  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlistCategory, setPlaylistCategory] = useState('');
  const [madeForKids, setMadeForKids] = useState(true);
  const [restrictToAdults, setRestrictToAdults] = useState(true);
  const [videoCategories, setVideoCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  // const [tags, setTags] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  // error
  const [error_title, SetErrorTitle] = useState(null);
  const [error_description, SetErrorDescription] = useState(null);
  const [error_category, SetErrorCategory] = useState(null);
  const [error_type, SetErrorType] = useState(null);



  // ****************************** Tags ****************************** //
  const [tags2, setTags2] = useState([]);
  const [tagsItem, setTagsItem] = useState([]);
  const [tags, setTags] = useState('');


  useEffect(() => {
    // Convert the elements of tags2 array to a comma-separated string
    const tagsString = tags2.join(',');
    // Update the state with the comma-separated string
    setTags(tagsString);
  }, [tags2])
  // ****************************** Tags ****************************** //



  const [showModal, setShowModal] = useState(true);

  const [isUploading, setIsUploadingss] = useState(false);

  const [thumbnails, setThumbnails] = useState([]);


  const generateThumbnails = async (file) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    const canvas = document.createElement('canvas');
    canvas.width = thumbnail_size.width;
    canvas.height = thumbnail_size.height;
    const context = canvas.getContext('2d');

    const duration = 45; // Extract thumbnails from the first 30 seconds

    video.onloadedmetadata = () => {
      const interval = duration / 3; // Divide the duration into 3 equal intervals

      Promise.all(
        Array.from({ length: 3 }, async (_, index) => {
          const time = interval * (index + 1);
          video.currentTime = time;
          await new Promise((resolve) => {
            video.onseeked = async () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailDataURL = canvas.toDataURL();
              setThumbnails((prevThumbnails) => [...prevThumbnails, thumbnailDataURL]);
              resolve();
            };
          });
        })
      );
    };

    video.src = URL.createObjectURL(file);
  };



  useEffect(() => {
    // Upload the first generated thumbnail
    if (thumbnails.length > 0) {
      handleFileChangesTh(thumbnails[0]); // Upload only the first thumbnail
    }

  }, [thumbnails]);

  const convertToPNG = (thumbnailData) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        try {
          // Convert the image data to PNG format
          canvas.toBlob((blob) => resolve(blob), 'image/png');
        } catch (error) {
          reject(error);
        }
      };

      img.src = thumbnailData;
    });
  };

  const handleFileChangesTh = async (thumbnailData) => {

    const pngThumbnailData = await convertToPNG(thumbnailData);


    const selectedFile12 = pngThumbnailData;


    try {
      const formData = new FormData();
      formData.append('file', selectedFile12, 'thumbnail.png');
      const response = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
      });

      if (response.data.status == 1) {
        setuploadedthumbnail(response.data.url);
      }

    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }






  useEffect(() => {
    // Fetch video categories
    const fetchVideoCategories = async () => {
      try {
        const response = await fetchAll('user/videoCategory');

        if (response.data) {
          // Make sure response.data is an array before setting it to state
          setVideoCategories(response.data.data);
        } else {
          console.error('Invalid data structure received from the API:', response.data);
        }
      } catch (error) {
        console.error('Error fetching video categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchVideoCategories();
  }, []);





  const handleFileChanges = async (event) => {


    const selectedFile12 = event.target.files[0];


    try {
      const FILENAME_TO_UPLOAD = selectedFile12.name;
      const formData = new FormData();
      formData.append('file', selectedFile12);
      const response = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
      });

      if (response.data.status == 1) {
        setselectedFile1(selectedFile12);
        const banner = response.data.url;


        setuploadedthumbnail(banner);

        setselectedFile1Error('');

        // ////////////////////////////////////////////////// bunny thumbnail code //////////////////////////////////////////////////
        let data = '';

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos/' + newVideoId + '/thumbnail?thumbnailurl=' + banner,
          headers: {
            'Accesskey': AccessKey
          },
          data: data
        };

        axios.request(config)
          .then((bunnyresponse) => {
            // console.log(JSON.stringify(bunnyresponse.data));
            // if (bunnyresponse.data.statusCode == 200) {
            // }
          })
          .catch((error) => {
            console.error('Error uploading file:', error.message);
          });

        // ////////////////////////////////////////////////// bunny thumbnail code  //////////////////////////////////////////////////

      } else {
        setselectedFile1Error(response.data.message);
        // alert(response.data.message);
      }



    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }

  const handleFileChange = async (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      alert('Please choose a file to upload.');
      return false;
    }

    setselectedFile(selectedFile);

    setThumbnails([]); // Clear previous thumbnails
    generateThumbnails(selectedFile);

    try {

      const FILENAME_TO_UPLOAD = selectedFile.name;


      // const formData = new FormData();
      // formData.append('fileToUpload', selectedFile);
      // const response = await axios.post('https://kbtube.com/api/video/video1.php', formData, {});


      // if (response.data.status === 1) {
      //   const setuploadedvideos = response.data.url;
      //   setuploadedvideo(setuploadedvideos);
      //   setIsPlaying(true);
      //   setUploadSuccess(false);


      // } else {
      //   setUploadSuccess(true);
      // }



      let data = JSON.stringify({
        "title": FILENAME_TO_UPLOAD
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos',
        headers: {
          'Content-Type': 'application/json',
          'Accesskey': AccessKey
        },
        data: data
      };

      axios.request(config)
        .then((response) => {



          const videoId = response.data.guid;

          setVideoId(videoId);

          let data = selectedFile;

          let config1 = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos/' + videoId,
            headers: {
              'Content-Type': 'video/mp4',
              'Accesskey': AccessKey
            },
            data: data
          };

          axios.request(config1)
            .then((responses) => {

              if (responses.data.statusCode === 200) {

                setuploadedvideo('https://iframe.mediadelivery.net/embed/' + libraryID +'/' + videoId);
                setIsPlaying(true);
                setUploadSuccess(false);
                setIsUploadingss(false);
              } else {
                setUploadSuccess(true);
              }



            })




        })



    } catch (error) {
      console.error('Error uploading file:', error.message);
    } finally {
      setIsUploadingss(false);

    }
  };







  const handleMadeForKidsChange = (event) => {
    setMadeForKids(event.target.value === 'yes');
  };

  const handleRestrictToAdultsChange = (event) => {
    setRestrictToAdults(event.target.value === 'yes');
  };


  const handleSubmit = async (event) => {

    // token =
    try {

      const formData = {
        "title": title,
        "description": description,
        "tags": tags,
        "url": uploadedvideo,
        "playlistCategory": playlistCategory,
        "restrictToAdults": restrictToAdults,
        "madeForKids": madeForKids,
        "thumbnail": uploadedthumbnail,
        "token": token,
        "type": videotype
      }




      const response = await fetchAll('/user/uploadVideo/', formData);

      console.log('video', response);
      if (response.data.status === 1) {
        //navigate('channel/');
        //videoUpload modal Dissmiss hear
        router.push('/channel/');
        setShowModal(false);
      } else {




        console.log(response.data.message);

        SetErrorTitle('');
        SetErrorDescription('');
        SetErrorCategory('');
        SetErrorType('');




        if (Array.isArray(response.data.message)) {
          response.data.message.map((category) => {



            if (category.param === "title") {
              SetErrorTitle(category.msg);

            }
            if (category.param === "description") {
              SetErrorDescription(category.msg);
            }
            if (category.param === "playlistCategory") {
              SetErrorCategory(category.msg);
            }
            if (category.param === "type") {
              SetErrorType(category.msg);
            }


          });


        } else {
          SetErrorTitle('');
          SetErrorDescription('');
          SetErrorCategory('');
          SetErrorType('');

        }





      }
    }
    catch (error) {
      SetErrorTitle('');
      SetErrorDescription('');
      SetErrorCategory('');
      SetErrorType('');
      //  alert('error');
    }
  }


  const handleBack = () => {

    setUploadSuccess(true);
    setuploadedfilename('');
    setuploadedvideo('');

    setVideoId(null);

    setselectedFile('');
    setIsPlaying(false);

    setselectedFile1('');
    setselectedFile1Error('');
    setIsPlaying1(false);
    setuploadedthumbnail('');
    setvideotype(1);



    /////////////////////////////////
    SetErrorTitle('');
    SetErrorDescription('');
    SetErrorCategory('');
    SetErrorType('');

    ////////////////////////////////////
    setTitle('');
    setDescription('');
    setPlaylistCategory('');
    setMadeForKids(true);
    setRestrictToAdults(true);
    setVideoCategories([]);

    setTags2([]);
    setTagsItem([]);
    setTags('');

  };

  return (



    <>

      <div
        className={`modal fade ${showModal ? 'fade show' : ''}`}
        id="videoUpload"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="videoUploadLabel"
        aria-hidden={!showModal}
        style={{ display: 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">

            <div className={`overlay ${isUploading ? 'd-flex  align-items-center justify-content-center' : 'd-none'}`}>
              <div className="spinner-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            </div>



            <div className="modal-header">
              <h1 className="modal-title fs-5" id="videoUploadLabel">Upload videos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* remove d-none class after upload */}
            <div className={`modal-body text-center ${uploadSuccess ? 'd-flex align-items-center justify-content-center' : 'd-none'}`}>
              <div className='row justify-content-center mt-5'>

                <div className='col-lg-5 d-flex align-items-cener justify-content-center'>
                  <div className="video-upload-btn">
                    <label className="input-group-text" htmlFor="inputGroupFile012">
                      <div className="m-auto file-icon"><FileUpload /></div>
                    </label>
                    <input type="file" className="form-control" id="inputGroupFile012" name="file" onChange={(e) => { handleFileChange(e); if (e.target.files[0]) { setIsUploadingss(true) } }} />
                  </div>
                </div>
                <div className='col-12 mt-3 mb-5'>
                  <span>Tap to Upload Video</span>
                  <p><small>Your videos will be private until you publish them.</small></p>
                </div>

                <div className='mt-5'>
                  <p><small>By submitting your videos to kbtube, you acknowledge that you agree to kbtube <Link className='text-white' href="/terms">Terms of Service</Link> and <Link className='text-white' href="/terms">Community Guidelines. </Link>
                    Please be sure not to violate others copyright or privacy rights. <Link className='text-white' href="/terms"> Learn more</Link></small></p>
                </div>
              </div>
            </div>

            {/* add d-none and remove d-block class after upload */}

            <div className={`modal-body  ${uploadSuccess ? 'd-none' : 'd-flex align-items-center justify-content-center'}`}>
              <div className="row">
                <div className="col-lg-8">
                  <h3 className="h5">Details</h3>
                  <div className="form-floating">
                    <textarea
                      className="form-control mb-3"
                      placeholder="Title"
                      id="floatingTextarea2"
                      style={{ height: '80px' }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Title (Required)</label>
                  </div>
                  <div className="text-danger">{error_title}</div>

                  <div className="box">

                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        placeholder="Tell viewers about your video"
                        id="floatingTextarea3"
                        style={{ height: '120px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <label htmlFor="floatingTextarea3">Description (Required) </label>
                    </div>
                  </div>
                  <div className="text-danger">{error_description}</div>
                  <div className="box">
                    <h4 className="h6">Thumbnail</h4>
                    <p>
                      <small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small>
                    </p>
                    <div className="row align-items-start g-3">
                      <div className="col-lg-4 col-12">
                        <div className="video-upload-btn">
                          <label className="input-group-text thumbnail" htmlFor="inputGroupFile019">
                            <div className="m-auto file-icon"><FileUpload /></div>

                            <span>Upload Thumbnail</span>
                          </label>
                          <input type="file" className="form-control" id="inputGroupFile019" name="file2" onChange={handleFileChanges} />
                        </div>
                      </div>
                      {selectedFile1 ? (
                        <div className='col-lg-4 col-6'>
                          <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail1" autocomplete="off" checked />
                          <label className="btn btn-outline-secondary" htmlFor="Thumbnail1"><img src={URL.createObjectURL(selectedFile1)} alt="UploadCloudIcon" className="m-auto w-100" /></label>
                        </div>
                      ) : (
                        <></>
                      )}

                      {/* 
                      {thumbnails.map((thumbnail, index) => (
                        <div className='col-lg-4 col-6'>
                          <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail1" autocomplete="off" checked />
                          <label className="rounded-15" htmlFor="Thumbnail1">
                            <img key={index} src={thumbnail} className="m-auto w-100" alt={`Thumbnail ${index + 1}`} />
                          </label>
                        </div>
                      ))} */}

                      {selectedFile1Error ? (
                        <div className='col-12 text-danger'>
                          {selectedFile1Error}
                        </div>
                      ) : null}

                    </div>
                  </div>
                  <div className="box mt-3">
                    <h3 className="h5">Select All Fields</h3>

                    <div className="form-floating">
                      {loadingCategories ? (
                        <p>Loading categories...</p>
                      ) : (
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                          value={playlistCategory}
                          onChange={(e) => setPlaylistCategory(e.target.value)}
                        >
                          <option value="">--Select Video Category--</option>
                          {videoCategories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.category}
                            </option>
                          ))}
                        </select>
                      )}
                      <label htmlFor="floatingSelect">Select Video Category</label>
                    </div>
                    <div className="text-danger">{error_category}</div>
                  </div>


                  <div className="box mt-3">

                    <div className="form-floating">

                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        value={videotype}
                        onChange={(e) => setvideotype(e.target.value)}
                      >
                        <option value="">-- Select Video Type --</option>
                        <option value="1">Long Video</option>
                        <option value="2">Short Video</option>

                      </select>

                      <label htmlFor="floatingSelect">Select Video Type</label>
                    </div>
                    <div className="text-danger">{error_type}</div>
                  </div>


                  <div className="box mt-2">
                    <h3 className="h5">Audience</h3>
                    <p>
                      <strong>Is this video made for kids? (required)</strong>
                    </p>
                    {/* ... */}
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="madeForKids"
                        id="madeForKidsYes"
                        value="yes"
                        checked={madeForKids}
                        onChange={handleMadeForKidsChange}
                      />
                      <label className="form-check-label" htmlFor="madeForKidsYes">
                        Yes, it's made for kids.
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="madeForKids"
                        id="madeForKidsNo"
                        value="no"
                        checked={!madeForKids}
                        onChange={handleMadeForKidsChange}
                      />
                      <label className="form-check-label" htmlFor="madeForKidsNo">
                        No, it's not made for kids
                      </label>
                    </div>
                    {/* ... */}
                    <p className="mt-2">
                      <strong>Do you want to restrict your video to an adult audience?</strong>
                    </p>
                    {/* ... */}
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="restrictToAdults"
                        id="restrictToAdultsYes"
                        value="yes"
                        checked={restrictToAdults}
                        onChange={handleRestrictToAdultsChange}
                      />
                      <label className="form-check-label" htmlFor="restrictToAdultsYes">
                        Yes, restrict my video to viewers over 18
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="restrictToAdults"
                        id="restrictToAdultsNo"
                        value="no"
                        checked={!restrictToAdults}
                        onChange={handleRestrictToAdultsChange}
                      />
                      <label className="form-check-label" htmlFor="restrictToAdultsNo">
                        No, don't restrict my video to viewers over 18 only
                      </label>
                    </div>
                    {/* ... */}
                  </div>

                  <div className='box mt-3'>
                    <h3 className="h5">Tags</h3>
                    <p>Tags can be useful if content in your video is commonly misspelt. Otherwise, tags play a minimal role in helping viewers to find your video.</p>
                    <div className="form-floating">
                      <div className="form-floating mb-3">

                        {/* <label htmlFor="floatingTextarea3">Tags </label> */}
                        <>
                          <TagInput
                            trigger={['Enter', 'Space', 'Comma']}
                            placeholder="Tags"
                            style={{ width: '100%', height: '120px' }}
                            menuStyle={{ width: 300 }}
                            onCreate={(value, item) => {
                              setTags2(value);
                              setTagsItem(item);
                            }}
                          // value={tags2}
                          />
                        </>
                        <p><small>Enter a comma after each tag</small></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="video-box-single-v rounded-0 sticky-lg-top pt-3">
                    <Card className="rounded-0">

                      <div className="video-player">
                        {selectedFile ? (
                          <Card className="rounded-0">
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              autoPlay={isPlaying}
                              controls
                              className="w-100"
                              muted
                            >
                              <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                            </CardMedia>
                          </Card>
                        ) : (
                          <div className="video-upload-btn">
                            <label className="input-group-text" htmlFor="inputGroupFile01">
                              <div className="m-auto file-icon"><FileUpload /></div>
                            </label>
                            <span>Upload Video</span>
                            <input type="file" className="form-control" id="inputGroupFile01" name="file" accept="video/*" />
                          </div>
                        )}
                      </div>
                    </Card>
                    <div className="input-group my-3">
                      <label className="w-100">
                        <small>Video Link</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={uploadedvideo}
                        placeholder="https://kbtube.com/dfsdf"
                        readOnly
                      />
                      <span className="input-group-text" id="basic-addon2">
                        Copy
                      </span>
                    </div>
                    <div className="input-group mb-3">
                      <label className="w-100">
                        <small>Filename</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={uploadedfilename}
                        placeholder="https://kbtube.com/"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { uploadSuccess ? '' :
              <div className="modal-footer">
                <button type="button" onClick={handleBack} className="btn btn-secondary rounded-5 px-4">Previous</button>
                &nbsp;&nbsp;
                <Link href="URL:void(0)" onClick={handleSubmit} className="cmn--btn rounded-5 px-4">
                  <span>Next</span>
                </Link>
              </div> }
          </div>
        </div>
      </div>

    </>
  )
}

export default UploadVideo