import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is uncommented and configured
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://2-ai-image-web.vercel.app'); // Allow your frontend's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Handle GET request
    return res.status(200).json({ message: 'Hello from DALL-E!' });
  } else if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });

      const image = aiResponse.data.data[0].b64_json;
      return res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
