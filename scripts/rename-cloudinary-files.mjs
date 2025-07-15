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

// Define comprehensive renaming mapping
const renamingMap = [
  // === BRAND ASSETS ===
  { from: 'blacro-portfolio/brand/logo', to: 'blacro-portfolio/brand/blacro-logo' },
  { from: 'blacro-portfolio/brand/logo-scroll', to: 'blacro-portfolio/brand/blacro-logo-animated' },
  { from: 'blacro-portfolio/brand/about-image', to: 'blacro-portfolio/brand/founders-photo' },
  
  // === UI ELEMENTS ===
  { from: 'blacro-portfolio/ui/cursor-click', to: 'blacro-portfolio/ui/cursor-active' },
  { from: 'blacro-portfolio/ui/cursor-default', to: 'blacro-portfolio/ui/cursor-idle' },
  
  // === PRIVATE LIMO PROJECT ===
  { from: 'blacro-portfolio/projects/private-limo/1', to: 'blacro-portfolio/projects/private-limo/cover-animation' },
  { from: 'blacro-portfolio/projects/private-limo/2', to: 'blacro-portfolio/projects/private-limo/logo-design-01' },
  { from: 'blacro-portfolio/projects/private-limo/3', to: 'blacro-portfolio/projects/private-limo/logo-design-02' },
  { from: 'blacro-portfolio/projects/private-limo/4', to: 'blacro-portfolio/projects/private-limo/logo-animation' },
  { from: 'blacro-portfolio/projects/private-limo/5', to: 'blacro-portfolio/projects/private-limo/brand-application-01' },
  { from: 'blacro-portfolio/projects/private-limo/6', to: 'blacro-portfolio/projects/private-limo/brand-application-02' },
  { from: 'blacro-portfolio/projects/private-limo/7', to: 'blacro-portfolio/projects/private-limo/brand-application-03' },
  { from: 'blacro-portfolio/projects/private-limo/8', to: 'blacro-portfolio/projects/private-limo/brand-application-04' },
  { from: 'blacro-portfolio/projects/private-limo/9', to: 'blacro-portfolio/projects/private-limo/brand-application-05' },
  { from: 'blacro-portfolio/projects/private-limo/10', to: 'blacro-portfolio/projects/private-limo/brand-application-06' },
  { from: 'blacro-portfolio/projects/private-limo/11', to: 'blacro-portfolio/projects/private-limo/brand-application-07' },
  { from: 'blacro-portfolio/projects/private-limo/12', to: 'blacro-portfolio/projects/private-limo/brand-application-08' },
  { from: 'blacro-portfolio/projects/private-limo/13', to: 'blacro-portfolio/projects/private-limo/brand-application-09' },
  { from: 'blacro-portfolio/projects/private-limo/14', to: 'blacro-portfolio/projects/private-limo/brand-application-10' },
  
  // === UNICOIN EVERYWHERE ===
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-01', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-01' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-02', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-02' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-03', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-03' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-04', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-04' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-05', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-05' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-06', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-06' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-07', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-07' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-08', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-08' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-09', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-09' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-10', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-10' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-11', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-11' },
  { from: 'blacro-portfolio/projects/unicoin/everywhere/unicoin-everywhere-12', to: 'blacro-portfolio/projects/unicoin/everywhere/campaign-visual-12' },
  
  // === UNICOIN NEXTGEN ===
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-01', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-01' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-02', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-02' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-03', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-03' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-04', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-04' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-05', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-05' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-06', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-06' },
  { from: 'blacro-portfolio/projects/unicoin/nextgen/unicoin-nextgen-07', to: 'blacro-portfolio/projects/unicoin/nextgen/campaign-07' },
  
  // === UNICOIN CAMPAIGN ===
  { from: 'blacro-portfolio/projects/unicoin/campaign/01', to: 'blacro-portfolio/projects/unicoin/campaign/creative-01' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/02', to: 'blacro-portfolio/projects/unicoin/campaign/creative-02' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/03', to: 'blacro-portfolio/projects/unicoin/campaign/creative-03' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/04', to: 'blacro-portfolio/projects/unicoin/campaign/creative-04' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/05', to: 'blacro-portfolio/projects/unicoin/campaign/creative-05' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/06', to: 'blacro-portfolio/projects/unicoin/campaign/creative-06' },
  { from: 'blacro-portfolio/projects/unicoin/campaign/07', to: 'blacro-portfolio/projects/unicoin/campaign/creative-07' },
  
  // === YOUTUBE CDMX ===
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-cover', to: 'blacro-portfolio/projects/youtube-cdmx/event-cover' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-01', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-01' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-02', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-02' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-03', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-03' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-04', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-04' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-05', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-05' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-06', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-06' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-07', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-07' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-08', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-08' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-09', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-09' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-10', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-10' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-11', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-11' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-12', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-12' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-13', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-13' },
  { from: 'blacro-portfolio/projects/youtube-cdmx/youtube-14', to: 'blacro-portfolio/projects/youtube-cdmx/event-photo-14' },
  
  // === MYRICA GIN ===
  { from: 'blacro-portfolio/projects/myrica/myricacover', to: 'blacro-portfolio/projects/myrica/project-cover' },
  { from: 'blacro-portfolio/projects/myrica/myrica', to: 'blacro-portfolio/projects/myrica/logo-design' },
  { from: 'blacro-portfolio/projects/myrica/myricagif', to: 'blacro-portfolio/projects/myrica/logo-animation' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-bottle-01', to: 'blacro-portfolio/projects/myrica/product-photography-01' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-bottle-02', to: 'blacro-portfolio/projects/myrica/product-photography-02' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-bottle-03', to: 'blacro-portfolio/projects/myrica/product-photography-03' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-bottle-04', to: 'blacro-portfolio/projects/myrica/product-photography-04' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-bottle-05', to: 'blacro-portfolio/projects/myrica/product-photography-05' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-branding-01', to: 'blacro-portfolio/projects/myrica/brand-design-01' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-branding-02', to: 'blacro-portfolio/projects/myrica/brand-design-02' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-branding-03', to: 'blacro-portfolio/projects/myrica/brand-design-03' },
  { from: 'blacro-portfolio/projects/myrica/myrica-gin-branding-04', to: 'blacro-portfolio/projects/myrica/brand-design-04' },
  
  // === LONDON FASHION WEEK ===
  { from: 'blacro-portfolio/projects/london-fashion-week/london-fashion-week-01', to: 'blacro-portfolio/projects/london-fashion-week/event-photo-01' },
  { from: 'blacro-portfolio/projects/london-fashion-week/london-fashion-week-02', to: 'blacro-portfolio/projects/london-fashion-week/event-photo-02' },
  { from: 'blacro-portfolio/projects/london-fashion-week/london-fashion-week-03', to: 'blacro-portfolio/projects/london-fashion-week/event-photo-03' },
  { from: 'blacro-portfolio/projects/london-fashion-week/london-fashion-week-04', to: 'blacro-portfolio/projects/london-fashion-week/event-photo-04' },
  { from: 'blacro-portfolio/projects/london-fashion-week/london-fashion-week-05', to: 'blacro-portfolio/projects/london-fashion-week/event-photo-05' },
  
  // === ISOLLA ===
  { from: 'blacro-portfolio/projects/isolla/img1', to: 'blacro-portfolio/projects/isolla/gallery-01' },
  { from: 'blacro-portfolio/projects/isolla/img2', to: 'blacro-portfolio/projects/isolla/gallery-02' },
  { from: 'blacro-portfolio/projects/isolla/img3', to: 'blacro-portfolio/projects/isolla/gallery-03' },
  { from: 'blacro-portfolio/projects/isolla/img4', to: 'blacro-portfolio/projects/isolla/gallery-04' },
  { from: 'blacro-portfolio/projects/isolla/img5', to: 'blacro-portfolio/projects/isolla/gallery-05' },
  { from: 'blacro-portfolio/projects/isolla/img6', to: 'blacro-portfolio/projects/isolla/gallery-06' },
  { from: 'blacro-portfolio/projects/isolla/img7', to: 'blacro-portfolio/projects/isolla/gallery-07' },
  { from: 'blacro-portfolio/projects/isolla/img8', to: 'blacro-portfolio/projects/isolla/gallery-08' },
  { from: 'blacro-portfolio/projects/isolla/img9', to: 'blacro-portfolio/projects/isolla/gallery-09' },
  { from: 'blacro-portfolio/projects/isolla/img10', to: 'blacro-portfolio/projects/isolla/gallery-10' },
  { from: 'blacro-portfolio/projects/isolla/img11', to: 'blacro-portfolio/projects/isolla/gallery-11' },
  { from: 'blacro-portfolio/projects/isolla/img12', to: 'blacro-portfolio/projects/isolla/gallery-12' },
  { from: 'blacro-portfolio/projects/isolla/img13', to: 'blacro-portfolio/projects/isolla/gallery-13' },
  { from: 'blacro-portfolio/projects/isolla/img14', to: 'blacro-portfolio/projects/isolla/gallery-14' },
  { from: 'blacro-portfolio/projects/isolla/img15', to: 'blacro-portfolio/projects/isolla/gallery-15' }
];

