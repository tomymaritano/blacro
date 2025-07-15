import fs from 'fs';

// Map of old paths to new Cloudinary paths
const imageMap = {
  // Myrica images
  '"/images/myrica/myrica-gin-branding-04.png"': '"projects/myrica/myrica-gin-branding-04"',
  '"/images/myrica/myrica-2.gif"': '"projects/myrica/myrica-2"',
  '"/images/myrica/myricagif.png"': '"projects/myrica/myricagif"',
  '"/images/myrica/myrica-1.gif"': '"projects/myrica/myrica-1"',
  '"/images/myrica/myrica-gin-bottle-02.jpg"': '"projects/myrica/myrica-gin-bottle-02"',
  '"/images/myrica/myrica-gin-bottle-03.jpg"': '"projects/myrica/myrica-gin-bottle-03"',
  '"/images/myrica/myrica-gin-branding-03.jpg"': '"projects/myrica/myrica-gin-branding-03"',
  '"/images/myrica/myrica-gin-bottle-05.jpg"': '"projects/myrica/myrica-gin-bottle-05"',
  '"/images/myrica/myrica-gin-bottle-04.jpg"': '"projects/myrica/myrica-gin-bottle-04"',
  '"/images/myrica/myrica-gin-bottle-01.jpg"': '"projects/myrica/myrica-gin-bottle-01"',
  
  // Unicoin images
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-04.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-04"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-01.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-01"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-02.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-02"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-03.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-03"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-05.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-05"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-06.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-06"',
  '"/images/unicoin/thenextgenofcrypto/unicoin-nextgen-07.jpg"': '"projects/unicoin/thenextgenofcrypto/unicoin-nextgen-07"',
  
  // Isolla images
  '"/images/isolla/img11.png"': '"projects/isolla/img11"',
  '"/images/isolla/img10.png"': '"projects/isolla/img10"',
  '"/images/isolla/img9.png"': '"projects/isolla/img9"',
  '"/images/isolla/img5.jpg"': '"projects/isolla/img5"',
  '"/images/isolla/img6.png"': '"projects/isolla/img6"',
  '"/images/isolla/img12.png"': '"projects/isolla/img12"',
  '"/images/isolla/img13.png"': '"projects/isolla/img13"',
  '"/images/isolla/img14.png"': '"projects/isolla/img14"',
  '"/images/isolla/img7.png"': '"projects/isolla/img7"',
  '"/images/isolla/img8.png"': '"projects/isolla/img8"',
  '"/images/isolla/img1.png"': '"projects/isolla/img1"',
  '"/images/isolla/img2.png"': '"projects/isolla/img2"',
  '"/images/isolla/img15.png"': '"projects/isolla/img15"',
  '"/images/isolla/img3.png"': '"projects/isolla/img3"',
  '"/images/isolla/img4.png"': '"projects/isolla/img4"',
  
  // YouTube images
  '"/images/youtube/youtube-cover.jpg"': '"projects/youtube/youtube-cover"',
  '"/images/youtube/youtube-01.jpg"': '"projects/youtube/youtube-01"',
  '"/images/youtube/youtube-02.jpg"': '"projects/youtube/youtube-02"',
  '"/images/youtube/youtube-03.jpg"': '"projects/youtube/youtube-03"',
  '"/images/youtube/youtube-04.jpg"': '"projects/youtube/youtube-04"',
  '"/images/youtube/youtube-10.jpg"': '"projects/youtube/youtube-10"',
  '"/images/youtube/youtube-07.jpg"': '"projects/youtube/youtube-07"',
  '"/images/youtube/youtube-13.jpg"': '"projects/youtube/youtube-13"',
  '"/images/youtube/youtube-12.jpg"': '"projects/youtube/youtube-12"',
  '"/images/youtube/youtube-08.jpg"': '"projects/youtube/youtube-08"',
  '"/images/youtube/youtube-11.jpg"': '"projects/youtube/youtube-11"',
  '"/images/youtube/youtube-05.jpg"': '"projects/youtube/youtube-05"',
  '"/images/youtube/youtube-06.jpg"': '"projects/youtube/youtube-06"',
  '"/images/youtube/youtube-09.jpg"': '"projects/youtube/youtube-09"',
  '"/images/youtube/youtube-14.jpg"': '"projects/youtube/youtube-14"'
};

const filesToUpdate = [
  './src/data/myrica-gin.ts',
  './src/data/unicoin-nextgen.ts',
  './src/data/isolla.ts',
  './src/data/youtube-cdmx.ts'
];

function updateImageReferences() {
  console.log('🔄 Updating image references to use Cloudinary...\n');
  
  for (const file of filesToUpdate) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let hasChanges = false;
      
      console.log(`📝 Processing ${file}:`);
      
      for (const [oldPath, newPath] of Object.entries(imageMap)) {
        if (content.includes(oldPath)) {
          content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
          console.log(`   ✅ ${oldPath} → ${newPath}`);
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`   💾 File updated!\n`);
      } else {
        console.log(`   ℹ️  No changes needed\n`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('✅ Image reference update completed!');
}

updateImageReferences();