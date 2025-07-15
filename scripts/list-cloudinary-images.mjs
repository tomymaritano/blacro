import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

async function listCloudinaryImages() {
  try {
    console.log('🔍 Listing images in blacro-portfolio folder...\n');
    console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log('API key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
    console.log('API secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
    
    // List resources in the blacro-portfolio folder
    const result = await cloudinary.search
      .expression('folder:blacro-portfolio')
      .max_results(100)
      .execute();

    if (result.resources.length === 0) {
      console.log('❌ No images found in blacro-portfolio folder');
      
      // Try listing all resources to see what's available
      console.log('\n🔍 Listing all available resources...\n');
      const allResources = await cloudinary.search
        .max_results(50)
        .execute();
        
      allResources.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`);
      });
      
      return;
    }

    console.log(`✅ Found ${result.resources.length} images:\n`);
    
    result.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing images:', error);
  }
}

listCloudinaryImages();