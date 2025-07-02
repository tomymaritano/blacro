import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  const inputDir = 'public/images';
  const outputDir = 'public/images-optimized';

  console.log('🚀 Starting image optimization...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
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

    const originalSize = getDirectorySize(inputDir);
    console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    // Optimize JPEGs and PNGs
    console.log('🔄 Optimizing JPEG and PNG files...');
    await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.7, 0.8] })
      ]
    });

    // Convert to WebP
    console.log('🔄 Converting to WebP...');
    await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: `${outputDir}/webp`,
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });

    // Convert to AVIF (smaller but newer format)
    console.log('🔄 Converting to AVIF...');
    await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: `${outputDir}/avif`,
      plugins: [
        imageminAvif({ quality: 60 })
      ]
    });

    // Calculate savings
    const optimizedSize = getDirectorySize(outputDir);
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimization complete!`);
    console.log(`📊 Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${savings}%`);
    console.log(`📁 Optimized images saved to: ${outputDir}`);
    
    // Instructions
    console.log('\n📋 Next steps:');
    console.log('1. Review optimized images in public/images-optimized/');
    console.log('2. Replace original images if quality is acceptable');
    console.log('3. Use WebP/AVIF folders for modern browsers');
    console.log('4. Consider setting up Cloudinary for automatic optimization');

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeImages();