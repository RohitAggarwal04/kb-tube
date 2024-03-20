
import React, { useState, useEffect } from 'react';
import profilePic from "@/public/images/profile-pic.jpg";
import { ListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { VideoRoute, ShortsRoute, formatViewsCount, apiUrl } from '@/app/lib/utils/routeUtils';
import VideoListLoading from '@/app/components/LoadingPages/VideoListLoading';
import VideosNotFound from '@/app/components/ErrorPages/VideosNotFound';
import ShortsListingLoading from '@/app/components/LoadingPages/ShortsListingLoading';

import Layout from '@/app/components/Layout';
import axios from 'axios';
import Head from 'next/head';
import { APP_URL } from '@/app/lib/auth/config';
import { TimeAgo } from '@/app/lib/utils/VideoUtills';

function Home({ longVideoData, shortVideoData, videoCategoriesData }) {


   const metadataBase = new URL(APP_URL || 'https://kbtube.com/');
   const metaData = {
      title: "KB TuBE",
      keywords: "video, sharing, camera phone, video phone, free, upload",
      description: "KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience.",
      twitterCard: "KB TuBE",
      canonical: `${metadataBase}about/`,
      share_image: `${metadataBase}/images/share.png`,
   }

   const [allVideo, setallVideo] = useState([]);

   const [loadingvideos, setloadingvideos] = useState(true);
   const [menu, setMenu] = useState('1');

   const [allVideop, setallVideop] = useState([]);
   const [loadingvideosp, setloadingvideosp] = useState(true);


   const [photo, setPhoto] = useState('');
   const [showAllVideo, setshowAllVideo] = useState(6);
   const [shortsSlice, setShortsSlice] = useState(6);
   const [showAllShorts, setshowAllShorts] = useState(false);
   const [isDesktop, setIsDesktop] = useState(false);

   const [videoCategories, setVideoCategories] = useState([]);
   const [loadingCategories, setLoadingCategories] = useState(true);


   function calculateShortsSlice(windowWidth) {
      // Define your slice widths and corresponding breakpoints
      const sliceWidths = [468, 698, 992, 1105, 1200, 1308, 1400, 1500, 1600]; // Breakpoints
      const numSlices = [2, 3, 4, 3, 4, 4, 4, 5, 6]; // Number of slices for each breakpoint
      // Find the correct number of slices based on the window width
      for (let i = 0; i < sliceWidths.length; i++) {
         if (windowWidth < sliceWidths[i]) {
            return numSlices[i];
         }
      }
      // Default number of slices
      return numSlices[numSlices.length - 1];
   }

   const handleResize = () => {

      const windowWidth = window.innerWidth;
      const newShortsSlice = calculateShortsSlice(windowWidth);
      // console.log("av start: ", shortsSlice);
      // console.log("update start: ", newShortsSlice);
      if (shortsSlice !== newShortsSlice) {
         // console.log("updated: ", newShortsSlice);
         setShortsSlice(newShortsSlice);
      }
   };

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const viewVideo = async (videoId) => {
      await axios.post('/api/addView', { videoId: videoId });
   };


   const getVideo = async (categoryId, event) => {
      try {
         setMenu(event);

         if (categoryId) {
            const response = await axios.post('api/categoryWiseVideo', { categoryId: categoryId });
            if (response && response.data && response.data.data) {
               setallVideo(response.data.data);
               setPhoto(response.data.data.photo);
            } else {
               console.error('Invalid data structure received from the API:', response.data);
            }
         } else {
            setallVideo(longVideoData.data);
         }
      } catch (error) {
         console.error('Error fetching CategoryWiseVideo:', error.message);
      } finally {
         setloadingvideos(false);
      }


   };

   const getLongVideo = async (videoData) => {
      try {
         setloadingvideos(true); // Set loading to true when starting the fetch

         const response = videoData;

         if (response && response.data) {
            // const filteredData = searchkey ? response.data.filter(item => item.type === '1') : response.data;
            const filteredData = response.data;
            setallVideo(filteredData);
            // localStorage.removeItem('searchkey');
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching getLongVideo:', error.message);
         console.error('Error fetching getLongVideo error:', error);
      } finally {
         setloadingvideos(false); // Set loading to false regardless of success or error
      }
   };

   const getShortVideo = async (shortData) => {
      try {
         setloadingvideosp(true); // Set loading to true when starting the fetch

         const response = shortData;

         if (response && response.data) {
            // const filteredData = searchkey ? response.data.filter(item => item.type === '2') : response.data;
            const filteredData = response.data;
            setallVideop(filteredData);
            // localStorage.removeItem('searchkey');
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching getShortVideo:', error.message);
      } finally {
         setloadingvideosp(false); // Set loading to false regardless of success or error
      }
   };



   // Fetch video categories
   const getVideoCategories = async (categoryData) => {
      try {
         const response = categoryData;

         if (response && response.data) {
            // Make sure response.data is an array before setting it to state
            setVideoCategories(response.data);
         } else {
            console.error('Invalid data structure received from the API:', response);
         }
      } catch (error) {
         console.error('Error fetching getVideoCategories:', error.message);
      } finally {
         setLoadingCategories(false);
      }
   };

   useEffect(() => {
      getShortVideo(shortVideoData);
      getLongVideo(longVideoData);
      getVideoCategories(videoCategoriesData);
   }, [longVideoData, shortVideoData, videoCategoriesData]);

   const handleMenu = async (event) => {
      setMenu(event);
   }

   return (
      <>

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
         <Layout>

            <section className="main__tab__slide mb-3">
               <ul className="nav nav-tabs" id="myTabmain" role="tablist">
                  <Swiper
                     navigation={true}
                     modules={[Navigation]}
                     spaceBetween={15}
                     slidesPerView='auto'
                  >

                     {videoCategories && videoCategories.length > 0 && (
                        <>
                           <SwiperSlide onClick={() => handleMenu('1')}>

                              <li className="nav-item" role="presentation">
                                 <button
                                    className={`nav-link ${menu === '1' ? 'active' : ''}`}
                                    onClick={() => getVideo()}
                                 >
                                    <span>All</span>
                                 </button>
                              </li>

                           </SwiperSlide>
                           {videoCategories.map((category, index) => (
                              <SwiperSlide key={index} onClick={() => getVideo(category.categoryId, category.category)}>

                                 <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${menu === category.category ? 'active' : ''}`}
                                    >
                                       <span>{category.category}</span>
                                    </button>
                                 </li>

                              </SwiperSlide>
                           ))}
                        </>
                     )}

                  </Swiper>


               </ul>
            </section>

            <div className="main__body__wrap left__right__space pb-60">

               {loadingvideos ? (
                  <div className='row g-3 row-cols-lg-3 row-cols-xl-4 row-cols-md-2 row-cols-sm-2'>
                     <VideoListLoading />
                  </div>
               ) : allVideo.length > 0 ? (


                  <div className='row g-3 row-cols-lg-3 row-cols-xl-4 row-cols-md-2 row-cols-sm-2'>
                     {

                        allVideo.slice(0, showAllVideo).map((video, index) => (
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
                                                   <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <i className="bi bi-three-dots-vertical"></i>
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
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </CardContent>
                                 </Card>
                              </div>
                           </div>
                        ))

                     }</div>

               ) : (
                  <VideosNotFound />
               )}


               {allVideo && allVideo.length > 8 && !loadingvideos && (
                  <div className='row'>
                     <div className='col-12 d-flex justify-content-center align-items-center'>
                        <div className='button-inner d-flex justify-content-center align-items-center'>
                           <button variant="primary" onClick={() => setshowAllVideo(showAllVideo == 8 && allVideo.length > 8 ? allVideo.length : 7)} className="show-more-btn">
                              {showAllVideo > 8 ?
                                 <>Show Less <i className='bi bi-chevron-up'></i></>
                                 :
                                 <>Show More <i className='bi bi-chevron-down'></i></>
                              }
                           </button>
                        </div>
                     </div>
                  </div>
               )}

               <div className="section__title">
                  <h2 className='h4'><span className="bi bi-file-play text-theme"></span> Shorts</h2>
               </div>
               <div className={'video-list'}>
                  {loadingvideosp ? (
                     <ShortsListingLoading />
                  ) : allVideop.length > 0 ? (
                     showAllShorts ? (
                        allVideop.map((video, index) => (
                           <ListItem key={index} onClick={() => viewVideo(video.videoId)}>
                              <div className='video-box-single-v with-action'>
                                 <Card className='shorts-card shadow-none'>
                                    <div className='video-box cursor-pointer'>
                                       <Link href={ShortsRoute(video.uniqId)}>
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
                                             <div className='col-11'>
                                                <Typography variant="h5" component="div" className='v-tiltle'>
                                                   <Link href={ShortsRoute(video.uniqId)}>{video.title} </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                   <Link href={ShortsRoute(video.uniqId)} className='views-time mt-2'>{formatViewsCount(video.view)} views </Link>
                                                </Typography>
                                             </div>
                                             <div className='col-1'>
                                                <div className="dropdown text-end">
                                                   <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                         <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                      </svg>
                                                   </Link>
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
                           </ListItem>
                        ))
                     ) : (
                        allVideop.slice(0, shortsSlice).map((video, index) => (
                           <ListItem key={index} onClick={() => viewVideo(video.videoId)}>
                              <div className='video-box-single-v with-action'>
                                 <Card className='shorts-card shadow-none'>
                                    <div className='video-box cursor-pointer'>
                                       <Link href={ShortsRoute(video.uniqId)}>
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
                                             <div className='col-11'>
                                                <Typography variant="h5" component="div" className='v-tiltle'>
                                                   <Link href={ShortsRoute(video.uniqId)}>{video.title} </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                   <Link href={ShortsRoute(video.uniqId)} className='views-time mt-2'>{formatViewsCount(video.view)} views </Link>
                                                </Typography>
                                             </div>
                                             <div className='col-1'>
                                                <div className="dropdown text-end">
                                                   <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                         <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                      </svg>
                                                   </Link>
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
                           </ListItem>
                        ))
                     )


                  ) : (
                     <></>
                  )}

               </div>
               {allVideop && allVideop.length > 5 && !loadingvideosp && (
                  <div className='row'>
                     <div className='col-12 d-flex justify-content-center align-items-center'>
                        <div className='button-inner d-flex justify-content-center align-items-center'>
                           <button variant="primary" onClick={() => setshowAllShorts(showAllShorts !== true)} className="show-more-btn">
                              {showAllShorts ?
                                 <>Show Less <i className='bi bi-chevron-up'></i></>
                                 :
                                 <>Show More <i className='bi bi-chevron-down'></i></>
                              }
                           </button>
                        </div>
                     </div>
                  </div>
               )}

            </div>
         </Layout>
      </>
   )
}


export async function getServerSideProps(context) {
   try {

      // Make a POST request to your API endpoint
      const response = await axios.post(`${apiUrl}/user/allVideo`, { searchkey: "" });
      const response2 = await axios.post(`${apiUrl}/user/shortVideo`, { searchkey: "" });
      const response3 = await axios.post(`${apiUrl}/user/videoCategory`, {});

      // Extract the response data
      const longVideoData = response.data;
      const shortVideoData = response2.data;
      const videoCategoriesData = response3.data;

      // Pass the response data as props to the component
      return {
         props: {
            longVideoData,
            shortVideoData,
            videoCategoriesData,
         },
      };
   } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching data:', error.message);

      // Return an empty response or handle the error in your component
      return {
         props: {
            longVideoData: null,
            shortVideoData: null,
            videoCategoriesData: null,
         },
      };
   }
}


export default Home
