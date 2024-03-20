import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Includes/Sidebar";
import img1 from "../@/public/images/thumnail-1.jpg";
import img2 from "../@/public/images/thumnail-2.jpg";
import img3 from "../@/public/images/thumnail-3.jpg";
import { authHttps as makeHttps } from "../../auth/AuthUser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import video1 from "../../assets/videos/video-1.mp4";
import { formatDistanceToNow } from "date-fns";

function LikedVideos() {
  const http = makeHttps();

  const [allVideos, setallVideos] = useState([]);
  const [loadingvideoss, setloadingvideoss] = useState(true);

  const fetchAllVideo = async () => {
    try {
      const response = await fetchAll("user/allLikedVideo");
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
          <div className="row">
            {loadingvideoss ? (
              <p>Loading Video...</p>
            ) : allVideos.length && allVideos.length > 0 ? (
              allVideos.map((video, index) => (
                <div
                  className="col-lg-6"
                  key={index}
                  onClick={() =>
                    viewVideo(video.video.videoId, video.video.playlistCategory)
                  }
                >
                  <div className="video-box-single-h with-action">
                    <Card>
                      <CardContent>
                        <div className="row g-2">
                          <div className="col-4">
                            <div className="video-box">
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
                                    {video.video.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <a href="/channel" className="channel-name">
                                      {video.channel.name}
                                    </a>
                                    <a href="/watch" className="views-time">
                                      {formatViewsCount(video.video.view)} views{" "}
                                      <span>.</span>{" "}
                                      {<TimeAgo date={video.video.createdAt} />}
                                    </a>
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-1">
                            <div className="dropdown text-end">
                              <a
                                href="#"
                                className="d-block caret-none link-body-emphasis text-decoration-none dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-three-dots-vertical"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                              </a>
                              <ul className="dropdown-menu ">
                                <li>
                                  <a className="dropdown-item" href="/login">
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
                </div>
              ))
            ) : (
              <p>No Video available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LikedVideos;
