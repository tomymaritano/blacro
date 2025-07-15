import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function exploreCloudinary() {
  console.log('🔍 Exploring Cloudinary structure...\n');
  
  try {
    // First, check for blacro-cloud folder
    console.log('📁 Searching for blacro-cloud folder...');
    
    const blacroCloudResult = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'blacro-cloud',
      max_results: 100
    });
    
    if (blacroCloudResult.resources.length > 0) {
      console.log(`\n✅ Found ${blacroCloudResult.resources.length} resources in blacro-cloud:\n`);
      
      // Group by project/category
      const projectGroups = {};
      
      blacroCloudResult.resources.forEach(resource => {
        console.log(`📄 ${resource.public_id}`);
        console.log(`   URL: ${resource.secure_url}`);
        console.log(`   Format: ${resource.format} | Size: ${Math.round(resource.bytes/1024)}KB`);
        console.log(`   Created: ${resource.created_at}\n`);
        
        // Try to identify project from filename
        const pathParts = resource.public_id.split('/');
        const filename = pathParts[pathParts.length - 1].toLowerCase();
        
        let project = 'unknown';
        if (filename.includes('myrica')) project = 'myrica';
        else if (filename.includes('unicoin')) project = 'unicoin';
        else if (filename.includes('isolla')) project = 'isolla';
        else if (filename.includes('youtube')) project = 'youtube';
        else if (filename.includes('london') || filename.includes('fashion')) project = 'london-fashion-week';
        else if (filename.includes('private') || filename.includes('limo')) project = 'private-limo';
        else if (filename.includes('logo') || filename.includes('brand')) project = 'brand';
        
        if (!projectGroups[project]) projectGroups[project] = [];
        projectGroups[project].push({
          current_path: resource.public_id,
          filename: filename,
          format: resource.format,
          url: resource.secure_url
        });
      });
      
      console.log('\n📊 Project groupings:');
      Object.keys(projectGroups).forEach(project => {
        console.log(`\n🎨 ${project.toUpperCase()} (${projectGroups[project].length} files):`);
        projectGroups[project].forEach(file => {
          console.log(`   - ${file.filename}.${file.format}`);
        });
      });
      
    } else {
      console.log('❌ No resources found in blacro-cloud folder');
    }
    
    // Also check the current blacro-portfolio structure
    console.log('\n📁 Current blacro-portfolio structure:');
    
    const portfolioResult = await cloudinary.v2.api.resources({
      type: 'upload', 
      prefix: 'blacro-portfolio',
      max_results: 100
    });
    
    console.log(`\n✅ Found ${portfolioResult.resources.length} resources in blacro-portfolio`);
    
    // Group by folder structure
    const folderStructure = {};
    portfolioResult.resources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      const folder = pathParts.slice(0, -1).join('/');
      
      if (!folderStructure[folder]) folderStructure[folder] = [];
      folderStructure[folder].push(pathParts[pathParts.length - 1]);
    });
    
    console.log('\n📂 Current folder structure:');
    Object.keys(folderStructure).sort().forEach(folder => {
      console.log(`\n📁 ${folder}/`);
      folderStructure[folder].forEach(file => {
        console.log(`   - ${file}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error exploring Cloudinary:', error.message);
  }
}

exploreCloudinary();