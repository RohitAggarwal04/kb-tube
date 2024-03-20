import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Includes/Sidebar";
import img1 from "../@/public/images/thumnail-1.jpg";
import img2 from "../@/public/images/thumnail-2.jpg";
import img3 from "../@/public/images/thumnail-3.jpg";
import { authHttps as makeHttps } from "../../auth/AuthUser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import profilePic from "../@/public/images/profile-pic.jpg";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import video1 from "../../assets/videos/video-1.mp4";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function HistoryVideos() {
  const http = makeHttps();

  const [allVideos, setallVideos] = useState([]);
  const [loadingvideoss, setloadingvideoss] = useState(true);

  const fetchAllVideo = async () => {
    try {
      const response = await fetchAll("user/allHistory");
      console.log("tesy", response);
      if (response.data && response.data.data) {
        setallVideos(response.data.data);
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

  useEffect(() => {
    fetchAllVideo();
  }, []);

  const navigate = useRouter();

  const viewVideo = async (videoId, catid) => {
    localStorage.setItem("videoId", videoId);
    localStorage.setItem("catid", catid);
    await axios.post("/api/addView", { videoId: videoId });
    navigate("../watch");
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
  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
        <Sidebar />
      </div>
      <div className="col-xxl-10 col-xl-9 col-lg-9">
        <div className="container">
          <h2 className="mb-5">Watch History</h2>
          <div className="row g-3">
            <div className="col-lg-8">
              {/* <h3 className='h4'>Today</h3> */}
              <h2 className="h5 mt-4">
                <i className="bi bi-file-play text-theme"></i> Shorts
              </h2>

              <div className="short-videos">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="short-videos-swiper"
                  spaceBetween={10}
                  breakpoints={{
                    360: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="video-box-single-v with-action">
                      <Card className="shorts-card shadow-none">
                        <div className="video-box cursor-pointer">
                          {/*--<span className='duration-time'>11:11:11</span>--*/}
                          <div>
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              // poster={img1}
                              className="w-100"
                              muted
                              controls
                            >
                              <source
                                src={video1}
                                className="w-100"
                                type="video/mp4"
                              />
                            </CardMedia>
                          </div>
                        </div>
                        <CardContent>
                          <div className="content-box">
                            <div className="row align-items-start g-0">
                              <div className="col-3">
                                <div className="channel-thumbnail">
                                  <img
                                    src={profilePic}
                                    className="rounded-circle  img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-8">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  className="v-tiltle"
                                >
                                  <Link href="#">
                                    <small>
                                      ANIMAL: Saari Duniya Jalaa Denge (Film
                                      Version) Ranbir K, Bobby D, Sandeep, B
                                      Praak,Jaani, Bhushan K
                                    </small>{" "}
                                  </Link>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Link href="/watch" className="views-time">
                                    10k views <span>.</span> 1 year
                                  </Link>
                                </Typography>
                              </div>
                              <div className="col-1">
                                <div className="dropdown text-end">
                                  <a
                                    href="#"
                                    className="d-block caret-none  text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        <i className="bi bi-bar-chart-steps me-3"></i>
                                        Add to queue
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        <i className="me-3 bi bi-clock-history"></i>{" "}
                                        Save to Watch Later
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        <i className="bi bi-plus-square me-3"></i>{" "}
                                        Save to Playlist
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        <i className="bi bi-download me-3"></i>{" "}
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        <i className="me-3 bi bi-share"></i>{" "}
                                        Share
                                      </Link>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" href="#">
                                        <i className="me-3 bi bi-ban"></i> Not
                                        Interested{" "}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" href="#">
                                        <i className="bi bi-dash-circle me-3"></i>{" "}
                                        Don't Recomended Channel{" "}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" href="#">
                                        <i className="me-3 bi bi-flag"></i>{" "}
                                        Report{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="video-box-single-v with-action">
                      <Card className="shorts-card shadow-none">
                        <div className="video-box cursor-pointer">
                          {/*--<span className='duration-time'>11:11:11</span>--*/}
                          <div>
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              // poster={img1}
                              className="w-100"
                              muted
                              controls
                            >
                              <source
                                src={video1}
                                className="w-100"
                                type="video/mp4"
                              />
                            </CardMedia>
                          </div>
                        </div>
                        <CardContent>
                          <div className="content-box">
                            <div className="row align-items-start g-0">
                              <div className="col-3">
                                <div className="channel-thumbnail">
                                  <img
                                    src={profilePic}
                                    className="rounded-circle  img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-8">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  className="v-tiltle"
                                >
                                  <Link href="#">
                                    <small>
                                      ANIMAL: Saari Duniya Jalaa Denge (Film
                                      Version) Ranbir K, Bobby D, Sandeep, B
                                      Praak,Jaani, Bhushan K
                                    </small>{" "}
                                  </Link>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Link href="/watch" className="views-time">
                                    10k views <span>.</span> 1 year
                                  </Link>
                                </Typography>
                              </div>
                              <div className="col-1">
                                <div className="dropdown text-end">
                                  <a
                                    href="#"
                                    className="d-block caret-none  text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </a>
                                  <ul className="dropdown-menu ">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Share
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Profile
                                      </a>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Remove Video
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="video-box-single-v with-action">
                      <Card className="shorts-card shadow-none">
                        <div className="video-box cursor-pointer">
                          {/*--<span className='duration-time'>11:11:11</span>--*/}
                          <div>
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              // poster={img1}
                              className="w-100"
                              muted
                              controls
                            >
                              <source
                                src={video1}
                                className="w-100"
                                type="video/mp4"
                              />
                            </CardMedia>
                          </div>
                        </div>
                        <CardContent>
                          <div className="content-box">
                            <div className="row align-items-start g-0">
                              <div className="col-3">
                                <div className="channel-thumbnail">
                                  <img
                                    src={profilePic}
                                    className="rounded-circle  img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-8">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  className="v-tiltle"
                                >
                                  <Link href="#">
                                    <small>
                                      ANIMAL: Saari Duniya Jalaa Denge (Film
                                      Version) Ranbir K, Bobby D, Sandeep, B
                                      Praak,Jaani, Bhushan K
                                    </small>{" "}
                                  </Link>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Link href="/watch" className="views-time">
                                    10k views <span>.</span> 1 year
                                  </Link>
                                </Typography>
                              </div>
                              <div className="col-1">
                                <div className="dropdown text-end">
                                  <a
                                    href="#"
                                    className="d-block caret-none  text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </a>
                                  <ul className="dropdown-menu ">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Share
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Profile
                                      </a>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Remove Video
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="video-box-single-v with-action">
                      <Card className="shorts-card shadow-none">
                        <div className="video-box cursor-pointer">
                          {/*--<span className='duration-time'>11:11:11</span>--*/}
                          <div>
                            <CardMedia
                              component="video"
                              alt="Video Poster"
                              // poster={img1}
                              className="w-100"
                              muted
                              controls
                            >
                              <source
                                src={video1}
                                className="w-100"
                                type="video/mp4"
                              />
                            </CardMedia>
                          </div>
                        </div>
                        <CardContent>
                          <div className="content-box">
                            <div className="row align-items-start g-0">
                              <div className="col-3">
                                <div className="channel-thumbnail">
                                  <img
                                    src={profilePic}
                                    className="rounded-circle  img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-8">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  className="v-tiltle"
                                >
                                  <Link href="#">
                                    <small>
                                      ANIMAL: Saari Duniya Jalaa Denge (Film
                                      Version) Ranbir K, Bobby D, Sandeep, B
                                      Praak,Jaani, Bhushan K
                                    </small>{" "}
                                  </Link>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Link href="/watch" className="views-time">
                                    10k views <span>.</span> 1 year
                                  </Link>
                                </Typography>
                              </div>
                              <div className="col-1">
                                <div className="dropdown text-end">
                                  <a
                                    href="#"
                                    className="d-block caret-none  text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </a>
                                  <ul className="dropdown-menu ">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="/login"
                                      >
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Share
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Profile
                                      </a>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Remove Video
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="mt-3">
                {loadingvideoss ? (
                  <p>Loading Video...</p>
                ) : allVideos.length && allVideos.length > 0 ? (
                  allVideos.map((video, index) => (
                    <div
                      className="video-box-single-h with-action"
                      key={index}
                      onClick={() =>
                        viewVideo(
                          video.video.videoId,
                          video.video.playlistCategory
                        )
                      }
                    >
                      <Card>
                        <CardContent>
                          <div className="row g-2">
                            <div className="col-5">
                              <a href="/watch" className="video-box">
                                {/*--<span className='duration-time'>11:11:11</span>--*/}
                                <video
                                  className="w-100"
                                  poster={video.video.thumbnail}
                                >
                                  <source
                                    src={video.video.url}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </a>
                            </div>
                            <div className="col-6">
                              <div className="content-box">
                                <div className="row">
                                  <div className="col-12">
                                    <Typography
                                      variant="h5"
                                      component="div"
                                      className="v-tiltle"
                                    >
                                      <a href="/watch">{video.video.title}</a>
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <a
                                        href="/channel"
                                        className="channel-name"
                                      >
                                        {video.channel.name} <span>.</span>{" "}
                                        {formatViewsCount(video.video.view)}{" "}
                                        views
                                      </a>
                                    </Typography>
                                    <Typography>
                                      <small className="text-secondary">
                                        {video.video.description}
                                      </small>
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              <div className="dropdown text-end">
                                <Link
                                  href="#"
                                  className="d-block caret-none  text-decoration-none dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="bi bi-three-dots-vertical"></i>
                                </Link>
                                <ul className="dropdown-menu ">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href={video.video.url}
                                      download
                                    >
                                      Download
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Share
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Profile
                                    </a>
                                  </li>
                                  <li>
                                    <hr className="dropdown-divider" />
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Remove Video
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                  <p>No History available.</p>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="bg-gray history-sidebar">
                <div className="input-group search-box mb-3">
                  <div className="input-group-prepend bg-transparent border-0">
                    <span
                      className="input-group-text border-0 rounded-0"
                      id="basic-addon1"
                    >
                      {" "}
                      <i className="bi bi-search"></i>{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 rounded-0"
                    placeholder="Search watch History"
                    aria-label="watch History"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div>
                  <ul className="nav flex-column mb-auto ">
                    <li className="nav-item">
                      <Link
                        href="/"
                        className="nav-link text-dark"
                        aria-current="page"
                        data-bs-dismiss="offcanvas"
                      >
                        <i className="me-3 bi bi-trash"></i>
                        <span className="sidebar-title">
                          Clear all watch history
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/"
                        className="nav-link text-dark"
                        aria-current="page"
                        data-bs-dismiss="offcanvas"
                      >
                        <i className="me-3 bi bi-pause"></i>
                        <span className="sidebar-title">
                          Pause watch history
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/"
                        className="nav-link text-dark"
                        aria-current="page"
                        data-bs-dismiss="offcanvas"
                      >
                        <i className="me-3 bi bi-gear"></i>
                        <span className="sidebar-title">
                          Manage all history
                        </span>
                      </Link>
                      <ul className="list-unstyled ms-4">
                        <li>
                          <Link
                            href="/"
                            className="nav-link text-secondary ps-4"
                            aria-current="page"
                            data-bs-dismiss="offcanvas"
                          >
                            Comments
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/"
                            className="nav-link text-secondary ps-4"
                            aria-current="page"
                            data-bs-dismiss="offcanvas"
                          >
                            Community Post
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/"
                            className="nav-link text-secondary ps-4"
                            aria-current="page"
                            data-bs-dismiss="offcanvas"
                          >
                            Live Chat
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryVideos;
