import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function listAllResources() {
  console.log('🔍 Buscando TODAS las imágenes en Cloudinary (sin filtro de carpeta)...\n');
  
  try {
    const allResources = [];
    let nextCursor = null;
    
    // Obtener TODOS los recursos sin filtro de prefix
    do {
      const options = {
        type: 'upload',
        max_results: 500,
        resource_type: 'image'
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.v2.api.resources(options);
      allResources.push(...result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`Obtenidos ${result.resources.length} recursos... (total hasta ahora: ${allResources.length})`);
    } while (nextCursor);
    
    console.log(`\n✅ Total de imágenes encontradas: ${allResources.length}\n`);
    
    // Agrupar por carpeta principal
    const byMainFolder = {};
    
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const mainFolder = publicId.split('/')[0] || 'root';
      
      if (!byMainFolder[mainFolder]) {
        byMainFolder[mainFolder] = [];
      }
      
      byMainFolder[mainFolder].push(publicId);
    });
    
    // Mostrar carpetas principales
    console.log('📁 CARPETAS PRINCIPALES EN CLOUDINARY:\n');
    Object.keys(byMainFolder).sort().forEach(folder => {
      console.log(`📂 ${folder}/ (${byMainFolder[folder].length} imágenes)`);
    });
    
    // Buscar específicamente blacro-cloud
    console.log('\n🔍 Buscando imágenes que contengan "blacro"...\n');
    const blacroImages = allResources.filter(r => 
      r.public_id.toLowerCase().includes('blacro')
    );
    
    if (blacroImages.length > 0) {
      console.log(`Encontradas ${blacroImages.length} imágenes con "blacro" en el nombre:\n`);
      
      // Agrupar por carpeta
      const blacroByFolder = {};
      blacroImages.forEach(img => {
        const parts = img.public_id.split('/');
        const folder = parts.slice(0, -1).join('/') || 'root';
        
        if (!blacroByFolder[folder]) {
          blacroByFolder[folder] = [];
        }
        
        blacroByFolder[folder].push({
          filename: parts[parts.length - 1],
          publicId: img.public_id,
          url: img.secure_url
        });
      });
      
      Object.keys(blacroByFolder).sort().forEach(folder => {
        console.log(`\n📂 ${folder}/`);
        blacroByFolder[folder].forEach(img => {
          console.log(`  📄 ${img.filename}`);
          console.log(`     ID: ${img.publicId}`);
        });
      });
    } else {
      console.log('❌ No se encontraron imágenes con "blacro" en el nombre');
    }
    
    // Mostrar algunas imágenes de ejemplo
    console.log('\n📸 PRIMERAS 10 IMÁGENES (ejemplo):');
    allResources.slice(0, 10).forEach(img => {
      console.log(`  - ${img.public_id} (${img.format})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listAllResources();