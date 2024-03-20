import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Card from '@mui/material/Card';
import Link from 'next/link';
import profilePic from "@/public/images/profile-pic.jpg";
import { useRouter, useParams } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import '@/public/css/Shorts.css'
import ShortsPageLoading from '@/app/components/LoadingPages/ShortsPageLoading';
import { ShortsVideoUrl, formatViewsCount, handleShareShort } from '@/app/lib/utils/routeUtils';

let apiRequestMade = false;

const Shorts = ({ shortsId }) => {

    const { token, channel, profileData, login, logout } = useContext(AuthContext);
    // const { shortsId } = useParams() || null;


    const [allVideo, setallVideo] = useState([]);
    const [loadingvideos, setloadingvideos] = useState(true);

    const [allVideos, setallVideos] = useState([]);
    const [loadingvideoss, setloadingvideoss] = useState(true);

    // const [chanelId, setChanelId] = useState('');
    // const [subs, setSubs] = useState(false);
    // const [lkis, setSubs1] = useState([]);
    const [comments, setComments] = useState('');
    const [allComment, setallComment] = useState([]);
    const [loadingcomment, setloadingcomment] = useState(true);
    const navigate = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRefs = useRef([]);
    const currentVideoRef = useRef(null);

    const containerRef = useRef(null);
    const [currentVideoId, setCurrentVideoId] = useState(shortsId);
    const [currentDescription, setCurrentDescription] = useState(null);



    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const [lkis, setSubs1] = useState({});
    const [subs, setSubs] = useState({});

    // Function to set like data item by id
    const setItemById = (id, data) => {
        setSubs1(prevState => ({
            ...prevState,
            [id]: data
        }));
    };

    // Function to get item by id
    const getItemById = (id) => {
        return lkis ? lkis[id] : null;
    };




    // Function to set subscribe data item by id
    const setItemById2 = (id, data) => {
        setSubs(prevState => ({
            ...prevState,
            [id]: data
        }));
    };

    // Function to get item by id
    const getItemById2 = (id) => {
        return subs ? subs[id] : false;
    };


    useEffect(() => {
        // Set body class when videoUrl changes
        document.body.classList.add("kbt-shorts");
        document.title = "KB TuBE Shorts";

        return () => {
            document.title = "KB TuBE";
            document.body.classList.remove("kbt-shorts");
        };
    }, []);


    const TimeAgo = ({ date }) => {
        // Assuming `date` is a string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
        const parsedDate = new Date(date);

        const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

        return <span>{timeAgo}</span>;
    };

    const addSubscriber = async (chanelId, videoId) => {
        // console.log(videoId);
        const response = await fetchAll('user/addSubscriber', { 'chanelId': chanelId });
        checksubscrive(videoId);
    };


    const removeSubscriber = async (chanelId, videoId) => {
        const response = await fetchAll('user/removeSubscriber', { 'chanelId': chanelId });
        checksubscrive(videoId);
    };


    const checksubscrive = async (videoId) => {
        try {
            const response = await fetchAll('user/checkSubscriber', { 'videoId': videoId });
            //console.log('checksubs',response);
            if (response.data && response.data.status === 1) {


                setItemById2(videoId, true);

            } else {
                setItemById2(videoId, false);
            }
        } catch (error) {
            setItemById2(videoId, false);
        }
    };


    const likeMaster = async (chanelId, videoId, type) => {
        // console.log('started');
        const response = await fetchAll('user/likeMaster', { 'chanelId': chanelId, 'videoId': videoId, 'type': type });
        // console.log(response.data);

        if (response.data && response.data.status === 1) {
            var id = videoId;
            if (type === 1) {
                var data = {
                    like: 1,
                    dlike: 0,
                    user: 0
                };
                setItemById(id, data);

                if (response.data.action === 3) {

                    var data = {
                        like: 0,
                        dlike: 0,
                        user: 0
                    };
                    setItemById(id, data);

                }
            } else {

                var data = {
                    like: 0,
                    dlike: 1,
                    user: 0
                };
                setItemById(id, data);



                if (response.data.action === 3) {

                    var data = {
                        like: 0,
                        dlike: 0,
                        user: 0
                    };
                    setItemById(id, data);


                }
            }


        }
    };


    const checklike = async (videoId, title, uniqueId) => {

        document.title = title + " || KB TuBE Shorts";
        // navigate('/shorts/' + uniqueId);
        try {
            const response = await fetchAll('user/checkLike', { 'videoId': videoId });

            var data = response.data.data;
            setItemById(videoId, data);
            
            // setSubs1(response.data.data);


        } catch (error) {

            var data = {
                like: 0,
                dlike: 0,
                user: 0
            };
            setItemById(videoId, data);
        }
    };



    const addComment = async (videoId) => {

        setComments('');
        // const videoId = localStorage.getItem('videoId');
        const response = await fetchAll('user/addComment', { 'videoId': videoId, 'comments': comments, });
        if (response.data && response.data.status === 1) {
            fetchAllComments(videoId);
            
        }

    };


    const fetchAllComments = async (videoId) => {
        try {
            // const videoId = localStorage.getItem('videoId');
            const response = await fetchAll('user/videoIdWiseComment', { 'videoId': videoId, });

            // console.log('comm', response);

            if (response.data && response.data.data) {
                setallComment(response.data.data);
            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingcomment(false);
        }
    };


    // useEffect(() => {
    //     if (currentVideoId){
    //         fetchAllComments(currentVideoId);
    //     }
    // }, [currentVideoId]);

    const fetchAllVideo = async (uniqId = null) => {
        try {
            // const catid = localStorage.getItem('catid');
            const response = await fetchAll('user/randomShortVideo', { 'uniqId': uniqId });
            if (response.data && response.data.data) {
                setallVideos(response.data.data);

                apiRequestMade = false;
                // console.log("response.data.data:");
                // console.log(response.data.data);
            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingvideoss(false);
        }
    };


    useEffect(() => {
        // console.log('api test: ',apiRequestMade);
        if (!apiRequestMade) {
            apiRequestMade = true; // Change the value to true
            fetchAllVideo(shortsId);
        }
    }, [apiRequestMade]);

    const handleTimeUpdate = (index) => {
        if (videoRefs.current[index] && videoRefs.current[index].currentTime) {
            setCurrentTime(videoRefs.current[index].currentTime);
        }
    };

    const handleLoadedMetadata = (index) => {
        if (videoRefs.current[index] && videoRefs.current[index].duration) {
            setDuration(videoRefs.current[index].duration);
        }
    };

    const handleVideoClick = (index, e) => {

        if (videoRefs && videoRefs.current && videoRefs.current[index]) {

        // Check if the video is loaded
            if (videoRefs.current[index].readyState >= 2) {
            // Toggle between play and pause
                if (videoRefs.current[index].paused) {
                    videoRefs.current[index].play();
                // console.log("played", index);

                // Preload the next video
                const nextIndex = index + 1;
                if (nextIndex < videoRefs.current.length) {
                    if (videoRefs.current[nextIndex].readyState === 0) {
                        // Set the 'preload' attribute to 'auto' to preload the next video
                        videoRefs.current[nextIndex].preload = 'auto';
                        // console.log("Preloading next video:", nextIndex);
                    }
                }
            } else {
                    videoRefs.current[index].pause();
                // console.log("paused", index);
            }
        } else {
            // console.log("Video is still loading...");
        }
        } else{
            // console.log("Video is still syncing...");
        }
    };


    const playTheVideo = (index) => {

        if (videoRefs.current) {
            videoRefs.current.forEach((videoRef, i) => {
                if (i !== index && videoRef) {
                    videoRef.pause();
                } else {
                    if (videoRef){
                        videoRef.play();
                    }
                }
            });
        }


        if (index !== currentIndex) {
            currentVideoRef.current = videoRefs.current[index];
            setCurrentIndex(index);
        }

        if (currentVideoRef.current) {
            currentVideoRef.current.currentTime = 0;

        }

        if (videoRefs.current[index]) {
            const videoId = allVideos[index] ? allVideos[index].videoId : currentVideoId;
            setCurrentVideoId(videoId);

            // videoRefs.current[index].current.play();

            // console.log("playing", videoId);
            checklike(videoId, allVideos[index].title, allVideos[index].uniqId);
        }
    };

    useEffect(() => {
        if (videoRefs.current && currentIndex) {
            // console.log("currentIndex: ", currentIndex);
            playTheVideo(currentIndex);
        }
    }, [currentIndex]);

    useEffect(() => {

        if (allVideos && allVideos.length > 0){
        const container = containerRef.current;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const containerHeight = document.querySelector(".kbt-shorts-video-item").offsetHeight;
            const containerMarginTop = parseInt(window.getComputedStyle(document.querySelector(".kbt-shorts-video-item")).marginTop);
            const index = Math.round(scrollTop / (containerHeight + containerMarginTop));

            // console.log("index: ", index);

            setCurrentIndex(index);
            if (index==0) {
            playTheVideo(index);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
        }
    }, [allVideos]);


    const LoadCommentSys = (videoId) => {
        setCurrentVideoId(videoId);
        fetchAllComments(videoId);
    }
    const LoadDescriptionSys = (video) => {
        setCurrentDescription(video);
    }

    return (
        <>
            <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
            </div>
            <div className="col-xxl-10 col-xl-9 col-lg-9">
            <div className='kbt-page-manager'>



                <div className="modal fade comment-modal" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="commentModalLabel">Comments</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                {/* watch-video-comment-box end */}
                                <div className='comment-box-main my-3'>
                                    <Card className='p-3'>


                                        <div className='d-flex'>
                                            <h3 className='h5 text-light'>{allComment ? allComment.length : 0} Comments</h3>
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

                                        <div className='d-flex align-items-center'>
                                            <div className='rounded-box-shorts btn btn-gray text-light m-0 mt-2'>
                                                <span>A</span>
                                            </div>
                                            <div className="form-floating w-100">
                                                <input type="text" id="inputComment"
                                                    value={comments}
                                                    onChange={(e) => setComments(e.target.value)}
                                                    className="form-control border-2  border-start-0 border-end-0 border-top-0 border-light bg-transparent rounded-0" placeholder="Add a comment.." required="" />
                                                <label htmlFor="inputComment" className='text-light'>Add a comment..</label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end mt-2'>

                                            <div className=''>
                                                {token ? (
                                                    <button type='button' onClick={() => addComment(currentVideoId)} className='btn btn-gray text-light rounded-5 px-3 ms-2'>Comment</button>
                                                ) : (
                                                    <Link href="/login" className='btn btn-gray text-light rounded-5 px-3 ms-2'> Comment</Link>
                                                )
                                                }

                                            </div>
                                        </div>

                                        <div className='comments-list'>



                                            {loadingcomment ? (
                                                <></>
                                            ) : allComment ? (
                                                allComment.map((comment, index) => (
                                                    <div className='single-comment-li' key={index}>
                                                        <div className='row g-2  mt-1'>
                                                            <div className='col-12 col-lg-12  text-light d-flex gap-2'>
                                                                <div className='commenter-thumb' >


                                                                    {comment.photo ? (
                                                                        <img src={comment.photo} className="rounded-circle  img-fluid" />
                                                                    ) : (

                                                                        <div
                                                                            style={{
                                                                                width: '45px',
                                                                                height: '45px',
                                                                                borderRadius: '50%',
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                color: 'white',
                                                                                fontSize: '22px',
                                                                                padding: '4px'
                                                                            }}
                                                                        >
                                                                            {comment.full_name.charAt(0)}
                                                                        </div>



                                                                    )}

                                                                </div>
                                                                <div className='w-100'>
                                                                    <a href='#' className='channel-name mb-0 text-light'><small>{comment.full_name}</small></a>
                                                                    <p><small>{comment.comment}</small></p>
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
                                                <p style={{ color: 'white' }}>No Comment available.</p>
                                            )}

                                        </div>
                                    </Card>
                                </div>
                                {/* comment-box-main end */}

                            </div>
                        </div>
                    </div>
                </div>


                    <div className="modal fade description-modal" id="descriptionModal" tabIndex="-1" aria-labelledby="descriptionModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="descriptionModalLabel">Description</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    {currentDescription ?
                                    <>
                                            <div className='kbt-metadata-description'>
                                                <h4 className=' kbtd-title text-light my-2'>
                                                    {currentDescription.title}
                                                </h4>
                                                <div className="d-flex align-items-center gap-2 my-2">
                                                    <div className='channel-thumbnail'>
                                                        <Link href={'/@' + currentDescription.handel}>
                                                            {currentDescription.channelIcon ? (
                                                                <img src={currentDescription.channelIcon} className="rounded-circle img-fluid" alt='channel-icon' />
                                                            ) : (
                                                                <img src={profilePic} className="rounded-circle img-fluid" alt='profile-pic' />
                                                            )}
                                                        </Link>
                                                    </div>
                                                    <Link href={'/@' + currentDescription.handel} className='mb-0 text-light'>
                                                        <span>@{currentDescription.handel}</span>
                                                        </Link>
                                                </div>
                                                <div className="align-items-center d-flex gap-2 justify-content-evenly">
                                                    <div className='likes d-flex align-items-center justify-content-end flex-column'>
                                                        <strong className='count'>{currentDescription.like}</strong>
                                                        <span className='text'>Likes</span>
                                                    </div>
                                                    <div className='views d-flex align-items-center justify-content-end flex-column'>
                                                        <strong className='count'>{formatViewsCount(currentDescription.view)}</strong>
                                                        <span className='text'>Views</span>
                                                    </div>
                                                        {
                                                            (() => {
                                                                const createdAt = new Date(currentDescription.createdAt);
                                                                const year = createdAt.getFullYear();
                                                                const month = createdAt.toLocaleString('default', { month: 'long' });
                                                                const date = createdAt.getDate();

                                                                return (
                                                                    <div className='time d-flex align-items-center justify-content-end flex-column'>
                                                                        <strong className='dm'>{`${date} ${month}`}</strong>
                                                                        <span className='year'>{year}</span>
                                                                    </div>
                                                                );
                                                            })()
                                                        }
                                                </div>
                                                <div className='description mt-4'>
                                                    <p>
                                                        {currentDescription.description}
                                                    </p>
                                                </div>
                                            </div>
                                    </>
                                    :null}
                                  

                                </div>
                            </div>
                        </div>
                    </div>



                <div className='kbt-page-manager-scope'>
                    <div ref={containerRef} className='kbt-shorts-container'>
                        <div className='kbt-shorts-inner-container'>
                            {

                                loadingvideoss ? (
                                    <ShortsPageLoading />
                                ) : allVideos && allVideos.length > 0 ? (
                                    allVideos.map((video, index) => {

                                        let likeCount = video.like || 0;
                                        let dislikeCount = video.dlike || 0;

                                        const videoItem = getItemById(video.videoId);
                                        if (videoItem) {
                                            likeCount += videoItem.like === 1 ? 1 : 0;
                                            dislikeCount += videoItem.dlike === 1 ? 1 : 0;
                                        }

                                        const like = likeCount ? likeCount : 'Like';
                                        const dislike = dislikeCount ? dislikeCount : 'Dislike';
                                        const short_url = ShortsVideoUrl(video.url);

                                        return (
                                            <div key={index} className='kbt-shorts-video-item' >
                                                <div className='kbt-shorts-video-item-container'>
                                                    <div className='kbt-player-wrapper'>
                                                        <div className='player-container'>
                                                            <Card className='shorts-card1 shadow-none'>
                                                                <div className='video-box'>
                                                                    <div className='video-box'>
                                                                        <video
                                                                            ref={el => videoRefs.current[index] = el}
                                                                            poster={video.thumbnail}
                                                                            autoPlay={index === currentIndex}
                                                                            preload={(index === 0 || index === 1) ? "auto" :"none"}
                                                                            // controls
                                                                            className='w-100'
                                                                            onTimeUpdate={() => handleTimeUpdate(index)}
                                                                            onLoadedMetadata={() => handleLoadedMetadata(index)}
                                                                            onClick={(e) => handleVideoClick(index, e)}
                                                                        >
                                                                            <source src={short_url} className='w-100' type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    </div>
                                                                </div>

                                                                <div className='progress-bar'>
                                                                    <div className='progress-bar-line'>
                                                                        <div className='progress-bar-background'></div>
                                                                        <div className='progress-bar-played' style={{ transform: `scaleX(${duration && video && video.videoId == currentVideoId && duration !== 0 ? (currentTime / duration) : 0})` }}></div>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='kbtube-item-overlay'>
                                                    <div className='kbtube-item-overlay-inner'>
                                                        <div className='kbt-metadata-container'>
                                                            <div className='kbt-metadata-container-overlay '>
                                                                <div className='kbt-metadata-container-overlay-inner'>

                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <div className='channel-thumbnail'>
                                                                            <Link href={'/@' + video.handel}>
                                                                            {video.channelIcon ? (
                                                                                <img src={video.channelIcon} className="rounded-circle img-fluid" alt='channel-icon' />
                                                                            ) : (
                                                                                <img src={profilePic} className="rounded-circle img-fluid" alt='profile-pic' />
                                                                            )}
                                                                            </Link>
                                                                        </div>
                                                                        <Link href={'/@' + video.handel} className='mb-0 text-light small'><small>@{video.handel}</small></Link>
                                                                        <div className='me-2'>


                                                                            {token ? (
                                                                                getItemById2(video.videoId) ? (

                                                                                    <button type='button' onClick={() => removeSubscriber(video.chanelId, video.videoId)} className='btn bg-white rounded-5 px-2 py-1'><small> <i className="bi bi-bell"></i> Subscribed</small></button>

                                                                                ) : (
                                                                                        <button type='button' onClick={() => addSubscriber(video.chanelId, video.videoId)} className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></button>
                                                                                )

                                                                            ) : (
                                                                                <Link href="/login" className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></Link>
                                                                            )
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <h3 className='text-light mt-2 h6'>
                                                                        {video.title}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='shorts-action-btns kbt-action-bar'>
                                                            <div className='text-center' title='I like this'>
                                                                <Link href={token ? "#" : "/login"} onClick={token ? () => likeMaster(video.chanelId, video.videoId, 1) : null} className='rounded-box-shorts'>

                                                                    <i className={`${getItemById(video.videoId) && getItemById(video.videoId).like === 1 ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-up'}`}></i>

                                                                </Link>
                                                                <small>{like}</small>
                                                            </div>
                                                            <div className='text-center' title='I dishlike this'>
                                                                <Link href={token ? "#" : "/login"} onClick={token ? () => likeMaster(video.chanelId, video.videoId, 2) : null} className='rounded-box-shorts'>
                                                                    <i className={`${getItemById(video.videoId) && getItemById(video.videoId).dlike === 1 ? 'bi bi-hand-thumbs-down-fill' : 'bi bi-hand-thumbs-down'}`}></i>
                                                                </Link>
                                                                <small> {dislike}</small>
                                                            </div>
                                                            <div className='text-center'>
                                                                
                                                                <Link href="#" onClick={() => LoadCommentSys(video.videoId)} data-bs-toggle="modal" data-bs-target="#commentModal" className='rounded-box-shorts'>
                                                                    <i className="bi bi-chat-right-text-fill"></i>
                                                                </Link>
                                                                <small>Comment</small>
                                                            </div>
                                                            <div className='text-center'>
                                                                <a href="#" onClick={() => handleShareShort(video.uniqId, video.title, video.description)} className='rounded-box-shorts'>
                                                                    <i className="bi bi-share"></i>
                                                                </a>
                                                                <small>Share</small>
                                                            </div>
                                                            <div className='text-center'>
                                                                <a href="#" onClick={() => LoadDescriptionSys(video)} data-bs-toggle="modal" data-bs-target="#descriptionModal" className='rounded-box-shorts'>
                                                                    <i className="bi bi-three-dots"></i>
                                                                </a>
                                                            </div>
                                                            <div className='text-center mt-2'>
                                                                <Link href={'/@' + video.handel} className="chprofile rounded-3 overflow-hidden">
                                                                    {video.channelIcon ? (
                                                                        <img src={video.channelIcon} className='rounded-box-shorts btn-light mt-1' width={50} height={50} alt='channel-icon' />
                                                                    ) : (
                                                                        <img src={profilePic} className='rounded-box-shorts btn-light mt-1' width={50} height={50} alt='profile-pic' />
                                                                    )}
                                                                </Link>
                                                            </div>


                                                            <div className='text-center'>
                                                                <br /><br /><br />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>No videos available.</p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <Link href="/" className='back-btn'>
                <i className='bi-chevron-left'></i>
            </Link>
        </>
    );
}

export default Shorts;