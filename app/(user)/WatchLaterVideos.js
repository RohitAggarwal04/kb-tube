import React from 'react'
import Sidebar from '../Components/Includes/Sidebar'
import img1 from '../@/public/images/thumnail-1.jpg';
import img2 from '../@/public/images/thumnail-2.jpg';
import img3 from '../@/public/images/thumnail-3.jpg';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import video1 from '../../assets/videos/video-1.mp4';

function WatchLaterVideos() {
    return (
        <>
            <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
                <Sidebar />
            </div>
            <div className="col-xxl-10 col-xl-9 col-lg-9">
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='video-box-single-h with-action p-3 rounded-4' style={{background: 'linear-gradient(rgb(129 107 63 / 87%) 0%, rgb(89 79 59 / 62%) 33%, rgb(145 110 42 / 86%) 100%)'}}>
                                <Card className='shadow-none bg-transparent'>
                                    <Link href='#' className=' d-block'>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={img3}
                                            title="green iguana"
                                            className='rounded-4 mb-4 liked-img-box'
                                        />
                                    </Link>

                                    <CardContent>

                                        <Typography gutterBottom variant="h5" component="div">
                                            <h3 className='text-white'>Watch Later</h3>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <h5 className='text-white'>Channel</h5>
                                        </Typography>
                                        <Typography variant="body2" color="text.light">
                                            <div className="text-light my-3">
                                                2 videos No views Updated today
                                            </div>
                                        </Typography>
                                        <Typography variant="body2" color="text.light">
                                            <div className="text-start my-3 d-flex justify-content-start">
                                                <Link href="/shorts" className="rounded-box-shorts btn btn-dark text-light m-0"><i className="bi bi-download"></i></Link>
                                                <Link href="/shorts" className="rounded-box-shorts btn btn-light ms-2" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></Link>
                                                       
                                                        <ul className="dropdown-menu ">
                                                            <li><Link className="dropdown-item" href="/login">Download</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Share</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Profile</Link></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Link className="dropdown-item" href="#">Remove Video</Link></li>
                                                        </ul>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                    <CardActions className='d-block mt-5'>
                                        <div className='row g-2 '>
                                            <div className='col-6'>
                                                <Link href='#' className='btn btn-light rounded-5 px-4 text-dark text-normal w-100 d-block'><i className='bi bi-play'></i> Play all</Link>
                                            </div>
                                            <div className='col-6'>
                                                <Link href='#' className='btn btn-dark rounded-5 px-4 text-light text-normal w-100 d-block'><i className="bi bi-shuffle"></i> Shuffle</Link>
                                            </div>
                                        </div>
                                    </CardActions>
                                </Card>
                            </div>
                            {/* repeat */}
                        </div>
                        <div className='col-lg-7'>
                                <div className="dropdown ms-3 text-black mb-3">
                                        <Link href="#" className="caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <strong> <i className="bi bi-filter-left"></i> Sort By</strong>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="/login">Top Comments</Link></li>
                                            <li><Link className="dropdown-item" href="/login"> Newest First</Link></li>
                                        </ul>
                                    </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>=</div>
                                <div className='video-box-single-h with-action mb-3'>
                                    <Card >
                                        <CardContent>
                                            <div className='row g-2'>
                                                <div className='col-4'>
                                                    <Link href="/watch" className='video-box'>
                                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                                        <video className='w-100' poster={img1}>
                                                            <source src={video1} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </Link>
                                                </div>
                                                <div className='col-7'>
                                                    <div className='content-box'>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <Typography variant="h5" component="div" className='v-tiltle'>
                                                                    <Link href='/watch'>3 Hours of Amazing Nature Scenery & Relaxing Music for Stress Relief.</Link>
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <Link href='/channel' className='channel-name'>My Channel</Link>
                                                                    <Link href='/watch' className='views-time'>13M views <span>.</span> 1 year ago</Link>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-1'>
                                                    <div className="dropdown text-end">
                                                    <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                           <i className="bi bi-three-dots-vertical" ></i>
                                                        </Link>
                                                        <ul className="dropdown-menu ">
                                                            <li><Link className="dropdown-item" href="/login">Download</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Share</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Profile</Link></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Link className="dropdown-item" href="#">Remove Video</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            {/* repeat */}
                            <div className='d-flex align-items-center gap-2'>
                                <div>=</div>
                                <div className='video-box-single-h with-action mb-3'>
                                    <Card >
                                        <CardContent>
                                            <div className='row g-2'>
                                                <div className='col-4'>
                                                    <Link href="/watch" className='video-box'>
                                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                                        <video className='w-100' poster={img2}>
                                                            <source src={video1} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </Link>
                                                </div>
                                                <div className='col-7'>
                                                    <div className='content-box'>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <Typography variant="h5" component="div" className='v-tiltle'>
                                                                    <Link href='/watch'>3 Hours of Amazing Nature Scenery & Relaxing Music for Stress Relief.</Link>
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <Link href='/channel' className='channel-name'>My Channel</Link>
                                                                    <Link href='/watch' className='views-time'>13M views <span>.</span> 1 year ago</Link>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-1'>
                                                    <div className="dropdown text-end">
                                                    <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                           <i className="bi bi-three-dots-vertical" ></i>
                                                        </Link>
                                                        <ul className="dropdown-menu ">
                                                            <li><Link className="dropdown-item" href="/login">Download</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Share</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Profile</Link></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Link className="dropdown-item" href="#">Remove Video</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            {/* repeat */}
                            <div className='d-flex align-items-center gap-2'>
                                <div>=</div>
                                <div className='video-box-single-h with-action mb-3'>
                                    <Card >
                                        <CardContent>
                                            <div className='row g-2'>
                                                <div className='col-4'>
                                                    <Link href="/watch" className='video-box'>
                                                        {/*--<span className='duration-time'>11:11:11</span>--*/}
                                                        <video className='w-100' poster={img3}>
                                                            <source src={video1} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </Link>
                                                </div>
                                                <div className='col-7'>
                                                    <div className='content-box'>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <Typography variant="h5" component="div" className='v-tiltle'>
                                                                    <Link href='/watch'>3 Hours of Amazing Nature Scenery & Relaxing Music for Stress Relief.</Link>
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <Link href='/channel' className='channel-name'>My Channel</Link>
                                                                    <Link href='/watch' className='views-time'>13M views <span>.</span> 1 year ago</Link>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-1'>
                                                    <div className="dropdown text-end">
                                                        <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                           <i className="bi bi-three-dots-vertical" ></i>
                                                        </Link>
                                                        <ul className="dropdown-menu ">
                                                            <li><Link className="dropdown-item" href="/login">Download</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Share</Link></li>
                                                            <li><Link className="dropdown-item" href="#">Profile</Link></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Link className="dropdown-item" href="#">Remove Video</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            {/* repeat */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WatchLaterVideos