export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let user = null;
            const tokenString = req.cookies._kbData;
            if (tokenString) {
                user = JSON.parse(tokenString);
            }

            // Respond with a success message or any data you want
            res.status(200).json({ user: user });
        } catch (error) {
            // Handle errors if any
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to set authentication token' });
        }
    } else {
        // Handle method not allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
