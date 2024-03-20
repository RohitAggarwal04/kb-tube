import axios from 'axios';
import { apiUrl } from "@/app/lib/utils/routeUtils";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
           
            const {
                name,
                emails,
                phone,
                password1,
                password2,
            } = req.body;

            const response = await axios.post(`${apiUrl}/user/register`, {
                full_name: name,
                email: emails,
                phone: phone,
                password: password1,
                confirm_password: password2,
                photo: '',
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