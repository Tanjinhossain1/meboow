// pages/api/v1/image/upload.js

import fs from 'fs';
import path from 'path'; 
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const uploadDir = path.join(process.cwd(), 'public', `${process.env.IMAGES_FILE_DIRECTORY}`,'uploads', 'images');

// Ensure the upload directory exists
const ensureUploadDirExists = async () => {
  try {
    await fs.promises.access(uploadDir);
  } catch (error) {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  }
};

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js built-in bodyParser
//   },
// };

export async function POST(req: NextRequest) {
  await ensureUploadDirExists();

  const {url} = await req.json()
    console.log(url)
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }
//   return NextResponse.json({ success: 'done' }, { status: 200 });
  try {
    // Fetch the image from the provided URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    // Generate a unique filename
    const fileName = `${uuidv4()}_${path.basename(url)}`;
    const filePath = path.join(uploadDir, fileName);

    // Write the image data to the file
    await fs.promises.writeFile(filePath, response.data);

    const imageUrl = `/${process.env.IMAGES_FILE_DIRECTORY}/uploads/images/${fileName}`;

    return NextResponse.json({ success: 1, file: { url: imageUrl } });
  } catch (error) {
    console.error('Error downloading or saving image:', error);
    return NextResponse.json({ error: 'Failed to download or save image' }, { status: 500 });
  }
}
