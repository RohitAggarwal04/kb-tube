import axios from 'axios';
import { apiUrl } from "@/app/lib/utils/routeUtils";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                email,
                password,
                otp,
            } = req.body;

            const response = await axios.post(`${apiUrl}/user/login`, {
                email: email,
                password: password,
                otp: otp,
            });
            const responseData = response.data;

            if (responseData && responseData.success && responseData.success === 1) {
                res.setHeader('Set-Cookie', `_kbData=${JSON.stringify(responseData)}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Strict`);
            }


            // Send the data as the response
            res.status(200).json(responseData);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to fetch data from the third-party API' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}