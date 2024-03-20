import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


function TagsSec() {
    return (

        <>
            <section className="tags-sec">
                <div className="tag-btns">

                    <Swiper navigation={true} modules={[Navigation]} className="tag-btns-swiper"
                        spaceBetween={10}
                        breakpoints={{
                            360: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                            1200: {
                                slidesPerView: 7,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="tag-single ">
                                All
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend Tech
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend Software
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend App
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Mobile
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend Tech
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend Software
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Trend App
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="tag-single">
                                Mobile
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </section>

        </>

    );

};
export default TagsSec