// import { writeFile } from "fs/promises";
// import { revalidatePath, unstable_noStore } from "next/cache";
// import { NextRequest,NextResponse} from "next/server";


// export async function POST(req:NextRequest) {
//   unstable_noStore()
//   const data = await req.formData();
//   const file:any = data.get('file');
//   if(!file) {
//     return NextResponse.json({ message: 'No file provided', success: false });
//   }
//   const byteData = await file.arrayBuffer();
//   const buffer = Buffer.from(byteData);
//   const path = `./public/${file.name}`
//   await writeFile(path,buffer)
//   revalidatePath('/')
//   return NextResponse.json({ success: 1, file: { url: `${file.name}` } });
// }

// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 
import { revalidatePath, unstable_noStore } from 'next/cache';

const uploadDir = path.join(process.cwd(), 'public',`${process.env.IMAGES_FILE_DIRECTORY}`, 'articles', 'images');

// Ensure the upload directory exists
const ensureUploadDirExists = async () => {
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export async function POST(req: NextRequest) {
  unstable_noStore()
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

  // const imageUrl = `/articles/images/${uniqueFileName}`;

  const imageUrl = `/${process.env.IMAGES_FILE_DIRECTORY}/articles/images/${uniqueFileName}`;
  revalidatePath('/')
  return NextResponse.json({ success: 1, file: { url: imageUrl } });
}
