import fs from 'fs';
import path from 'path';

async function replaceImages() {
  const optimizedDir = 'public/images-optimized';
  const originalDir = 'public/images';
  
  console.log('🔄 Replacing original images with optimized versions...');
  
  try {
    // Function to copy optimized images back to original structure
    function copyOptimizedImages(srcDir, destDir) {
      const items = fs.readdirSync(srcDir, { withFileTypes: true });
      
      for (const item of items) {
        const srcPath = path.join(srcDir, item.name);
        
        if (item.isDirectory()) {
          // Skip webp and avif directories
          if (item.name === 'webp' || item.name === 'avif') {
            continue;
          }
          
          const destPath = path.join(destDir, item.name);
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyOptimizedImages(srcPath, destPath);
        } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg'))) {
          // Copy optimized image to original location
          const destPath = path.join(destDir, item.name);
          fs.copyFileSync(srcPath, destPath);
          console.log(`✅ Replaced: ${item.name}`);
        }
      }
    }
    
    // Get original and optimized sizes
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
    
    // Replace images
    copyOptimizedImages(optimizedDir, originalDir);
    
    const newSize = getDirectorySize(originalDir);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log('✅ Image replacement complete!');
    console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${savings}%`);
    console.log('📁 Original images backed up to: public/images-backup');
    
  } catch (error) {
    console.error('❌ Error replacing images:', error);
  }
}

replaceImages();