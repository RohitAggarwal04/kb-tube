import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../Components/Includes/Sidebar';
import profilePic from "../@/public/images/profile-pic.jpg";
import { authHttps } from "../../auth/AuthUser";
import Link from 'next/link';
import { getToken } from "../../auth/AuthUser";

function SubscriptionChannels() {
    const http = authHttps();
    let token = getToken();

    const [allChannels, setallChannels] = useState([]);
    const [loadingvideos, setloadingvideos] = useState(true);
    const [subs, setSubs] = useState({});

    const navigate = useRouter();



    const fetchChannels = async () => {
        try {
            setloadingvideos(true); // Set loading to true when starting the fetch

            const response = await fetchAll('user/idWiseSubscribChannel');
            if (response.data && response.data.data) {
                setallChannels(response.data.data);
                console.log(response.data.data);
            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingvideos(false); // Set loading to false regardless of success or error
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []); // Run the effect only once on component mount



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


    const addSubscriber = async (chanelId) => {
        // console.log(chanelId);
        const response = await fetchAll('user/addSubscriber', { 'chanelId': chanelId });
        checksubscrive(chanelId);
    };


    const removeSubscriber = async (chanelId) => {
        const response = await fetchAll('user/removeSubscriber', { 'chanelId': chanelId });
        checksubscrive(chanelId);
    };


    const checksubscrive = async (chanelId) => {
        try {
            const response = await fetchAll('user/checkSubscriber', { 'chanelId': chanelId });
            //console.log('checksubs',response);
            if (response.data && response.data.status === 1) {


                setItemById2(chanelId, true);

            } else {
                setItemById2(chanelId, false);
            }
        } catch (error) {
            setItemById2(chanelId, false);
        }
    };


    return (
        <>
            <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
                <Sidebar />
            </div>
            <div className="col-xxl-10 col-xl-9 col-lg-9">

                <div className="main__body__wrap left__right__space pb-60 pt-20">
                    <div className='row g-3'>

                        {loadingvideos ? (
                            <p>Loading Channels...</p>
                        ) : allChannels.length > 0 ? (
                            allChannels.map((channel, index) => (

                                <div className='col-12 col-lg-12 d-flex'>

                                    <div className='channel-item'>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <div className='channel-thumb'>

                                                    <div className='channel-thumbnail'>

                                                        {
                                                            channel.photo ? (
                                                                <img src={channel.photo} className="rounded-circle  img-fluid" />
                                                            ) : (
                                                                <img src={profilePic} className="rounded-circle  img-fluid" />
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-5'>
                                                <div className='channel-data'>
                                                    <h2><a href='#' className='channel-name mb-0'>{channel.name ? channel.name : 'Channel name'}</a></h2>
                                                    <p><a href='#' className='views-time'><small> {channel.url} {channel.subscriber ? channel.subscriber : '0'} subscribers</small></a></p>
                                                    <p>
                                                        {channel.description}
                                                    </p>

                                                </div>

                                            </div>
                                            <div className='col-3'>
                                                <div className='channel-data p-0'>
                                                    {token ? (
                                                        (getItemById2(channel.channelId) || channel.subscriber) ? (
                                                            <div className="dropdown">
                                                                <Link href="#" className="d-block caret-none  btn btn-gray text-light w-100 rounded-5 px-3 text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="bi bi-bell"></i>   Subscribed <i className="bi bi-chevron-down"></i>
                                                                </Link>
                                                                <ul className="dropdown-menu">
                                                                    <li><Link className="dropdown-item" href="/login"><i className="bi bi-bell-fill me-3"></i>All</Link></li>
                                                                    {/* <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-bell"></i> Personalized</Link></li>
                                                                                <li><Link className="dropdown-item" href="/login"><i className="bi bi-bell-slash me-3"></i> None</Link></li> */}
                                                                    <li><Link className="dropdown-item" href="#" onClick={() => removeSubscriber(channel.chanelId)}><i className="bi bi-person-dash-fill me-3"></i> Unsubscribe</Link></li>
                                                                </ul>
                                                            </div>

                                                        ) : (
                                                            <button type='button' onClick={() => addSubscriber(channel.chanelId)} className='btn btn-gray text-light rounded-5 px-4'> <small>Subscribe</small></button>
                                                        )

                                                    ) : (
                                                        <Link href="/login" className='btn btn-gray text-light rounded-5 px-4'> <small>Subscribe</small></Link>
                                                    )
                                                    }
                                                </div>
                                            </div>




                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No Subscriptions available.</p>
                        )}


                    </div>

                </div>
            </div>

        </>
    )
}
export default SubscriptionChannels
