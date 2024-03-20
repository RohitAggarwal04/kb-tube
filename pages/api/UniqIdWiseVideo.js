import axios from 'axios';
import { apiUrl } from "@/app/lib/utils/routeUtils";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { uniqId } = req.body;

            const response = await axios.post(`${apiUrl}/user/UniqIdWiseVideo`, { 'uniqId': uniqId });
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