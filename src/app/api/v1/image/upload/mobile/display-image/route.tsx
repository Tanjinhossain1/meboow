// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(process.cwd(), 'public', 'mobiles',"display", 'images');

// Ensure the upload directory exists
const ensureUploadDirExists = async () => {
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export async function POST(req: NextRequest) {
  // Ensure the upload directory exists
  await ensureUploadDirExists();

  const formData = await req.formData();

  // Get the files from the formData
  const files = formData.getAll('file') as File[];

  if (files.length === 0) {
    return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
  }

  const file = files[0];

  // Generate a unique filename
  const uniqueFileName = `${uuidv4()}_${file.name}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  // Read the file data and save it to the disk
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/mobiles/display/images/${uniqueFileName}`;

  return NextResponse.json({ success: 1, file: { url: imageUrl } });
}
