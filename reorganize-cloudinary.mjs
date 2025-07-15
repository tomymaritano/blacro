import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

// Organization rules based on project structure
const organizationRules = [
  // Brand assets
  { pattern: /blacro.*logo/i, folder: 'blacro-portfolio/brand' },
  { pattern: /cursor/i, folder: 'blacro-portfolio/ui' },
  
  // Project covers
  { pattern: /myrica.*3/i, folder: 'blacro-portfolio/projects/covers', name: 'myrica-3' },
  { pattern: /unicoin.*nextgen.*04/i, folder: 'blacro-portfolio/projects/covers', name: 'unicoin-nextgen' },
  { pattern: /unicoin.*everywhere.*09/i, folder: 'blacro-portfolio/projects/covers', name: 'unicoin-everywhere' },
  { pattern: /london.*fashion.*week.*04/i, folder: 'blacro-portfolio/projects/covers', name: 'london-fashion-week' },
  { pattern: /isolla.*img11/i, folder: 'blacro-portfolio/projects/covers', name: 'isolla' },
  { pattern: /youtube.*cover/i, folder: 'blacro-portfolio/projects/covers', name: 'youtube-cdmx' },
  { pattern: /private.*limo.*cover/i, folder: 'blacro-portfolio/projects/covers', name: 'private-limo' },
  
  // Project logos  
  { pattern: /myrica.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'myrica' },
  { pattern: /unicoin.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'unicoin' },
  { pattern: /london.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'london' },
  { pattern: /isolla.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'isolla' },
  { pattern: /youtube.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'youtube' },
  { pattern: /private.*logo/i, folder: 'blacro-portfolio/projects/logos', name: 'private' },
  
  // Myrica project images
  { pattern: /myrica(?!.*logo|.*cover)/i, folder: 'blacro-portfolio/projects/myrica' },
  
  // Unicoin projects
  { pattern: /unicoin.*nextgen/i, folder: 'blacro-portfolio/projects/unicoin/nextgen' },
  { pattern: /unicoin.*everywhere/i, folder: 'blacro-portfolio/projects/unicoin/everywhere' },
  
  // Other projects
  { pattern: /london.*fashion.*week/i, folder: 'blacro-portfolio/projects/london-fashion-week' },
  { pattern: /isolla/i, folder: 'blacro-portfolio/projects/isolla' },
  { pattern: /youtube(?!.*logo)/i, folder: 'blacro-portfolio/projects/youtube' },
  { pattern: /private.*limo/i, folder: 'blacro-portfolio/projects/private-limo' },
  
  // Client logos
  { pattern: /beefeater|loreal|mipcom|parisblockchain/i, folder: 'blacro-portfolio/clients' },
  
  // UI elements
  { pattern: /click|file|globe|window/i, folder: 'blacro-portfolio/ui' }
];

async function reorganizeCloudinary() {
  console.log('🔄 Starting Cloudinary reorganization...\n');
  
  try {
    // Get all resources
    const allFolders = ['blacro-cloud', 'blacro-portfolio'];
    const allResources = [];
    
    for (const folder of allFolders) {
      try {
        const result = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: folder,
          max_results: 100
        });
        allResources.push(...result.resources);
        console.log(`📁 Found ${result.resources.length} resources in ${folder}`);
      } catch (e) {
        console.log(`📁 ${folder} folder not found or empty`);
      }
    }
    
    console.log(`\n📊 Total resources to process: ${allResources.length}\n`);
    
    let moveCount = 0;
    let skipCount = 0;
    
    for (const resource of allResources) {
      const currentPath = resource.public_id;
      const filename = currentPath.split('/').pop();
      
      // Find matching rule
      let targetFolder = null;
      let targetName = filename;
      
      for (const rule of organizationRules) {
        if (rule.pattern.test(currentPath) || rule.pattern.test(filename)) {
          targetFolder = rule.folder;
          if (rule.name) {
            // Keep original extension
            const extension = filename.split('.').pop();
            targetName = extension ? `${rule.name}.${extension}` : rule.name;
          }
          break;
        }
      }
      
      if (!targetFolder) {
        console.log(`❓ No rule found for: ${currentPath}`);
        continue;
      }
      
      const newPath = `${targetFolder}/${targetName.replace(/\.[^.]+$/, '')}`; // Remove extension for Cloudinary
      
      // Check if already in correct location
      if (currentPath === newPath) {
        console.log(`✅ Already correct: ${currentPath}`);
        skipCount++;
        continue;
      }
      
      try {
        console.log(`🔄 Moving: ${currentPath}`);
        console.log(`    → ${newPath}`);
        
        // Rename the resource
        await cloudinary.v2.uploader.rename(currentPath, newPath);
        
        console.log(`✅ Moved successfully\n`);
        moveCount++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error moving ${currentPath}:`, error.message);
      }
    }
    
    console.log(`\n📊 REORGANIZATION COMPLETE:`);
    console.log(`   ✅ Successfully moved: ${moveCount}`);
    console.log(`   ✅ Already correct: ${skipCount}`);
    console.log(`   📁 Total processed: ${allResources.length}`);
    
  } catch (error) {
    console.error('❌ Error during reorganization:', error.message);
  }
}

reorganizeCloudinary();