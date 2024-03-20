import React from 'react';
import Sidebar from '../components/Includes/Sidebar';
import Header from '../components/Includes/Header';
import Footer from '../components/Includes/Footer';

const StaticPage = ({ children, withoutSideBar }) => {
    return (
        <>
            <div className="left__site__section">
                <Header />
                <div className="popular__events__body">
                    <div className="container-fluid p-0">
                        {
                            withoutSideBar ?
                                <div className="row g-0">
                                    <div className="col-xxl-12">
                                        <div className="p-3">
                                            <div className="container">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row g-0">
                                    <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
                                        <Sidebar />
                                    </div>
                                    <div className="col-xxl-10 col-xl-9 col-lg-9">
                                        <div className="p-3">
                                            <div className="container">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default StaticPage;