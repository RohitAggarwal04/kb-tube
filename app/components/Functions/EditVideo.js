import React, { useState, useEffect } from 'react';
import { FileUpload } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { authHttps } from "../../auth/AuthUser";
import '../Loader.css';
import { TagInput } from 'rsuite';
import { libraryID, AccessKey, thumbnail_size } from '@/app/lib/utils/routeUtils';


function EditVideo({ video, setEditVideo }) {

  const navigate = useRouter();
  const http = authHttps();
  const [uploadSuccessEdit, setUploadSuccessEdit] = useState(true);
  const [uploadedfilenameEdit, setuploadedfilenameEdit] = useState('');
  const [uploadedvideoEdit, setuploadedvideoEditEdit] = useState(video.url);

  const [newVideoIdEdit, setVideoIdEdit] = useState(video.videoId);

  const [selectedFileEdit, setselectedFileEdit] = useState('');
  const [isPlayingEdit, setIsPlayingEdit] = useState(false);

  const [selectedFile1, setselectedFile1] = useState('');
  const [selectedFile1Error, setselectedFile1Error] = useState('');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [uploadedthumbnail, setuploadedthumbnailEdit] = useState(video.thumbnail);
  const [videotype, setvideotype] = useState(video.type);








  const [title, setTitleEdit] = useState(video.title);
  const [description, setDescriptionEdit] = useState(video.description);
  const [playlistCategory, setPlaylistCategoryEdit] = useState(video.playlistCategory);
  const [madeForKids, setMadeForKidsEdit] = useState(video.madeForKids);
  const [restrictToAdults, setRestrictToAdultsEdit] = useState(video.restrictToAdults);
  const [videoCategories, setVideoCategoriesEdit] = useState([]);
  const [loadingCategories, setLoadingCategoriesEdit] = useState(true);
  // const [tagsEdit, setTagsEdit] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  // error
  const [error_title, SetErrorTitle] = useState(null);
  const [error_description, SetErrorDescription] = useState(null);
  const [error_category, SetErrorCategory] = useState(null);
  const [error_type, SetErrorType] = useState(null);


  // ****************************** Tags ****************************** //
  const tagsData = video && video.tags ? video.tags.split(','):[];
  const [tags5, setTags5] = useState(tagsData);
  const [tags2Edit, setTags2Edit] = useState([]);
  const [tagsItemEdit, setTagsItemEdit] = useState([]);
  const [tagsEdit, setTagsEdit] = useState(video.tags);


  useEffect(() => {
    // Convert the elements of tags2Edit array to a comma-separated string
    const tagsString = tags2Edit.join(',');
    // Update the state with the comma-separated string
    setTagsEdit(tagsString);
  }, [tags2Edit])
  // ****************************** Tags ****************************** //



  const [showModalEdit, setShowModalEdit] = useState(true);

  const [isUploadingEdit, setIsUploadingss] = useState(true);

  const [thumbnails, setThumbnails] = useState([]);


  // const generateThumbnails = async (file) => {
  //   const video = document.createElement('video');
  //   video.preload = 'metadata';

  //   const canvas = document.createElement('canvas');
  //   canvas.width = thumbnail_size.width;
  //   canvas.height = thumbnail_size.height;
  //   const context = canvas.getContext('2d');

  //   const duration = 45; // Extract thumbnails from the first 30 seconds

  //   video.onloadedmetadata = () => {
  //     const interval = duration / 3; // Divide the duration into 3 equal intervals

  //     Promise.all(
  //       Array.from({ length: 3 }, async (_, index) => {
  //         const time = interval * (index + 1);
  //         video.currentTime = time;
  //         await new Promise((resolve) => {
  //           video.onseeked = async () => {
  //             context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //             const thumbnailDataURL = canvas.toDataURL();
  //             setThumbnails((prevThumbnails) => [...prevThumbnails, thumbnailDataURL]);
  //             resolve();
  //           };
  //         });
  //       })
  //     );
  //   };

  //   video.src = URL.createObjectURL(file);
  // };



  // useEffect(() => {
  //   // Upload the first generated thumbnail
  //   if (thumbnails.length > 0) {
  //     handleFileChangesTh(thumbnails[0]); // Upload only the first thumbnail
  //   }

  // }, [thumbnails]);

  // const convertToPNG = (thumbnailData) => {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   const img = new Image();

  //   return new Promise((resolve, reject) => {
  //     img.onload = () => {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);

  //       try {
  //         // Convert the image data to PNG format
  //         canvas.toBlob((blob) => resolve(blob), 'image/png');
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };

  //     img.src = thumbnailData;
  //   });
  // };

  // const handleFileChangesTh = async (thumbnailData) => {

  //   const pngThumbnailData = await convertToPNG(thumbnailData);


  //   const selectedFile12Edit = pngThumbnailData;


  //   try {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile12Edit, 'thumbnail.png');
  //     const responseEdit = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
  //     });

  //     if (responseEdit.data.status == 1) {
  //       setuploadedthumbnailEdit(responseEdit.data.url);
  //     }

  //   } catch (error) {
  //     console.error('Error uploading file:', error.message);
  //   }
  // }






  useEffect(() => {
    // Fetch video categories
    const fetchVideoCategories = async () => {
      try {
        const responseEdit = await fetchAll('user/videoCategory');

        if (responseEdit.data) {
          // Make sure responseEdit.data is an array before setting it to state
          setVideoCategoriesEdit(responseEdit.data.data);
        } else {
          console.error('Invalid data structure received from the API:', responseEdit.data);
        }
      } catch (error) {
        console.error('Error fetching video categories:', error);
      } finally {
        setLoadingCategoriesEdit(false);
      }
    };

    fetchVideoCategories();


    // console.log("video1: ", video);
  }, []);





  const handleFileChangesEdit = async (event) => {

    const selectedFile12Edit = event.target.files[0];


    try {
      const FILENAME_TO_UPLOAD = selectedFile12Edit.name;
      const formData = new FormData();
      formData.append('file', selectedFile12Edit);
      const responseEdit = await axios.post('https://kbtube.com/api/video/upload.php', formData, {
      });

      if (responseEdit.data.status == 1) {
        setselectedFile1(selectedFile12Edit);
        const bannerEdit = responseEdit.data.url;


        setuploadedthumbnailEdit(bannerEdit);

        setselectedFile1Error('');

        // ////////////////////////////////////////////////// bunny thumbnail code //////////////////////////////////////////////////
        let data = '';


        let configEdit = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos/' + (video.videoId) + '/thumbnail?thumbnailurl=' + bannerEdit,
          headers: {
            'Accesskey': AccessKey
          },
          data: data
        };

        axios.request(configEdit)
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
        setselectedFile1Error(responseEdit.data.message);
        // alert(responseEdit.data.message);
      }



    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }

  // const handleFileChange = async (event) => {

  //   const selectedFileEdit = event.target.files[0];

  //   if (!selectedFileEdit) {
  //     alert('Please choose a file to upload.');
  //     return false;
  //   }

  //   setselectedFileEdit(selectedFileEdit);

  //   setThumbnails([]); // Clear previous thumbnails
  //   generateThumbnails(selectedFileEdit);

  //   try {

  //     const FILENAME_TO_UPLOAD = selectedFileEdit.name;


  //     // const formData = new FormData();
  //     // formData.append('fileToUpload', selectedFileEdit);
  //     // const responseEdit = await axios.post('https://kbtube.com/api/video/video1.php', formData, {});


  //     // if (responseEdit.data.status === 1) {
  //     //   const setuploadedvideoEditEdits = responseEdit.data.url;
  //     //   setuploadedvideoEditEdit(setuploadedvideoEditEdits);
  //     //   setIsPlayingEdit(true);
  //     //   setUploadSuccessEdit(false);


  //     // } else {
  //     //   setUploadSuccessEdit(true);
  //     // }



  //     let data = JSON.stringify({
  //       "title": FILENAME_TO_UPLOAD
  //     });

  //     let configEdit = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accesskey': AccessKey
  //       },
  //       data: data
  //     };

  //     axios.request(configEdit)
  //       .then((responseEdit) => {



  //         const videoId = responseEdit.data.guid;

  //         setVideoIdEdit(videoId);

  //         let data = selectedFileEdit;

  //         let configEdit1 = {
  //           method: 'put',
  //           maxBodyLength: Infinity,
  //           url: 'https://video.bunnycdn.com/library/' + libraryID +'/videos/' + videoId,
  //           headers: {
  //             'Content-Type': 'video/mp4',
  //             'Accesskey': AccessKey
  //           },
  //           data: data
  //         };

  //         axios.request(configEdit1)
  //           .then((responses) => {

  //             if (responses.data.statusCode === 200) {

  //               setuploadedvideoEditEdit('https://iframe.mediadelivery.net/embed/' + libraryID +'/' + videoId);
  //               setIsPlayingEdit(true);
  //               setUploadSuccessEdit(false);
  //               setIsUploadingss(false);
  //             } else {
  //               setUploadSuccessEdit(true);
  //             }



  //           })




  //       })



  //   } catch (error) {
  //     console.error('Error uploading file:', error.message);
  //   } finally {
  //     setIsUploadingss(false);

  //   }
  // };







  const handleMadeForKidsChange = (event) => {
    setMadeForKidsEdit(event.target.value === 'yes');
  };

  const handleRestrictToAdultsChange = (event) => {
    setRestrictToAdultsEdit(event.target.value === 'yes');
  };


  const tokens = localStorage.getItem("token");

  const token = tokens ? tokens.replace(/"/g, '') : '';



  const handleSubmitEdit = async (event) => {

    // token =
    try {

      const formData = {
        "videoId": newVideoIdEdit,
        "title": title,
        "description": description,
        "tags": tagsEdit ? tagsEdit  : video.tags,
        "url": uploadedvideoEdit,
        "playlistCategory": playlistCategory,
        "restrictToAdults": restrictToAdults,
        "madeForKids": madeForKids,
        "thumbnail": uploadedthumbnail,
        "token": token,
        "type": videotype
      }




      const responseEdit = await fetchAll('/user/EditVideo/', formData);

      console.log('video', responseEdit);
      if (responseEdit.data.status === 0) {
        //navigate('channel/');
        //EditVideoUpload modal Dissmiss hear
        window.location.href = '/channel/';
        setShowModalEdit(false);
      } else {




        console.log(responseEdit.data.message);

        SetErrorTitle('');
        SetErrorDescription('');
        SetErrorCategory('');
        SetErrorType('');




        if (Array.isArray(responseEdit.data.message)) {
          responseEdit.data.message.map((category) => {



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



  return (



    <>
      <div
        className={`modal  ${showModalEdit ? 'fade show' : 'fade'}`}
        id="EditVideoUpload"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="EditVideoUploadLabel"
        aria-hidden={!showModalEdit}
        style={{display: 'block'}}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditVideoUploadLabel">Edit Videos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setEditVideo(null)} aria-label="Close"></button>
            </div>

          

            {/* add d-none and remove d-block class after upload */}

            <div className={`modal-body  d-flex align-items-center justify-content-center`}>
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
                      onChange={(e) => setTitleEdit(e.target.value)}
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
                        onChange={(e) => setDescriptionEdit(e.target.value)}
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
                          <label className="input-group-text thumbnail" htmlFor="inputGroupFile019Edt">
                            <div className="m-auto file-icon"><FileUpload /></div>

                            <span>Upload Thumbnail</span>
                          </label>
                          <input type="file" className="form-control" id="inputGroupFile019Edt" name="file2Edit" onChange={(event) => handleFileChangesEdit(event)} accept="image/jpg, image/jpeg, image/png, image/gif" />
                        </div>
                      </div>
                      {selectedFile1 ? (
                        <div className='col-lg-4 col-6'>
                          <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail1" autocomplete="off" defaultChecked={true} />
                          <label className="btn btn-outline-secondary" htmlFor="Thumbnail1"><img src={URL.createObjectURL(selectedFile1)} alt="UploadCloudIcon" className="m-auto w-100" /></label>
                        </div>
                      ) : (
                        <></>
                      )}

                      
                      {video && video.thumbnail && !selectedFile1 && 
                        <div className='col-lg-4 col-6'>
                          <input type="radio" className="btn-check" name="Thumbnail" id="Thumbnail1" defaultChecked={true} autocomplete="off" />
                          <label className="rounded-15" htmlFor="Thumbnail1">
                            <img  src={video.thumbnail} className="m-auto w-100" alt={`Thumbnail `} />
                          </label>
                        </div>
                      }

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
                          onChange={(e) => setPlaylistCategoryEdit(e.target.value)}
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
                        name="EditmadeForKids"
                        id="EditmadeForKidsYes"
                        value="yes"
                        defaultChecked={madeForKids}
                        onChange={handleMadeForKidsChange}
                      />
                      <label className="form-check-label" htmlFor="EditmadeForKidsYes">
                        Yes, it's made for kids.
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="EditmadeForKids"
                        id="EditmadeForKidsNo"
                        value="no"
                        defaultChecked={!madeForKids}
                        onChange={handleMadeForKidsChange}
                      />
                      <label className="form-check-label" htmlFor="EditmadeForKidsNo">
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
                        name="EditrestrictToAdults"
                        id="EditrestrictToAdultsYes"
                        value="yes"
                        defaultChecked={restrictToAdults}
                        onChange={handleRestrictToAdultsChange}
                      />
                      <label className="form-check-label" htmlFor="EditrestrictToAdultsYes">
                        Yes, restrict my video to viewers over 18
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input border-dark"
                        type="radio"
                        name="EditrestrictToAdults"
                        id="EditrestrictToAdultsNo"
                        value="no"
                        defaultChecked={!restrictToAdults}
                        onChange={handleRestrictToAdultsChange}
                      />
                      <label className="form-check-label" htmlFor="EditrestrictToAdultsNo">
                        No, don't restrict my video to viewers over 18 only
                      </label>
                    </div>
                    {/* ... */}
                  </div>

                  <div className='box mt-3'>
                    <h3 className="h5">Tags</h3>
                    <p>Tags can be useful if content in your video is commonly misspelt. Otherwise, tagsEdit play a minimal role in helping viewers to find your video.</p>
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
                              setTags2Edit(value);
                              setTagsItemEdit(item);
                            }}
                            defaultValue={tags5}
                          // value={tags5}
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
                        {selectedFileEdit ? (
                          <Card className="rounded-0">
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              autoPlay={isPlayingEdit}
                              controls
                              className="w-100"
                              style={{ aspectRatio: '19/10' }}
                              muted
                            >
                              <source src={selectedFileEdit? URL.createObjectURL(selectedFileEdit): video.url} type="video/mp4" />
                            </CardMedia>
                          </Card>
                        ) : (
                          <div className="video-upload-btn1 w-100">
                              <iframe src={video.url} className='w-100'></iframe>
                            {/* <label className="input-group-text" htmlFor="inputGroupFile01">
                              <div className="m-auto file-icon"><FileUpload /></div>
                            </label>
                            <span>Upload Video</span>
                            <input type="file" className="form-control" id="inputGroupFile01" name="file" accept="video/*" /> */}
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
                        value={uploadedvideoEdit}
                        placeholder="https://kbtube.com/watch/qwert0123"
                        readOnly
                      />
                      <span className="input-group-text" id="basic-addon2">
                        Copy
                      </span>
                    </div>
                    {/* <div className="input-group mb-3">
                      <label className="w-100">
                        <small>Filename</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={uploadedfilenameEdit}
                        placeholder="https://kbtube.com/"
                        readOnly
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
              <div className="modal-footer">
                <Link href="URL:void(0)" onClick={handleSubmitEdit} className="cmn--btn rounded-5 px-4">
                  <span>Update</span>
                </Link>
              </div> 
          </div>
        </div>
      </div>

    </>
  )
}

export default EditVideo