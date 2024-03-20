
import React from "react";
import StaticPage from "@/app/layouts/static";
import Head from 'next/head';

import { APP_URL } from '@/app/lib/auth/config';
function About() {

    const metadataBase = new URL(APP_URL || 'https://kbtube.com/');
    const metaData = {
        title: "About | KB TuBE",
        keywords: "About, KB TuBE",
        description: "About KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience.",
        twitterCard: "About | KB TuBE",
        canonical: `${metadataBase}about/`,
        share_image: `${metadataBase}/images/share.png`,
    }

    return (
        <StaticPage>
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
            <div className='row g-3' >
                <div className="col-lg-12">
                    <h1>KBTube - About</h1>
                    <p>
                        KB TUBE is a cutting-edge video streaming application designed to provide a seamless and engaging content consumption experience. Our primary focus is on empowering content creators and fostering a vibrant community. We have implemented a unique monetization strategy that sets us apart from other video streaming platforms.
                    </p>
                    <p>
                        To unlock monetization features on KB TUBE, creators need to achieve a milestone of 150 subscribers and accumulate 500 watch hours. This approach ensures that creators who are actively building a community and generating meaningful content can start benefiting from their efforts.
                    </p>
                    <p>
                        One standout feature of KB TUBE is our commitment to handling copyright issues responsibly. In the event of a copyright strike, we have a non-punitive approach. Instead of suspending the entire channel, we only remove the specific copyrighted video in question. This approach allows creators to learn from the experience without jeopardizing the entire channel's existence.
                    </p>
                    <p>
                        In terms of revenue sharing, KB TUBE takes pride in offering one of the most favorable arrangements for content creators. We prioritize maximizing the earnings for our creators compared to other video streaming applications. Our revenue-sharing model is designed to reward creators for their hard work and dedication, fostering a mutually beneficial relationship between KB TUBE and its content contributors.
                    </p>
                    <p>
                        As a platform, KB TUBE recognizes the importance of nurturing a supportive and thriving community. We encourage creators to focus on content creation and community engagement while we handle the technical and administrative aspects. By choosing KB TUBE, content creators can look forward to a monetization process that is fair, transparent, and designed to amplify their success in the dynamic world of online content creation. Join KB TUBE today and unlock the full potential of your creative journey.
                    </p>
                </div>
            </div>
        </StaticPage>
    )
}

export default About