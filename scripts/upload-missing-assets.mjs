import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const publicDir = join(__dirname, '..', 'public');

// Define files to upload
const filesToUpload = [
  // Website logos
  { file: 'logo.svg', publicId: 'blacro-portfolio/logo' },
  { file: 'logo-scroll.svg', publicId: 'blacro-portfolio/logo-scroll' },
  
  // Cursor images
  { file: 'click.svg', publicId: 'blacro-portfolio/click' },
  { file: 'noclick.svg', publicId: 'blacro-portfolio/noclick' },
  
  // About us image
  { file: 'abouts.jpg', publicId: 'blacro-portfolio/abouts' },
  
  // Marquee logos
  { file: 'beefeater.svg', publicId: 'blacro-portfolio/beefeater' },
  { file: 'youtube.svg', publicId: 'blacro-portfolio/youtube' },
  { file: 'mipcom.svg', publicId: 'blacro-portfolio/mipcom' },
  { file: 'parisblockchain.svg', publicId: 'blacro-portfolio/parisblockchain' },
  { file: 'loreal.svg', publicId: 'blacro-portfolio/loreal' },
  { file: 'london.svg', publicId: 'blacro-portfolio/london' }
];

async function uploadFile(filePath, publicId) {
  try {
    console.log(`📤 Uploading ${filePath}...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: 'auto',
      overwrite: true
    });
    
    console.log(`✅ Uploaded: ${result.public_id}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function uploadAllAssets() {
  console.log('🚀 Starting upload of missing assets to Cloudinary...\n');
  
  let uploadedCount = 0;
  let failedCount = 0;
  
  for (const { file, publicId } of filesToUpload) {
    const filePath = join(publicDir, file);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      failedCount++;
      continue;
    }
    
    const result = await uploadFile(filePath, publicId);
    if (result) {
      uploadedCount++;
    } else {
      failedCount++;
    }
  }
  
  console.log(`\n📊 Upload Summary:`);
  console.log(`✅ Uploaded: ${uploadedCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`📁 Total: ${filesToUpload.length}`);
}

uploadAllAssets();