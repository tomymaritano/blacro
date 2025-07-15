import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

// Proposed folder structure based on projects
const organizationPlan = {
  // Brand assets
  'brand': [
    'blacro-logo', 'blacro-logo-animated', 'blacro-logo-white', 'cursor-active', 'cursor-idle'
  ],
  
  // Project covers (main images)
  'projects/covers': [
    'myrica-3', 'unicoin-nextgen', 'unicoin-everywhere', 'london-fashion-week',
    'isolla', 'youtube-cdmx', 'private-limo'
  ],
  
  // Project logos
  'projects/logos': [
    'myrica', 'unicoin', 'london', 'isolla', 'youtube', 'private'
  ],
  
  // Myrica project images
  'projects/myrica': [
    'myrica-1', 'myrica-2', 'myrica-fix', 'myrica-gin-branding-04', 'myricagif',
    'myrica-gin-bottle-01', 'myrica-gin-bottle-02', 'myrica-gin-bottle-03',
    'myrica-gin-bottle-04', 'myrica-gin-bottle-05', 'myrica-gin-branding-03'
  ],
  
  // Unicoin projects
  'projects/unicoin/nextgen': [
    'unicoin-nextgen-01', 'unicoin-nextgen-02', 'unicoin-nextgen-03',
    'unicoin-nextgen-04', 'unicoin-nextgen-05', 'unicoin-nextgen-06', 'unicoin-nextgen-07'
  ],
  
  'projects/unicoin/everywhere': [
    'unicoin-everywhere-01', 'unicoin-everywhere-02', 'unicoin-everywhere-03',
    'unicoin-everywhere-04', 'unicoin-everywhere-05', 'unicoin-everywhere-06',
    'unicoin-everywhere-07', 'unicoin-everywhere-08', 'unicoin-everywhere-09',
    'unicoin-everywhere-10', 'unicoin-everywhere-11', 'unicoin-everywhere-12'
  ],
  
  // London Fashion Week
  'projects/london-fashion-week': [
    'london-fashion-week-01', 'london-fashion-week-02', 'london-fashion-week-03',
    'london-fashion-week-04', 'london-fashion-week-05'
  ],
  
  // Isolla project
  'projects/isolla': [
    'img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8',
    'img9', 'img10', 'img11', 'img12', 'img13', 'img14', 'img15'
  ],
  
  // YouTube CDMX
  'projects/youtube': [
    'youtube-cover', 'youtube-01', 'youtube-02', 'youtube-03', 'youtube-04',
    'youtube-05', 'youtube-06', 'youtube-07', 'youtube-08', 'youtube-09',
    'youtube-10', 'youtube-11', 'youtube-12', 'youtube-13', 'youtube-14'
  ],
  
  // Private Limo
  'projects/private-limo': [
    'cover-animation', 'logo-design-01', 'logo-design-02', 'logo-animation',
    'brand-application-01', 'brand-application-02', 'brand-application-03',
    'brand-application-04', 'brand-application-05', 'brand-application-06',
    'brand-application-07', 'brand-application-08', 'brand-application-09',
    'brand-application-10'
  ],
  
  // Client logos (marquee)
  'clients': [
    'beefeater', 'loreal', 'london', 'mipcom', 'parisblockchain', 'youtube'
  ],
  
  // UI elements
  'ui': [
    'click', 'noclick', 'cursor-active', 'cursor-idle', 'file', 'globe', 'window'
  ]
};

async function analyzeAndOrganize() {
  console.log('🔍 Analyzing current Cloudinary structure...\n');
  
  try {
    // Get all resources from both blacro-cloud and blacro-portfolio
    const allResources = [];
    
    // Check blacro-cloud
    try {
      const blacroCloudResult = await cloudinary.v2.api.resources({
        type: 'upload',
        prefix: 'blacro-cloud',
        max_results: 100
      });
      allResources.push(...blacroCloudResult.resources);
      console.log(`📁 Found ${blacroCloudResult.resources.length} resources in blacro-cloud`);
    } catch (e) {
      console.log('📁 blacro-cloud folder not found or empty');
    }
    
    // Check blacro-portfolio
    const portfolioResult = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'blacro-portfolio',
      max_results: 100
    });
    allResources.push(...portfolioResult.resources);
    console.log(`📁 Found ${portfolioResult.resources.length} resources in blacro-portfolio`);
    
    console.log(`\n📊 Total resources to organize: ${allResources.length}\n`);
    
    // Group resources by suggested organization
    const organized = {};
    const unorganized = [];
    
    allResources.forEach(resource => {
      const filename = resource.public_id.split('/').pop().toLowerCase();
      let foundCategory = false;
      
      // Try to match with organization plan
      for (const [category, expectedFiles] of Object.entries(organizationPlan)) {
        const matchFound = expectedFiles.some(expectedFile => {
          const cleanExpected = expectedFile.toLowerCase().replace(/[.-]/g, '');
          const cleanFilename = filename.toLowerCase().replace(/[.-]/g, '');
          return cleanFilename.includes(cleanExpected) || cleanExpected.includes(cleanFilename);
        });
        
        if (matchFound) {
          if (!organized[category]) organized[category] = [];
          organized[category].push({
            current: resource.public_id,
            suggested: `blacro-portfolio/${category}/${filename}`,
            url: resource.secure_url
          });
          foundCategory = true;
          break;
        }
      }
      
      if (!foundCategory) {
        unorganized.push({
          current: resource.public_id,
          filename: filename,
          url: resource.secure_url
        });
      }
    });
    
    // Display organization plan
    console.log('📋 PROPOSED ORGANIZATION:\n');
    
    Object.keys(organized).forEach(category => {
      console.log(`📁 blacro-portfolio/${category}/`);
      organized[category].forEach(item => {
        const needsMove = !item.current.startsWith(`blacro-portfolio/${category}/`);
        const status = needsMove ? '🔄 MOVE' : '✅ GOOD';
        console.log(`   ${status} ${item.current} → ${item.suggested}`);
      });
      console.log('');
    });
    
    if (unorganized.length > 0) {
      console.log('❓ UNORGANIZED FILES:');
      unorganized.forEach(item => {
        console.log(`   ❔ ${item.current} (${item.filename})`);
      });
      console.log('');
    }
    
    // Count moves needed
    const movesNeeded = Object.values(organized).flat().filter(item => 
      !item.current.startsWith(item.suggested.replace(`/${item.current.split('/').pop()}`, ''))
    ).length;
    
    console.log(`📊 SUMMARY:`);
    console.log(`   ✅ Already organized: ${allResources.length - movesNeeded - unorganized.length}`);
    console.log(`   🔄 Need to move: ${movesNeeded}`);
    console.log(`   ❓ Unorganized: ${unorganized.length}`);
    console.log(`   📁 Total files: ${allResources.length}`);
    
  } catch (error) {
    console.error('❌ Error analyzing Cloudinary:', error.message);
  }
}

analyzeAndOrganize();