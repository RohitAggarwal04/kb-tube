// 'use client'

import React from 'react';
import Link from 'next/link';
import { Subscriptions, AccountBoxOutlined, Home, Whatshot, Tag } from "@mui/icons-material";
import { StaticPageLinks } from '@/pages/components/Includes/components/StaticPageLinks';
import { ExploreLinks } from '@/pages/components/Includes/components/ExploreLinks';
import { HomeLinks } from '@/pages/components/Includes/components/HomeLinks';
import { YouLinks } from '@/pages/components/Includes/components/YouLinks';

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