async function renameResource(from, to) {
  try {
    console.log(`📂 Renaming: ${from} → ${to}`);
    
    await cloudinary.uploader.rename(from, to, {
      resource_type: 'image',
      overwrite: false
    });
    
    console.log(`✅ Renamed: ${to}`);
    return { success: true, from, to };
  } catch (error) {
    if (error.http_code === 404) {
      console.log(`⚠️  Not found: ${from}`);
      return { success: false, from, to, error: 'not_found' };
    } else {
      console.error(`❌ Failed to rename ${from}:`, error.message);
      return { success: false, from, to, error: error.message };
    }
  }
}

async function cleanupObsoleteFiles() {
  console.log('\\n🧹 Cleaning up obsolete files and folders...');
  
  // Files to delete (duplicates and obsolete structure)
  const filesToDelete = [
    'blacro-portfolio/myrica/myrica-1',
    'blacro-portfolio/myrica/myrica-2', 
    'blacro-portfolio/myrica/myrica-3',
    'blacro-portfolio/replace/myrica-1',
    'blacro-portfolio/replace/myrica-2',
    'blacro-portfolio/replace/myrica-3'
  ];
  
  for (const fileId of filesToDelete) {
    try {
      await cloudinary.uploader.destroy(fileId, { resource_type: 'image' });
      console.log(`🗑️  Deleted: ${fileId}`);
    } catch (error) {
      console.log(`⚠️  Could not delete ${fileId}: ${error.message}`);
    }
  }
}

