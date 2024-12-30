import { v2 as cloudinary } from 'cloudinary';
import connectDB from '../../mongodb/connect.js';
import Post from '../../mongodb/models/post.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://2-ai-image-web.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectDB(process.env.MONGODB_URL);

  if (req.method === 'GET') {
    try {
      const posts = await Post.find({});
      return res.status(200).json({ success: true, data: posts });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });

      return res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
