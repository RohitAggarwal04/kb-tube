import axios from 'axios';
import { apiUrl } from "@/app/lib/utils/routeUtils";
import { cookies } from 'next/headers';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            let token = null;
            const tokenString = cookies().get('token')?.value;

            if (tokenString) {
                token = JSON.parse(tokenString);
            }

            const response = await axios.post(`${apiUrl}/user/getUser`, {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            const responseData = response.data;

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