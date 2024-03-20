import React from 'react'
import img1 from '@/public/images/thumnail-1.jpg';
import img2 from '@/public/images/thumnail-2.jpg';
import img3 from '@/public/images/thumnail-3.jpg';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import video1 from '../assets/videos/video-1.mp4';
import { authHttps } from "../AuthUser";




function VideoListing() {
     const http=authHttps();

     
    return (
        <div className='row g-3'>

            <div className='col-lg-4'>
                <div className='video-box-single-v'>
                    <Card >
                        <div className='video-box cursor-pointer'>
                            {/*--<span className='duration-time'>11:11:11</span>--*/}
                            <a href='/watch'>
                                <CardMedia
                                    component="video" 
                                    alt="Video Poster" 
                                    poster={img3} 
                                    className='w-100'
                                    muted
                                >
                                    <source src={video1} className='w-100' type="video/mp4" />
                                </CardMedia>
                            </a>
                        </div>
                        <CardContent>
                            <div className='content-box'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Typography variant="h5" component="div" className='v-tiltle'>
                                            <a href='/watch'>3 Hours of Amazing Nature Scenery & Relaxing Music for Stress Relief.</a>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <a href='/channel' className='channel-name'>My Channel</a>
                                            <a href='/watch' className='views-time'>13M views <span>.</span> 1 year ago</a>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
           



        </div>
    )
};
export default VideoListing