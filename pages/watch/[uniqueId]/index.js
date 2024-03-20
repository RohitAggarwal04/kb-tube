import React, { useState, useEffect, useContext } from "react";

import profilePic from "@/public/images/profile-pic.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReadMoreVideoDesc from "@/app/components/ReadMoreVideoDesc";
import Link from "next/link";
import { useRouter } from "next/router";
// import { formatDistanceToNow } from 'date-fns';
import VideoNotAvailable from "@/app/components/ErrorPages/VideoNotAvailable";
import WatchSingleLoading from "@/app/components/LoadingPages/WatchSingleLoading";
import RelatedVideoLoading from "@/app/components/LoadingPages/RelatedVideoLoading";
import { VideoRoute, apiUrl } from "@/app/lib/utils/routeUtils";

import Head from "next/head";

import axios from "axios";
import { APP_URL } from "@/app/lib/auth/config";
import { AuthContext } from "@/context/AuthContext";

const WatchSinglePage = ({ SingleVideoData }) => {
  const { token, channel, profileData, login, logout } =
    useContext(AuthContext);

  const router = useRouter();
  const { uniqueId } = router.query;

  const metadataBase = new URL(APP_URL || "https://kbtube.com/");
  const metaData = {
    title: "KB TuBE",
    keywords: "video, sharing, camera phone, video phone, free, upload",
    description:
      "KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience.",
    twitterCard: "KB TuBE",
    canonical: `${metadataBase}/about`,
    share_image: `${metadataBase}/images/channel-create.png`,
  };

  const [videoData, setVideoData] = useState(null);
  const [handelData, setHandelData] = useState("test_handel");
  const [loadingVideo, setloadingvideos] = useState(true);

  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingvideoss, setloadingvideoss] = useState(true);

  const [name, setName] = useState("Channel Name");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [subscriber, setSubscriber] = useState(0);
  const [like, setLike] = useState("");
  const [dlike, setDlike] = useState("");
  const [chanelId, setChanelId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [catid, setCatId] = useState("");
  const [subs, setSubs] = useState(false);
  const [lkis, setSubs1] = useState({
    like: 0,
    dlike: 0,
    user: 0,
  });
  const [comments, setComments] = useState("");
  const [allComment, setallComment] = useState([]);
  const [loadingcomment, setloadingcomment] = useState(false);

  const handleShare = (uniqId, title, description) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: "https://kbtube.com/watch/" + uniqId,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.log("Web Share API not supported");
    }
  };

  const fetchVideo = async (videoData) => {
    setloadingvideos(true);
    try {
      // const response = await axios.post(`${apiUrl}/user/UniqIdWiseVideo`, { 'uniqId': videoUniqueId });
      const response = videoData;
      if (response && response.data) {
        const Video = response.data;
        console.log("video data: ", Video);
        console.log("response.handel: ", response.handel);

        setVideoData(Video);
        setHandelData(response.handel);
        setName(Video.name);
        setChanelId(Video.chanelId);
        setVideoId(Video.videoId);
        setCatId(Video.playlistCategory);
        setDescription(Video.description);
        setPhoto(Video.photo);
        setSubscriber(parseInt(Video.subscriber));
        setLike(Video.like);
        setDlike(Video.dlike);
        // document.title = response.data.data.title + " | KB TuBE";

        /*********** after confirming and loading video start getting other data ***********/
        // fetchAllVideo(Video.playlistCategory, videoId);
        // checksubscrive(Video.videoId);
        // checklike(Video.videoId);
        // fetchAllComments(Video.videoId);
        /*********** after confirming and loading video start getting other data ***********/
      } else {
        console.error(
          "Invalid data structure received from the API:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching video categories:", error);
    } finally {
      setloadingvideos(false);
    }
  };

  useEffect(() => {
    console.log("SingleVideoData: ", SingleVideoData);

    if (SingleVideoData) {
      fetchVideo(SingleVideoData);
    } else {
      // router.push('/');
    }
  }, [SingleVideoData]);

  const viewVideo = async (videoId) => {
    axios.post(`${apiUrl}/user/addView`, { videoId: videoId });
  };

  const fetchAllVideo = async (catid, videoId) => {
    setloadingvideoss(true);
    try {
      // const catid = localStorage.getItem('catid');
      const response = await axios.post(`${apiUrl}/user/categoryWiseVideo`, {
        categoryId: catid,
      });
      if (response.data && response.data.data) {
        const relatedVideos = response.data.data.filter(
          (item) => item.videoId !== videoId
        );
        setRelatedVideos(relatedVideos);
      } else {
        console.error(
          "Invalid data structure received from the API:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching video categories:", error);
    } finally {
      setloadingvideoss(false);
    }
  };

  const TimeAgo = ({ date }) => {
    // Assuming `date` is a string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const parsedDate = new Date(date);

    const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

    return <span>{timeAgo}</span>;
  };

  const formatViewsCount = (count) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return `${(count / 1000000).toFixed(1)}M`;
    }
  };

  const addSubscriber = async (chanelId, videoId) => {
    const response = axios.post(`${apiUrl}/user/addSubscriber`, {
      chanelId: chanelId,
    });

    if (response.data && response.data.status === 1) {
      setSubscriber(parseInt(subscriber) + 1);
      checksubscrive(videoId);
    }
  };

  const removeSubscriber = async (chanelId, videoId) => {
    const response = axios.post(`${apiUrl}/user/removeSubscriber`, {
      chanelId: chanelId,
    });
    if (response.data && response.data.status === 1) {
      setSubscriber(parseInt(subscriber) - 1);
      checksubscrive(videoId);
    }
  };

  const likeMaster = async (chanelId, videoId, type) => {
    // const videoId = localStorage.getItem('videoId');
    const response = axios.post(`${apiUrl}/user/likeMaster`, {
      chanelId: chanelId,
      videoId: videoId,
      type: type,
    });
    if (response.data && response.data.status === 1) {
      if (type === 1) {
        setLike(like + 1);

        setSubs1({ like: 1, dlike: 0, user: 0 });

        if (response.data.action === 2) {
          setDlike(dlike - 1);
        }

        if (response.data.action === 3) {
          setLike(like - 1);

          setSubs1({ like: 0, dlike: 0, user: 0 });
        }
      } else {
        setDlike(dlike + 1);
        setSubs1({ like: 0, dlike: 1, user: 0 });

        if (response.data.action === 2) {
          setLike(like - 1);
        }
        if (response.data.action === 3) {
          setDlike(dlike - 1);

          setSubs1({ like: 0, dlike: 0, user: 0 });
        }
      }
    }
    //checklike();
  };

  const checksubscrive = async (videoId) => {
    try {
      // const videoId = localStorage.getItem('videoId');
      const response = axios.post(`${apiUrl}/user/checkSubscriber`, {
        videoId: videoId,
      });
      //console.log('checksubs',response);
      if (response.data && response.data.status === 1) {
        setSubs(true);

        //alert('done');
      } else {
        setSubs(false);
      }
    } catch (error) {
      setSubs(false);
    }
  };

  const checklike = async (videoId) => {
    try {
      // const videoId = localStorage.getItem('videoId');
      const response = axios.post(`${apiUrl}/user/checkLike`, {
        videoId: videoId,
      });

      setSubs1(response.data.data);
    } catch (error) {
      setSubs1({
        like: 0,
        dlike: 0,
        user: 0,
      });
    }
  };

  /*************************************** Comment System Functions ***************************************/
  const addComment = async (videoId) => {
    // const videoId = localStorage.getItem('videoId');
    const response = axios.post(`${apiUrl}/user/addComment`, {
      videoId: videoId,
      comments: comments,
    });
    fetchAllComments(videoId);
    setComments("");
  };

  const fetchAllComments = async (videoId) => {
    try {
      // const videoId = parseInt(localStorage.getItem('videoId'));
      const response = axios.post(`${apiUrl}/user/videoIdWiseComment`, {
        videoId: videoId,
      });

      // console.log('comm', response);

      if (response.data && response.data.data) {
        setallComment(response.data.data);
      } else {
        console.error("Invalid data structure received from the API:");
        // console.error('Invalid data structure received from the API:', response.data);
      }
    } catch (error) {
      console.error("Error fetching video categories:");
      // console.error('Error fetching video categories:', error);
    } finally {
      setloadingcomment(false);
    }
  };

  const [user, setUser] = useState(null);

  const fetchChannel = async () => {
    try {
      const response = axios.post(`${apiUrl}/user/getUser`);

      if (response.data && response.data.status === 1) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error get User:", error);
    }
  };

  //   useEffect(() => {
  //     fetchChannel();
  //   }, []);

  return (
    <>
      {loadingVideo ? (
        <WatchSingleLoading />
      ) : videoData && videoData.url ? (
        <div className="container-fluid mt-3 px-lg-4">
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
          <div className="row">
            <div className="col-md-8">
              <>
                <div className="watch-video-comment-box">
                  <div className="video-box-single-v">
                    <Card className="shadow-none  overflow-visible">
                      <div className="video-box">
                        <iframe
                          className="single-video"
                          src={
                            videoData && videoData.url
                              ? videoData.url + "?autoplay=true"
                              : ""
                          }
                        ></iframe>
                      </div>
                      <CardContent>
                        <div className="content-box">
                          <div className="row">
                            <div className="col-12">
                              <h1 className="v-tiltle">{videoData.title}</h1>
                            </div>
                            <div className="col-lg-12">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <div className="row g-1 align-items-center justify-content-between mt-1">
                                  <div className="col-6 col-lg-3 d-flex">
                                    <div className="channel-thumbnail">
                                      <Link
                                        href={
                                          handelData ? "/@" + handelData : "#"
                                        }
                                      >
                                        {videoData.photo ? (
                                          <img
                                            src={videoData.photo}
                                            className="rounded-circle img-fluid"
                                            alt="img"
                                          />
                                        ) : (
                                          <img
                                            src={profilePic}
                                            className="rounded-circle img-fluid"
                                            alt="img"
                                          />
                                        )}
                                      </Link>
                                    </div>

                                    <div className="px-2">
                                      <Link
                                        href={
                                          handelData ? "/@" + handelData : "#"
                                        }
                                        className="channel-name mb-0"
                                      >
                                        {name ? name : "Channel name"}
                                      </Link>
                                      <Link
                                        href={
                                          handelData ? "/@" + handelData : "#"
                                        }
                                        className="views-time"
                                      >
                                        <small>
                                          {" "}
                                          {subscriber ? subscriber : "0"}{" "}
                                          subscribers
                                        </small>
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="col-6 col-lg-3 d-flex align-items-center justify-content-end">
                                    {token ? (
                                      subs ? (
                                        <div className="dropdown">
                                          <Link
                                            href="#"
                                            className="d-block caret-none  btn btn-gray text-light w-100 rounded-5 px-3 text-decoration-none dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="bi bi-bell"></i>{" "}
                                            Subscribed{" "}
                                            <i className="bi bi-chevron-down"></i>
                                          </Link>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                href="/login"
                                              >
                                                <i className="bi bi-bell-fill me-3"></i>
                                                All
                                              </Link>
                                            </li>
                                            {/* <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-bell"></i> Personalized</Link></li>
                                                                                <li><Link className="dropdown-item" href="/login"><i className="bi bi-bell-slash me-3"></i> None</Link></li> */}
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                  removeSubscriber(
                                                    chanelId,
                                                    videoId
                                                  )
                                                }
                                              >
                                                <i className="bi bi-person-dash-fill me-3"></i>{" "}
                                                Unsubscribe
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            addSubscriber(chanelId, videoId)
                                          }
                                          className="btn btn-gray text-light rounded-5 px-4"
                                        >
                                          {" "}
                                          <small>Subscribe</small>
                                        </button>
                                      )
                                    ) : (
                                      <Link
                                        href="/login"
                                        className="btn btn-gray text-light rounded-5 px-4"
                                      >
                                        {" "}
                                        <small>Subscribe</small>
                                      </Link>
                                    )}
                                  </div>

                                  {token ? (
                                    <>
                                      <div className="col-6 col-lg-3  d-flex align-items-center justify-content-start justify-content-lg-end">
                                        <div className="bg-gray rounded-5  d-inline-flex align-items-center justify-content-around">
                                          <button
                                            onClick={() =>
                                              likeMaster(chanelId, videoId, 1)
                                            }
                                            type="button"
                                            className="btn btn-gray text-light rounded-5 border-0"
                                          >
                                            <small>
                                              <i
                                                className={`${
                                                  lkis.like === 1
                                                    ? "bi bi-hand-thumbs-up-fill"
                                                    : "bi bi-hand-thumbs-up"
                                                }`}
                                              ></i>{" "}
                                              {like ? like : "0"}
                                            </small>
                                          </button>
                                          <span>|</span>
                                          <button
                                            onClick={() =>
                                              likeMaster(chanelId, videoId, 2)
                                            }
                                            type="button"
                                            className="btn btn-gray btn-secondary text-light rounded-5 border-0"
                                          >
                                            <small>
                                              <i
                                                className={`${
                                                  lkis.dlike === 1
                                                    ? "bi bi-hand-thumbs-down-fill"
                                                    : "bi bi-hand-thumbs-down"
                                                }`}
                                              ></i>{" "}
                                              {dlike ? dlike : "0"}
                                            </small>
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="col-6 col-lg-3 d-flex align-items-center justify-content-end">
                                      <div className="bg-gray w-100 rounded-5  d-flex align-items-center justify-content-around">
                                        <button
                                          onClick={() => navigate("/login")}
                                          type="button"
                                          className="btn btn-gray text-light rounded-5 border-0"
                                        >
                                          <small>
                                            <i className="bi bi-hand-thumbs-up"></i>{" "}
                                            {like ? like : "0"}
                                          </small>
                                        </button>
                                        <span>|</span>
                                        <button
                                          onClick={() => navigate("/login")}
                                          type="button"
                                          className="btn btn-gray btn-secondary text-light rounded-5 border-0"
                                        >
                                          <small>
                                            <i className="bi bi-hand-thumbs-down"></i>{" "}
                                            {dlike ? dlike : "0"}
                                          </small>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  <div className="col-6 col-lg-3 d-flex justify-content-end align-items-center">
                                    <button
                                      type="button"
                                      className="btn btn-gray text-light rounded-5 px-4"
                                      onClick={() =>
                                        handleShare(
                                          videoData.uniqId,
                                          videoData.title,
                                          videoData.description
                                        )
                                      }
                                    >
                                      <i className='className="bi bi-share'></i>{" "}
                                      <small> Share</small>
                                    </button>

                                    {/*<div className="dropdown">
                                                                    <Link href="#" className="caret-none  text-decoration-none dropdown-toggle rounded-dots btn btn-gray text-light" >
                                                                     data-bs-toggle="dropdown" aria-expanded="false" 
                                                                        <i className="bi bi-three-dots text-light"></i>
                                                                    </Link>
                                                                     <ul className="dropdown-menu">
                                                                        <li><Link className="dropdown-item" href="/login"><i className="bi bi-bar-chart-steps me-3"></i>Add to queue</Link></li>
                                                                        <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-clock-history"></i> Save to Watch Later</Link></li>
                                                                        <li><Link className="dropdown-item" href="/login"><i className="bi bi-plus-square me-3"></i> Save to Playlist</Link></li>
                                                                        <li><Link className="dropdown-item" href="/login"><i className="bi bi-download me-3"></i> Download</Link></li>
                                                                        <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-share"></i> Share</Link></li>
                                                                        <li><hr className="dropdown-divider" /></li>
                                                                        <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-ban"></i>  Not Interested </Link></li>
                                                                        <li><Link className="dropdown-item" href="#"><i className="bi bi-dash-circle me-3"></i>  Don't Recomended Channel </Link></li>
                                                                        <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-flag"></i>  Report </Link></li>
                                                                    </ul>
                                                                </div> */}
                                  </div>
                                </div>
                              </Typography>
                              <Typography
                                variant="body3"
                                color="text.secondary"
                                className="bg-secondary"
                              >
                                <div className="video-description">
                                  <ReadMoreVideoDesc
                                    text={description ? description : ""}
                                    maxLength={150}
                                  />
                                </div>
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* watch-video-comment-box end */}
                <div className="comment-box-main my-3">
                  <Card className="p-3">
                    <div className="d-flex">
                      <h3 className="h5 text-light">
                        {allComment ? allComment.length : 0} Comments
                      </h3>
                      {/* <div className="dropdown ms-3">
                                        <Link href="#" className="caret-none  text-decoration-none dropdown-toggle text-theme" data-bs-toggle="dropdown" aria-expanded="false">
                                            <strong cla> <i className="bi bi-filter-left"></i> Sort By</strong>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="/login">Top Comments</Link></li>
                                            <li><Link className="dropdown-item" href="/login"> Newest First</Link></li>
                                        </ul>
                                    </div> */}
                    </div>

                    <div className="d-flex align-items-center">
                      {user && user.photo ? (
                        <img
                          src={user.photo}
                          className="rounded-circle img-fluid"
                          width={50}
                          height={50}
                          alt="img"
                        />
                      ) : (
                        <div>
                          {user ? (
                            <div className="rounded-box-shorts btn btn-gray text-light m-0 mt-2">
                              <span>{user.full_name.charAt(0)} </span>
                            </div>
                          ) : (
                            <img
                              src={profilePic}
                              className="rounded-circle  img-fluid"
                              width={50}
                              height={50}
                              alt="img"
                            />
                          )}
                        </div>
                      )}

                      <div className="form-floating w-100">
                        <input
                          type="text"
                          id="inputComment"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="form-control border-2  border-start-0 border-end-0 border-top-0 border-light bg-transparent rounded-0"
                          placeholder="Add a comment.."
                          required=""
                        />
                        <label htmlFor="inputComment" className="text-light">
                          Add a comment..
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <div className="">
                        {token ? (
                          <button
                            type="button"
                            onClick={() => addComment(videoId)}
                            className="btn btn-gray text-light rounded-5 px-3 ms-2"
                          >
                            Comment
                          </button>
                        ) : (
                          <Link
                            href="/login"
                            className="btn btn-gray text-light rounded-5 px-3 ms-2"
                          >
                            {" "}
                            Comment
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="comments-list">
                      {loadingcomment ? (
                        <p>Loading Comment...</p>
                      ) : allComment ? (
                        allComment.map((comment, index) => (
                          <div key={index} className="single-comment-li">
                            <div className="row g-2  mt-1">
                              <div className="col-12 col-lg-12  text-light d-flex gap-2">
                                <div className="commenter-thumb">
                                  {comment.photo ? (
                                    <img
                                      src={comment.photo}
                                      className="rounded-circle  img-fluid"
                                      alt="img"
                                    />
                                  ) : (
                                    <div className="profile-ico">
                                      {comment.full_name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="w-100">
                                  <a
                                    href="#"
                                    className="channel-name mb-0 text-light"
                                  >
                                    <small>{comment.full_name}</small>
                                  </a>
                                  <p>
                                    <small>{comment.comment}</small>
                                  </p>
                                  {/* <div className='row justify-content-start'>
                                                            <div className='col-lg-4 '>
                                                                <div className='bg-gray d-inline-block rounded-5'>
                                                                    <button onClick={() => likeMaster(chanelId, 1)} type='button' className='btn btn-gray text-light rounded-5 border-0'>
                                                                        <small>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                                            </svg> {like ? like : '0'}
                                                                        </small>
                                                                    </button>

                                                                    <span className='text-dark'>|</span>
                                                                    <button onClick={() => likeMaster(chanelId, 2)} type='button' className='btn btn-gray text-light rounded-5 border-0'>
                                                                        <small>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                                                                            </svg>{dlike ? dlike : '0'}
                                                                        </small>
                                                                    </button>
                                                                </div>

                                                            </div>

                                                        </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "white" }}>No Comment available.</p>
                      )}
                    </div>
                  </Card>
                </div>
                {/* comment-box-main end */}
              </>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-lg-12">
                  {loadingvideoss ? (
                    <RelatedVideoLoading />
                  ) : relatedVideos && relatedVideos.length > 0 ? (
                    relatedVideos.map((video, index) => (
                      <div
                        key={index}
                        className="video-box-single-h"
                        onClick={() => viewVideo(video.videoId)}
                      >
                        <Card>
                          <CardContent>
                            <div className="row g-2">
                              <div className="col-5">
                                <div className="video-box">
                                  <Link href={VideoRoute(video.uniqId)}>
                                    {/*--<span className='duration-time'>11:11:11</span>--*/}
                                    <div>
                                      <CardMedia
                                        component="video"
                                        alt="Video Poster"
                                        poster={video.thumbnail}
                                        className="w-100"
                                        muted
                                      >
                                        <source
                                          src={video.url}
                                          className="w-100"
                                          type="video/mp4"
                                        />
                                      </CardMedia>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-7">
                                <div className="content-box">
                                  <div className="row">
                                    <div className="col-12">
                                      <Typography
                                        variant="h5"
                                        component="div"
                                        className="v-tiltle"
                                      >
                                        <Link href={VideoRoute(video.uniqId)}>
                                          {video.title}
                                        </Link>
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <Link
                                          href={"/@" + video.handel}
                                          className="mb-0 text-light small"
                                        >
                                          <small>@{video.channelName}</small>
                                        </Link>
                                        <br />
                                        <Link
                                          href={VideoRoute(video.uniqId)}
                                          className="views-time"
                                        >
                                          {formatViewsCount(video.view)} views{" "}
                                          <span>.</span>{" "}
                                          {<TimeAgo date={video.createdAt} />}
                                        </Link>
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VideoNotAvailable />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { uniqueId } = context.query;

    console.log("server uniqueId:", uniqueId);

    // Make a POST request to your API endpoint
    const response = await axios.post(`${apiUrl}/user/UniqIdWiseVideo`, {
      uniqId: uniqueId,
    });
    console.log("is this logging", response.data);

    // Extract the response data
    const SingleVideoData = response.data;

    // Pass the response data as props to the component
    return {
      props: {
        SingleVideoData,
      },
    };
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching data:", error.message);

    // Return an empty response or handle the error in your component
    return {
      props: {
        SingleVideoData: null,
      },
    };
  }
}

export default WatchSinglePage;
