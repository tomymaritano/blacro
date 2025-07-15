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

// Define the reorganization mapping
const reorganizationMap = [
  // Brand assets
  { from: 'blacro-portfolio/logo', to: 'blacro-portfolio/brand/logo' },
  { from: 'blacro-portfolio/logo-scroll', to: 'blacro-portfolio/brand/logo-scroll' },
  { from: 'blacro-portfolio/abouts', to: 'blacro-portfolio/brand/about-image' },
  
  // UI elements
  { from: 'blacro-portfolio/click', to: 'blacro-portfolio/ui/cursor-click' },
  { from: 'blacro-portfolio/noclick', to: 'blacro-portfolio/ui/cursor-default' },
  
  // Client logos (marquee)
  { from: 'blacro-portfolio/beefeater', to: 'blacro-portfolio/clients/beefeater' },
  { from: 'blacro-portfolio/youtube', to: 'blacro-portfolio/clients/youtube' },
  { from: 'blacro-portfolio/mipcom', to: 'blacro-portfolio/clients/mipcom' },
  { from: 'blacro-portfolio/parisblockchain', to: 'blacro-portfolio/clients/parisblockchain' },
  { from: 'blacro-portfolio/loreal', to: 'blacro-portfolio/clients/loreal' },
  { from: 'blacro-portfolio/london', to: 'blacro-portfolio/clients/london' },
  
  // Project covers (main grid)
  { from: 'blacro-portfolio/main/isolla', to: 'blacro-portfolio/projects/covers/isolla' },
  { from: 'blacro-portfolio/main/london fashion week', to: 'blacro-portfolio/projects/covers/london-fashion-week' },
  { from: 'blacro-portfolio/main/myrica', to: 'blacro-portfolio/projects/covers/myrica' },
  { from: 'blacro-portfolio/main/private limo', to: 'blacro-portfolio/projects/covers/private-limo' },
  { from: 'blacro-portfolio/main/the next gen of', to: 'blacro-portfolio/projects/covers/unicoin-nextgen' },
  { from: 'blacro-portfolio/main/youtube', to: 'blacro-portfolio/projects/covers/youtube-cdmx' },
  
  // Project logos
  { from: 'blacro-portfolio/main/logos/isolla', to: 'blacro-portfolio/projects/logos/isolla' },
  { from: 'blacro-portfolio/main/logos/london', to: 'blacro-portfolio/projects/logos/london' },
  { from: 'blacro-portfolio/main/logos/myrica', to: 'blacro-portfolio/projects/logos/myrica' },
  { from: 'blacro-portfolio/main/logos/private', to: 'blacro-portfolio/projects/logos/private' },
  { from: 'blacro-portfolio/main/logos/unicoin', to: 'blacro-portfolio/projects/logos/unicoin' },
  { from: 'blacro-portfolio/main/logos/youtube', to: 'blacro-portfolio/projects/logos/youtube' }
];

// Project galleries reorganization
const projectGalleries = [
  // Unicoin Everywhere
  { pattern: 'blacro-portfolio/unicoin/unicoineverywhere/', newFolder: 'blacro-portfolio/projects/unicoin/everywhere/' },
  
  // Unicoin Campaign
  { pattern: 'blacro-portfolio/unicoin/campaign-', newFolder: 'blacro-portfolio/projects/unicoin/campaign/' },
  
  // Unicoin NextGen
  { pattern: 'blacro-portfolio/unicoin/thenextgenofcrypto/', newFolder: 'blacro-portfolio/projects/unicoin/nextgen/' },
  
  // Private Limo
  { pattern: 'blacro-portfolio/privatelimo/', newFolder: 'blacro-portfolio/projects/private-limo/' },
  
  // London Fashion Week  
  { pattern: 'blacro-portfolio/londonfashionweek/', newFolder: 'blacro-portfolio/projects/london-fashion-week/' },
  
  // Myrica
  { pattern: 'blacro-portfolio/myrica/', newFolder: 'blacro-portfolio/projects/myrica/' },
  
  // Isolla
  { pattern: 'blacro-portfolio/isolla/', newFolder: 'blacro-portfolio/projects/isolla/' },
  
  // YouTube CDMX
  { pattern: 'blacro-portfolio/youtube/', newFolder: 'blacro-portfolio/projects/youtube-cdmx/' }
];

async function renameResource(from, to, resourceType = 'image') {
  try {
    console.log(`📂 Moving: ${from} → ${to}`);
    
    await cloudinary.uploader.rename(from, to, {
      resource_type: resourceType,
      overwrite: false
    });
    
    console.log(`✅ Moved: ${to}`);
    return true;
  } catch (error) {
    if (error.http_code === 404) {
      console.log(`⚠️  Not found: ${from}`);
    } else {
      console.error(`❌ Failed to move ${from}:`, error.message);
    }
    return false;
  }
}

async function reorganizeCloudinary() {
  console.log('🚀 Starting Cloudinary reorganization...\n');
  
  let movedCount = 0;
  let failedCount = 0;
  
  // Step 1: Move direct mappings
  console.log('📁 Step 1: Moving direct assets...');
  for (const { from, to } of reorganizationMap) {
    const success = await renameResource(from, to);
    if (success) {
      movedCount++;
    } else {
      failedCount++;
    }
  }
  
  console.log('\\n📁 Step 2: Getting all resources for project galleries...');
  
  try {
    // Get all resources to reorganize project galleries
    const allResources = await cloudinary.search
      .expression('folder:blacro-portfolio')
      .max_results(500)
      .execute();
    
    console.log(`Found ${allResources.resources.length} resources to check...\\n`);
    
    // Step 2: Move project galleries
    console.log('📁 Step 3: Moving project gallery images...');
    for (const resource of allResources.resources) {
      const publicId = resource.public_id;
      
      // Check each project pattern
      for (const { pattern, newFolder } of projectGalleries) {
        if (publicId.includes(pattern)) {
          // Extract the filename part
          const fileName = publicId.replace(pattern, '');
          const newPublicId = `${newFolder}${fileName}`;
          
          // Skip if already in correct location
          if (publicId === newPublicId) continue;
          
          const success = await renameResource(publicId, newPublicId);
          if (success) {
            movedCount++;
          } else {
            failedCount++;
          }
          break; // Found a match, don't check other patterns
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error getting resources:', error.message);
  }
  
  console.log(`\\n📊 Reorganization Summary:`);
  console.log(`✅ Moved: ${movedCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`📁 Total processed: ${movedCount + failedCount}`);
  
  console.log('\\n🎉 Reorganization complete!');
  console.log('\\n📝 Next steps:');
  console.log('1. Update all code references to use new paths');
  console.log('2. Test that all images load correctly');
  console.log('3. Remove old empty folders if needed');
}

reorganizeCloudinary();