async function renameAllFiles() {
  console.log('🚀 Starting comprehensive file renaming in Cloudinary...\\n');
  
  let renamedCount = 0;
  let failedCount = 0;
  let notFoundCount = 0;
  const results = [];
  
  // Process all renames
  for (const { from, to } of renamingMap) {
    const result = await renameResource(from, to);
    results.push(result);
    
    if (result.success) {
      renamedCount++;
    } else if (result.error === 'not_found') {
      notFoundCount++;
    } else {
      failedCount++;
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Cleanup obsolete files
  await cleanupObsoleteFiles();
  
  console.log(`\\n📊 Renaming Summary:`);
  console.log(`✅ Successfully renamed: ${renamedCount}`);
  console.log(`⚠️  Files not found: ${notFoundCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`📁 Total processed: ${renamingMap.length}`);
  
  // Show failed renames for debugging
  const failed = results.filter(r => !r.success && r.error !== 'not_found');
  if (failed.length > 0) {
    console.log('\\n❌ Failed renames:');
    failed.forEach(f => console.log(`  ${f.from} → ${f.to}: ${f.error}`));
  }
  
  console.log('\\n🎉 File renaming process complete!');
  console.log('\\n📝 Next steps:');
  console.log('1. Update all code references to use new file names');
  console.log('2. Test that all images load correctly');
  console.log('3. Commit changes to repository');
  
  return results;
}

renameAllFiles();