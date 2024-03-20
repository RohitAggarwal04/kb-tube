// layout.js
import React from 'react';
import { APP_URL } from '@/app/lib/auth/config';

export const metadata = {
    metadataBase: new URL(APP_URL || 'https://kbtube.com/'),
    title: {
        template: '%s | KB TuBE',
        default: 'KB TuBE', // a default is required when creating a template
    },
    description: {
        template: '%s',
        default: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on KB TuBE.",
    },
    favicon: "/icons/favicon.ico",
    shareImage: {
        template: '%s',
        default: '/images/share.png', // a default is required when creating a template
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: {
            template: '%s | KB TuBE',
            default: 'KB TuBE', // a default is required when creating a template
        },
        description: {
            template: '%s',
            default: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on KB TuBE.",
        },
        siteName: "KB TuBE",
        images: '/images/share.png',
        card: "Test",
    },
    // Other common metadata fields
};

import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="author" content="KB TuBE" />

                <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/icons/favicon_32x32.png" sizes="32x32" />
                <link rel="icon" href="/icons/favicon_48x48.png" sizes="48x48" />
                <link rel="icon" href="/icons/favicon_96x96.png" sizes="96x96" />
                <link rel="icon" href="/icons/favicon_144x144.png" sizes="144x144" />
                <meta name="keywords" content="video, sharing, camera phone, video phone, free, upload" />
                <meta name="theme-color" content="#24252a" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="/styles/main.css"  />

            </head>
            <body>
                {children}
            </body>
        </html>
    );
}