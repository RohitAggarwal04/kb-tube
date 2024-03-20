"use server"

// pages/authUser.js
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/app/lib/utils/routeUtils";
import { cookies } from 'next/headers';

const getToken = async () => {
    try {
        const tokenString = cookies().get('token')?.value;

        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken;
        } else {
            // Handle the case where the token is not present
            return null;
        }
    } catch (error) {
        console.error('Error parsing token:', error);
        // Handle the case where the token cannot be parsed
        return null;
    }
};


const getUser = async () => {
    const userString = cookies().get('user')?.value;
    const user_details = userString ? JSON.parse(userString) : null;
    return user_details;
};



const reactBaseUrl = () => {
    return "http://localhost:3300/";
};

const logOut = async () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
};

const checkLogin = async () => {
    // You can use useRouter for navigation in Next.js
    // const router = useRouter();
    // const userToken = await getToken();
    // if(!userToken){
    //     router.push("/login");
    // }
};

const https = async () => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            "content-type": "application/json",
        },
    });
};

const authHttps = async  () => {
    const userToken = await getToken();

    return axios.create({
        baseURL: apiUrl,
        headers: {
            "content-type": "application/json",
            authorization: userToken,
        },
    });
};


export default async function AuthUser() {
    const router = useRouter();

    const token = await getToken();
    const user = await getUser();

    useEffect(() => {
        const tokenRefreshInterval = setInterval(async () => {
            // Check if the token is present and refresh it if needed
            const currentToken = getToken();
            if (currentToken) {
                try {
                    const refreshedToken = await refreshAccessToken(currentToken);
                    saveToken(user, refreshedToken);
                } catch (error) {
                    // Handle token refresh error (e.g., redirect to login)
                    router.push("/login");
                }
            }
        }, 60 * 60 * 1000); // Refresh token every hour

        return () => clearInterval(tokenRefreshInterval);
    }, [user]);

    const saveToken = (user, token) => {
        cookies().set('token', JSON.stringify(token), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });
        cookies().set('user', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

    };

    // ... (other functions remain unchanged)

    return {
        setToken: saveToken,
        token,
        user,
        reactBaseUrl,
        authHttps,
    };
}

export { getToken, getUser, logOut, https, checkLogin, authHttps, saveToken };

async function refreshAccessToken(currentToken) {
    const response = await https.post(`user/refresh-token`, { currentToken });
    return response.data.newToken;
}
