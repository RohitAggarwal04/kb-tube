import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/pages/components/Includes/Sidebar'
import { useRouter, useParams } from 'next/navigation';
import profilePic from "../@/public/images/profile-pic.jpg";
import ImgCreateVideo from '../@/public/images/channel-create.png';
import { authHttps, getToken } from "../../auth/AuthUser";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { formatDistanceToNow } from 'date-fns';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';



import VideoListLoading from '../../components/LoadingPages/VideoListLoading';
import { ShortsRoute, VideoRoute, handleShareLong, handleShareShort } from '@/app/lib/utils/routeUtils';
import VideosNotFound from '../../components/ErrorPages/VideosNotFound';
import ShortsListingLoading from '../../components/LoadingPages/ShortsListingLoading';
import ShimmerLoading from '../../components/LoadingPages/ShimmerLoading';
import EditVideo from '../../components/Functions/EditVideo';

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


let apiRequestMade = false;


function Channel() {


	const http = authHttps();

	const [currentVideo, setCurrentVideo] = useState(null);
	const [editVideo, setEditVideo] = useState(null);
	const [allVideo, setallVideo] = useState([]);
	const [shortVideo, setshortVideo] = useState([]);
	const [loadingvideos, setloadingvideos] = useState(true);
	const [loadingvideos2, setloadingvideos2] = useState(true);
	const [name, setName] = useState(null);
	const [handel, setHandel] = useState(null);
	const [description, setDescription] = useState(null);
	const [contact, setContact] = useState('');
	const [photo, setPhoto] = useState('');
	const [banner, setBanner] = useState('');
	const [subscriber, setsubscriber] = useState(0);

	const [open, setOpen] = useState(false);


	const navigate = useRouter();

	const viewVideo = async (videoId) => {
		await axios.post('/api/addView', { videoId: videoId });
	};

	const fetchVideo = async () => {
		try {
			const response = await fetchAll('user/userWiseVideo', { type: 1 });
			if (response.data && response.data.data) {
				//   console.log('allvideo', response.data.data);
				setallVideo(response.data.data);
			} else {
				console.error('Invalid data structure received from the API:', response.data);
			}
		} catch (error) {
			console.error('Error fetching video categories:', error);
		} finally {
			setloadingvideos(false);
		}
	};


	const fetchVideo2 = async () => {
		try {
			const response = await fetchAll('user/userWiseVideo', { type: 2 });
			if (response.data && response.data.data) {
				//   console.log('allvideo', response.data.data);
				setshortVideo(response.data.data);
			} else {
				console.error('Invalid data structure received from the API:', response.data);
			}
		} catch (error) {
			console.error('Error fetching video categories:', error);
		} finally {
			setloadingvideos2(false);
		}
	};

	const fetchChannel = async () => {
		try {
			const response = await fetchAll('user/myChanel');
			// console.log(response);
			if (response.data && response.data.status == 1) {

				
				setName(response.data.data.name);
				setHandel(response.data.data.url);
				setDescription(response.data.data.description);
				setContact(response.data.data.name);
				setPhoto(response.data.data.photo);
				setBanner(response.data.data.banner);
				setsubscriber(response.data.data.subscriber);

				apiRequestMade = false;

			}
		} catch (error) {
			console.error('Error fetching Channel:', error);
		}
	};

	useEffect(() => {
		// console.log('api test: ',apiRequestMade);
		if (!apiRequestMade) {
			apiRequestMade = true; // Change the value to true
			fetchVideo();
			fetchVideo2();
			fetchChannel();
		}
	}, [apiRequestMade]);



	const handleClickOpen = (video) => {
		setOpen(true);
		setCurrentVideo(video);

	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (video) => {
		setEditVideo(video);
	}

	const handleDelete = async (video) => {

		try {
			const response = await fetchAll('user/deleteVideo', { videoId: video.videoId });
			if (response.data && response.data.status === 1) {
				const filteredData = allVideo.filter((vid) => vid.videoId !== video.videoId);
				setallVideo(filteredData);

				const filteredData2 = shortVideo.filter((vid) => vid.videoId !== video.videoId);
				setshortVideo(filteredData2);

				handleClose();
			} else {
				console.error('Invalid data structure received from the API:', response.data);
			}
		} catch (error) {
			console.error('Error fetching video categories:', error);
		}

	}

	const darkTheme = createTheme({
		palette: {
			divider: '#111',
			background: {
				paper: 'var(--header)', // Set your desired background color
			},
			text:{
				secondary: '#fff',
			},
			primary: {
				main: '#90caf9', // Adjust as needed
			},
			secondary: {
				main: '#FF6600', // Adjust as needed
			}
		},
	});


	return (
		<>
			<div className="col-xxl-2 col-xl-3 col-lg-3 display991">
				<Sidebar />
			</div>
			<div className="col-xxl-10 col-xl-9 col-lg-9">
				<div className="main__body__wrap left__right__space pt-20 pb-60">
					<div className='container'>
						<div className='row'>
							<div className='col-lg-8'>
								<div className='profile-box video-box-single-h '>
									<div className='row g-3 align-items-center'>
										<div className='col-md-6 col-lg-4 col-xl-3'>
											<div className='profile-pic-box rounded-circle bg-white '>
												{
													photo ? (
														<img src={photo} className="rounded-circle img-fluid" alt='img' />
													) : (
														<img src={profilePic} className="rounded-circle img-fluid" alt='img' />
													)}
											</div>
										</div>
										<div className='col-lg-9 px-lg-4'>
											<div className='content-box shimmer-loading-list'>
												{
													name ?
														<Link href='/channel' className='text-light'>
															{name}
														</Link>
														:
														<ShimmerLoading width="30%" height="20px" />
												}


												{(handel && allVideo) ?
													<>
														<div className='channel-name'>
															<Link href='/channel' className='text-theme'> @{handel} </Link>
															<span> <i className='bi bi-dot'></i> </span>
															<span className='text-secondary'>{subscriber} Subscriber</span>
															<span> <i className='bi bi-dot'></i> </span>
															<span className='text-secondary'>{allVideo && allVideo.length} videos</span>
															<p className='mt-1'><Link href='/channel' className='text-secondary'> {description} </Link></p>
														</div>
														<div className='d-flex gap-2'>
															<Link href="/customization" className="cmn--btn rounded-5 px-3"><span>Customization</span></Link>
															{/* <Link href="/manage-videos" className="btn btn-light  rounded-5 px-3"><small>Mannage Videos</small></Link> */}
														</div>
													</>

													:
													<>
														<ShimmerLoading width="60%" height="20px" />
														<ShimmerLoading width="90%" height="20px" />
														<ShimmerLoading width="20%" borderRadius="40px" height="30px" />
													</>
												}

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* top channer profile  row end */}
						<div className='border-top my-3'></div>
						<div className='row'>
							<div className='col-12 theme-tabs'>
								<nav >
									<div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
										<button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Videos</button>
										{/* <button className="nav-link" id="nav-videos-tab" data-bs-toggle="tab" data-bs-target="#nav-videos" type="button" role="tab" aria-controls="nav-videos" aria-selected="false">Videos</button>
                                    <button className="nav-link" id="nav-playlist-tab" data-bs-toggle="tab" data-bs-target="#nav-playlist" type="button" role="tab" aria-controls="nav-playlist" aria-selected="false">PlayList</button> */}
									</div>
								</nav>
								<div className="tab-content" id="nav-tabContent">
									<div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
										<div className='row g-3 row-cols-lg-3 row-cols-xl-3 row-cols-md-2 row-cols-sm-2'>

											{loadingvideos ? (
												<VideoListLoading />
											) : allVideo.length > 0 ? (
												allVideo.map((video, index) => (
													<div key={index} className='col'>
														<div className='video-box-single-v with-action wa-active' onClick={() => viewVideo(video.videoId)}>

															<Card className='shadow-none h-194-video'>

																<div className='video-box cursor-pointer'>
																	<Link href={VideoRoute(video.uniqId)}>
																		{/*--<span className='duration-time'>11:11:11</span>--*/}
																		<div>
																			<CardMedia
																				component="video"
																				alt="Video Poster"
																				poster={video.thumbnail}
																				className='w-100'
																				muted
																			>
																				<source src={video.url} className='w-100' type="video/mp4" />
																			</CardMedia>
																		</div>

																	</Link>
																</div>
																<CardContent>
																	<div className='content-box'>
																		<div className='row align-items-start g-0'>
																			<div className="col-2">
																				<Link href={'/channel'}>
																					<div className='channel-thumbnail'>

																						{
																							video.channelIcon ? (
																								<img src={video.channelIcon} className="rounded-circle  img-fluid" alt='img' />
																							) : (
																								<img src={profilePic} className="rounded-circle  img-fluid" alt='img' />
																							)}
																					</div>
																				</Link>
																			</div>
																			<div className='col-9'>
																				<Typography variant="h5" component="div" className='v-tiltle'>
																					{/* <Link href='/watch'>{video.title}</Link> */}

																					<Link href={VideoRoute(video.uniqId)}> {video.title}</Link>
																				</Typography>
																				<Typography variant="body2" color="text.secondary">
																					<Link href={'/channel'} className='channel-name mt-2'>{video.channelName}</Link>
																					<Link href={VideoRoute(video.uniqId)} className='views-time'>{formatViewsCount(video.view)} views <span>.</span> {<TimeAgo date={video.createdAt} />}</Link>
																				</Typography>
																			</div>
																			<div className='col-1'>
																				<div className="dropdown text-end">
																					<a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																						<i className="bi bi-three-dots-vertical"></i>
																					</a>
																					<ul className="dropdown-menu">
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handleShareLong(video.uniqId, video.title, video.description)} ><i className="me-3 bi bi-share"></i> Share</Link></li>
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handel ? handleEdit(video) : ""} ><i className="bi bi-pencil-square me-3"></i> Edit </Link></li>
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handel ? handleClickOpen(video) : ""} ><i className="bi bi-trash me-3"></i> Delete </Link></li>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																</CardContent>
															</Card>
														</div>
													</div>
												))
											) : (
												<VideosNotFound />
											)}


										</div>
										<h2 className='h4 mt-3'><i className="bi bi-file-play text-theme"></i> Shorts</h2>
										<div className='row row-cols-lg-5 row-cols-md-3 row-cols-sm-2'>
											{loadingvideos2 ? (
												<ShortsListingLoading />
											) : shortVideo.length > 0 ? (
												shortVideo.map((video, index) => (
													<div key={index} className='col'>
														<div className='video-box-single-v with-action wa-active' onClick={() => viewVideo(video.videoId)}>
															<Card className='shorts-card shadow-none'>
																<div className='video-box cursor-pointer'>

																	<Link href={ShortsRoute(video.uniqId)}>
																		{/*--<span className='duration-time'>11:11:11</span>--*/}
																		<div>
																			<CardMedia
																				component="video"
																				alt="Video Poster"
																				poster={video.thumbnail}
																				className='w-100'
																				muted
																			// controls
																			>
																				<source src={video.url} className='w-100' type="video/mp4" />
																			</CardMedia>
																		</div>
																	</Link>
																</div>
																<CardContent>
																	<div className='content-box'>
																		<div className='row align-items-start g-0'>

																			<div className='col-11'>
																				<Typography variant="h5" component="div" className='v-tiltle'>
																					{/* <Link href='/watch'>{video.title}</Link> */}

																					<Link href={ShortsRoute(video.uniqId)}>{video.title} </Link>
																				</Typography>
																				<Typography variant="body2" color="text.secondary">
																					<Link href='/watch' className='views-time mt-2'>{formatViewsCount(video.view)} views </Link>
																				</Typography>
																			</div>
																			<div className='col-1'>
																				<div className="dropdown text-end">
																					<a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																						<i className="bi bi-three-dots-vertical"></i>
																					</a>
																					<ul className="dropdown-menu">
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handleShareShort(video.uniqId, video.title, video.description)} ><i className="me-3 bi bi-share"></i> Share</Link></li>
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handel ? handleEdit(video) : ""} ><i className="bi bi-pencil-square me-3"></i> Edit </Link></li>
																						<li><Link className="dropdown-item" href="URL:void(0)" onClick={() => handel ? handleClickOpen(video) : ""} ><i className="bi bi-trash me-3"></i> Delete </Link></li>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																</CardContent>
															</Card>
														</div>
													</div>
												))
											) : (
												<></>
											)}


										</div>

									</div>
									{/* <div className="tab-pane fade" id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">

								</div>
								<div className="tab-pane fade" id="nav-playlist" role="tabpanel" aria-labelledby="nav-playlist-tab">

								</div> */}
								</div>
							</div>
							{/* show when there are no video */}

							{
								(allVideo || shortVideo) && (allVideo.length > 0 || shortVideo.length > 0) ? null : (
									<div className='col-lg-12 text-center'>
										<div className='border-top my-3'></div>
										<div className='box  '>
											<img src={ImgCreateVideo} className='img-fuid w-25' />
											<h2 className='h5 my-2'>Create content on any device</h2>
											<p className='w-50 m-auto '>Upload and record at home or on the go. Everything you make public will appear here.</p>
											<button type='button' className="btn btn-light rounded-4 px-5 mt-3" data-bs-toggle="modal" data-bs-target="#videoUpload" >Create </button>
										</div>
									</div>
								)
							}

						</div>
					</div>
				</div>
			</div>

			{editVideo ? <EditVideo video={editVideo} setEditVideo={setEditVideo} />: null}

			<ThemeProvider theme={darkTheme}>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this video? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => handleDelete(currentVideo)} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			</ThemeProvider>
		</>
	)
}

export default Channel