import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Includes/Sidebar';
import profilePic from "@/public/images/profile-pic.jpg";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import VideoListLoading from '@/app/components/LoadingPages/VideoListLoading';
import { ShortsRoute, VideoRoute } from '@/app/lib/utils/routeUtils';
import VideosNotFound from '@/app/components/ErrorPages/VideosNotFound';
import ShortsListingLoading from '@/app/components/LoadingPages/ShortsListingLoading';
import ShimmerLoading from '@/app/components/LoadingPages/ShimmerLoading';
import Layout from '@/app/components/Layout';
import axios from 'axios';
import Head from 'next/head';
import { APP_URL } from '@/app/lib/auth/config';
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

function Trending({ responseData, responseData2 }) {


   const metadataBase = new URL(APP_URL || 'https://kbtube.com/');
   const metaData = {
      title: "Trending | KB TuBE",
      keywords: "Trending, KB TuBE",
      description: "Trending KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience.",
      twitterCard: "Trending | KB TuBE",
      canonical: `${metadataBase}trending/`,
      share_image: `${metadataBase}/images/share.png`,
   }



   const [allVideo, setallVideo] = useState([]);

   const [loadingvideos, setloadingvideos] = useState(true);
   const [menu, setMenu] = useState('1');

   const [allVideop, setallVideop] = useState([]);

   const [loadingvideosp, setloadingvideosp] = useState(true);


   const router = useRouter();

   const [photo, setPhoto] = useState('');


   const viewVideo = async (videoId, catid) => {
      await axios.post('user/addView', { 'videoId': videoId });
   };


   const getVideo = async (categoryId, event) => {
      try {
         setMenu(event);
         const response = await fetchAllTrending('user/categoryWiseVideo', { 'categoryId': categoryId });
         if (response.data && response.data.data) {
            setallVideo(response.data.data);
            setPhoto(response.data.data.photo);
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching video categories:', error);
      } finally {
         setloadingvideos(false);
      }


   };

   const fetchVideo = async (videoData) => {
      try {
         setloadingvideos(true); // Set loading to true when starting the fetch
         const response = videoData;
         if (response && response.data) {
            setallVideo(response.data);
            // localStorage.removeItem('searchkey');
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching video categories:', error);
      } finally {
         setloadingvideos(false); // Set loading to false regardless of success or error
      }
   };


   const fetchShortVideo = async (responseData2) => {
      try {
         setloadingvideosp(true); // Set loading to true when starting the fetch

         const response = responseData2;

         console.log('short', response);


         // if (response && response.data) {
         //    setallVideop(response.data);
         //    localStorage.removeItem('searchkey');
         // } else {
         //    console.error('Invalid data structure received from the API:', response.data);
         // }
      } catch (error) {
         console.error('Error fetching video categories:', error);
      } finally {
         setloadingvideosp(false); // Set loading to false regardless of success or error
      }
   };



   useEffect(() => {
      fetchVideo(responseData);
      fetchShortVideo(responseData2);
   }, [responseData, responseData2]); // Run the effect only once on component mount



   const [videoCategories, setVideoCategories] = useState([]);
   const [loadingCategories, setLoadingCategories] = useState(true);

   useEffect(() => {
      // Fetch video categories
      const fetchVideoCategories = async () => {
         try {
            const response = await fetchAllTrending('user/videoCategory');

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

      // fetchVideoCategories();
   }, []);



   const handleMenu = async (event) => {
      setMenu(event);
   }

   return (
      <>
         
         <Layout>
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
                                    onClick={() => fetchVideo()}
                                 >
                                    <span className="icons">
                                       <i className="icon-home"></i>
                                    </span>
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
               <div className='row g-3 row-cols-lg-3 row-cols-xl-4 row-cols-md-2 row-cols-sm-2'>

                  {loadingvideos ? (
                     <VideoListLoading />
                  ) : allVideo.length > 0 ? (
                     allVideo.map((video, index) => (
                        <div key={index} className='col'>
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
                                                         <img src={video.channelIcon} className="rounded-circle img-fluid" alt='Icon' />
                                                      ) : (
                                                         <img src={profilePic} className="rounded-circle img-fluid" alt='Profile' />
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
                  {loadingvideosp ? (
                     <ShortsListingLoading />
                  ) : allVideop.length > 0 ? (
                     allVideop.map((video, index) => (
                        <div key={index} className='col'>
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

         </Layout>

      </>
   )
}




export async function getServerSideProps(context) {
   try {

      // Make a POST request to your API endpoint
      const response = await axios.post("https://shaliniinfo.in/user/allVideo", { searchkey: "" });
      const response2 = await axios.post('https://shaliniinfo.in/user/shortVideo', { searchkey: "" });

      // Extract the response data
      const responseData = response.data;
      const responseData2 = response2.data;

      // Pass the response data as props to the component
      return {
         props: {
            responseData,
            responseData2,
         },
      };
   } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching data:', error.message);

      // Return an empty response or handle the error in your component
      return {
         props: {
            responseData: null,
            responseData2: null,
         },
      };
   }
}


export default Trending
