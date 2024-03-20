import React from 'react'
import img1 from '@/public/images/thumnail-1.jpg';
import img2 from '@/public/images/thumnail-2.jpg';
import img3 from '@/public/images/thumnail-3.jpg';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import video1 from '../assets/videos/video-1.mp4';

function VideoListingWatch() {
    return (
        <div className='row'>

            <div className='col-lg-12'>
                 <div className='video-box-single-h'>
                    <Card >
                
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img1}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img3}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div> 
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img2}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img1}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div> 
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img2}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img1}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div> 
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img2}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* video-box-single-h end */}
                <div className='video-box-single-h'>
                    <Card >
                        <CardContent>
                            <div className='row g-2'>
                                <div className='col-5'>
                                    <a  href="/watch" className='video-box'>
                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                        <video  className='w-100' poster={img1}>
                                            <source src={video1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </a>
                                </div>
                                <div className='col-7'>
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
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div> 
                {/* video-box-single-h end */}

           
            </div>
        </div>
    )
};
export default VideoListingWatch