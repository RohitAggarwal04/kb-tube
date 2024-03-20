import { AuthProvider } from '@/context/AuthContext';

import Head from 'next/head';

import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/App.css";
import "@/public/styles/main.css";
import { APP_URL } from '@/app/lib/auth/config';

function MyApp({ Component, pageProps }) {

    const metadataBase = new URL(APP_URL || 'https://kbtube.com/');

    return (
        <AuthProvider>
            <Head>
                <title>KB TuBE</title>
                <meta name="keywords" content="video, sharing, camera phone, video phone, free, upload" />
                <meta name="description" content="Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on KB TuBE." />

                <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/icons/favicon_32x32.png" sizes="32x32" />
                <link rel="icon" href="/icons/favicon_48x48.png" sizes="48x48" />
                <link rel="icon" href="/icons/favicon_96x96.png" sizes="96x96" />
                <link rel="icon" href="/icons/favicon_144x144.png" sizes="144x144" />

                <meta name="theme-color" content="#24252a" />
                <meta name="author" content="KB TuBE" />
                <meta property="og:site_name" content="KB TuBE" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
