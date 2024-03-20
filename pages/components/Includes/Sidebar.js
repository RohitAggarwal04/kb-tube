// 'use client'

import React from 'react';
import Link from 'next/link';
import { Subscriptions, AccountBoxOutlined, Home, Whatshot, Tag } from "@mui/icons-material";
import { StaticPageLinks } from './components/StaticPageLinks';
import { ExploreLinks } from './components/ExploreLinks';
import { YouLinks } from './components/YouLinks';
import { HomeLinks } from './components/HomeLinks';

function Sidebar({ channel, userData }) {


  return (
    <div className="popular__events__left">
      
      <HomeLinks userData={userData} />

      <YouLinks userData={userData} channel={channel} />

      <ExploreLinks />

      <StaticPageLinks />

    </div>



  )
}

export default Sidebar