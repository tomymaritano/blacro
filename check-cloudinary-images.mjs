import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all image references in data files
const dataFiles = [
  './src/data/myrica-gin.ts',
  './src/data/projects.ts',
  './src/data/mainImages.ts',
  './src/data/unicoin-nextgen.ts',
  './src/data/unicoin-everywhere.ts',
  './src/data/london-fashion-week.ts',
  './src/data/isolla.ts',
  './src/data/youtube-cdmx.ts',
  './src/data/private-limo.ts'
];

const publicFiles = fs.readdirSync('./public').filter(file => 
  file.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)
);

const cloudinaryImages = new Set();
const localImages = new Set();

console.log('🔍 Analyzing image references...\n');

// Scan data files for image references
for (const file of dataFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find Cloudinary images (without /images/ prefix)
    const cloudinaryMatches = content.match(/"[^"]*\/[^"]*"/g) || [];
    cloudinaryMatches.forEach(match => {
      const cleaned = match.replace(/"/g, '');
      if (!cleaned.startsWith('/images/') && !cleaned.startsWith('http') && cleaned.includes('/')) {
        cloudinaryImages.add(cleaned);
      }
    });
    
    // Find local images (with /images/ prefix or direct public references)
    const localMatches = content.match(/\/images\/[^"]+|\/[^\/"][^"]*\.(jpg|jpeg|png|gif|svg|webp)/gi) || [];
    localMatches.forEach(match => {
      localImages.add(match);
    });
    
  } catch (error) {
    console.log(`⚠️  Could not read ${file}`);
  }
}

console.log('📁 Files in public directory:');
publicFiles.forEach(file => console.log(`   ${file}`));

console.log(`\n🌥️  Cloudinary images referenced (${cloudinaryImages.size}):`);
cloudinaryImages.forEach(img => console.log(`   ${img}`));

console.log(`\n💻 Local images still referenced (${localImages.size}):`);
localImages.forEach(img => console.log(`   ${img}`));

console.log('\n🧹 Files that could be removed from public:');
const potentiallyUnused = publicFiles.filter(file => {
  const isReferenced = Array.from(localImages).some(localImg => 
    localImg.includes(file) || localImg.includes(file.replace(/\.[^.]+$/, ''))
  );
  return !isReferenced;
});

potentiallyUnused.forEach(file => console.log(`   ❌ ${file}`));

if (potentiallyUnused.length === 0) {
  console.log('   ✅ All files in public appear to be referenced');
}