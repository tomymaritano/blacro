import fs from 'fs';
import path from 'path';

async function finalReplace() {
  console.log('🔄 Final image replacement with proper mapping...');
  
  try {
    let replacedCount = 0;
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    // Create mapping of all images
    const imageMap = new Map();
    
    // Scan optimized directory (flat structure)
    const optimizedFiles = fs.readdirSync('public/images-optimized', { withFileTypes: true })
      .filter(item => item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg')));
    
    optimizedFiles.forEach(file => {
      imageMap.set(file.name, `public/images-optimized/${file.name}`);
    });
    
    // Function to find and replace in directory structure
    function replaceInDirectory(dirPath) {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        
        if (item.isDirectory()) {
          replaceInDirectory(itemPath);
        } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg'))) {
          // Check if we have an optimized version
          if (imageMap.has(item.name)) {
            const optimizedPath = imageMap.get(item.name);
            const originalSize = fs.statSync(itemPath).size;
            const optimizedSize = fs.statSync(optimizedPath).size;
            
            // Only replace if optimized version is smaller
            if (optimizedSize < originalSize) {
              fs.copyFileSync(optimizedPath, itemPath);
              
              const savings = originalSize - optimizedSize;
              const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
              
              replacedCount++;
              totalOriginalSize += originalSize;
              totalOptimizedSize += optimizedSize;
              
              console.log(`✅ ${item.name}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${savingsPercent}% saved)`);
            }
          }
        }
      }
    }
    
    // Start replacement from images directory
    replaceInDirectory('public/images');
    
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;
    
    console.log('\n✅ Final replacement complete!');
    console.log(`📊 Files replaced: ${replacedCount}`);
    console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total space saved: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${totalSavingsPercent}%)`);
    
    // Final directory size check
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
    
    const finalSize = getDirectorySize('public/images');
    console.log(`📊 Final images directory size: ${(finalSize / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Error in final replacement:', error);
  }
}

finalReplace();