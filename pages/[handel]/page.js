'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import profilePic from "@/public/images/profile-pic.jpg";
import ImgCreateVideo from '@/public/images/channel-create.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { formatDistanceToNow } from 'date-fns';
import { ShortsRoute, VideoRoute } from '@/app/lib/utils/routeUtils';

import VideoListLoading from '@/app/components/LoadingPages/VideoListLoading';
import VideosNotFound from '@/app/components/ErrorPages/VideosNotFound';
import ShortsListingLoading from '@/app/components/LoadingPages/ShortsListingLoading';
import ShimmerLoading from '@/app/components/LoadingPages/ShimmerLoading';
import handleSanitize from '@/app/lib/utils/handleSanitize';
import VideoNotAvailable from '@/app/components/ErrorPages/VideoNotAvailable';
import NotFound from '@/app/components/ErrorPages/NotFound';
import AppLayout from '@/app/layouts/app';
import { fetchAll } from '@/pages/backup/Initial';

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

function Handle(props) {


	const { handel } = useParams();

	const [loadingChannel, setLoadingChannel] = useState(true);
	const [channelData, setChannelData] = useState([]);
	const [allVideo, setallVideo] = useState([]);
	const [shortVideo, setshortVideo] = useState([]);
	const [loadingvideos, setloadingvideos] = useState(true);
	const [loadingvideos2, setloadingvideos2] = useState(true);
	const [name, setName] = useState(null);
	const [description, setDescription] = useState(null);
	const [contact, setContact] = useState('');
	const [photo, setPhoto] = useState('');
	const [banner, setBanner] = useState('');
	const [subscriber, setsubscriber] = useState(0);

	const router = useRouter();

	useEffect(()=>{
		const {handle} = props;
		console.log("props: ", props);
		console.log("handle: ", handle);
	}, [props])

	const viewVideo = async (videoId) => {
		await axios.post('/api/addView', { videoId: videoId });
	};

	const fetchVideo = async (handel) => {
		try {
			const response = await fetchAll('user/handelWiseVideo', { type: 1, handel: handel });
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


	const fetchVideo2 = async (handel) => {
		try {
			const response = await fetchAll('user/handelWiseVideo', { type: 2, handel: handel });
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


	const fetchChannel = async (handel) => {
		const fine_handel = handleSanitize(handel);
		setLoadingChannel(true);
		try {
			const response = await fetchAll('user/handelWiseChannelData', { "handel": fine_handel });
			// console.log(response);
			// if (response.data && response.data.status == 0) {

			// }
			if (response.data && response.data.status == 1) {

				setChannelData(response.data.data);

				setName(response.data.data.name);
				setDescription(response.data.data.description);
				setContact(response.data.data.name);
				setPhoto(response.data.data.photo);
				setBanner(response.data.data.banner);
				setsubscriber(response.data.data.subscriber);


				fetchVideo(handel);
				fetchVideo2(handel);

			}
		} catch (error) {
			console.error('Error fetching Channel:', error);
		} finally {
			setLoadingChannel(false);
		}
	};

	useEffect(() => {
		fetchChannel(handel);
	}, [handel]);

	return (
		<>
		<AppLayout>
			{loadingChannel || channelData && channelData.name ? (
					<div className="main__body__wrap left__right__space pb-60">
						<div className='container'>
							<div className='row'>
								<div className='col-lg-8'>
									<div className='profile-box video-box-single-h '>
										<div className='row g-3 align-items-center'>
											<div className='col-md-6 col-lg-4 col-xl-3'>
												<div className='profile-pic-box rounded-circle bg-white '>
													{
														photo ? (
															<img src={photo} className="rounded-circle  img-fluid" />
														) : (
															<img src={profilePic} className="rounded-circle  img-fluid" />
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
														<div className='col'>
															<div className='video-box-single-v with-action' onClick={() => viewVideo(video.videoId)}>

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
																					<Link href={'/@' + video.handel}>
																						<div className='channel-thumbnail'>

																							{
																								video.channelIcon ? (
																									<img src={video.channelIcon} className="rounded-circle  img-fluid" />
																								) : (
																									<img src={profilePic} className="rounded-circle  img-fluid" />
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
																						<Link href={'/@' + video.handel} className='channel-name mt-2'>{video.channelName}</Link>
																						<Link href={VideoRoute(video.uniqId)} className='views-time'>{formatViewsCount(video.view)} views <span>.</span> {<TimeAgo date={video.createdAt} />}</Link>
																					</Typography>
																				</div>
																				<div className='col-1'>
																					<div className="dropdown text-end">
																						<a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																							<i className="bi bi-three-dots-vertical"></i>
																						</a>
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
														<div className='col'>
															<div className='video-box-single-v with-action' onClick={() => viewVideo(video.videoId)}>
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
																							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
																								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
																							</svg>
																						</a>
																						<ul className="dropdown-menu">
																							<li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-share"></i> Share</Link></li>
																							<li><Link className="dropdown-item" href="/login"><i className="bi bi-send me-3"></i> Feedback</Link></li>

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


							</div>
						</div>
					</div>
			) : (
				<NotFound />
			)}
			</AppLayout>
		</>
	)
}

export default Handle