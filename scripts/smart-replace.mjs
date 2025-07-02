import fs from 'fs';
import path from 'path';

async function smartReplace() {
  const optimizedDir = 'public/images-optimized';
  const originalDir = 'public/images';
  
  console.log('🔄 Smart replacing images with optimized versions...');
  
  try {
    let replacedCount = 0;
    let totalSavings = 0;
    
    // Function to find and replace images
    function replaceInDirectory(optimizedPath, originalPath) {
      if (!fs.existsSync(optimizedPath) || !fs.existsSync(originalPath)) {
        return;
      }
      
      const optimizedItems = fs.readdirSync(optimizedPath, { withFileTypes: true });
      
      for (const item of optimizedItems) {
        const optimizedItemPath = path.join(optimizedPath, item.name);
        const originalItemPath = path.join(originalPath, item.name);
        
        if (item.isDirectory()) {
          // Skip webp and avif directories
          if (item.name === 'webp' || item.name === 'avif') {
            continue;
          }
          replaceInDirectory(optimizedItemPath, originalItemPath);
        } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg'))) {
          // Replace if original exists
          if (fs.existsSync(originalItemPath)) {
            const originalSize = fs.statSync(originalItemPath).size;
            const optimizedSize = fs.statSync(optimizedItemPath).size;
            const savings = originalSize - optimizedSize;
            
            fs.copyFileSync(optimizedItemPath, originalItemPath);
            
            replacedCount++;
            totalSavings += savings;
            
            console.log(`✅ ${item.name}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${((savings/originalSize)*100).toFixed(1)}% saved)`);
          }
        }
      }
    }
    
    // Get original size
    const getDirectorySize = (dirPath) => {
      let size = 0;
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          size += getDirectorySize(filePath);
        } else {
          size += fs.statSync(filePath).size;
        }
      }
      return size;
    };
    
    const originalSize = getDirectorySize(originalDir);
    
    // Perform smart replacement
    replaceInDirectory(optimizedDir, originalDir);
    
    const newSize = getDirectorySize(originalDir);
    const totalSavingsPercent = ((totalSavings) / (originalSize) * 100).toFixed(1);
    
    console.log('\n✅ Smart replacement complete!');
    console.log(`📊 Files replaced: ${replacedCount}`);
    console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total space saved: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${totalSavingsPercent}%)`);
    
  } catch (error) {
    console.error('❌ Error in smart replacement:', error);
  }
}

smartReplace();