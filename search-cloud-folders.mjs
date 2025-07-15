import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function searchCloudFolders() {
  console.log('🔍 Buscando carpetas que contengan "cloud"...\n');
  
  try {
    // Primero, intentar obtener carpetas directamente
    console.log('📁 Buscando carpetas usando la API de carpetas...');
    try {
      const folders = await cloudinary.v2.api.root_folders();
      console.log('\nCarpetas raíz encontradas:');
      folders.folders.forEach(folder => {
        console.log(`  - ${folder.name} (path: ${folder.path})`);
      });
      
      // Buscar subcarpetas
      for (const folder of folders.folders) {
        if (folder.name.toLowerCase().includes('cloud')) {
          console.log(`\n✅ Encontrada carpeta con "cloud": ${folder.name}`);
          
          // Intentar obtener subcarpetas
          try {
            const subfolders = await cloudinary.v2.api.sub_folders(folder.path);
            if (subfolders.folders.length > 0) {
              console.log(`   Subcarpetas de ${folder.name}:`);
              subfolders.folders.forEach(sub => {
                console.log(`     - ${sub.name}`);
              });
            }
          } catch (e) {
            console.log(`   (No se pudieron obtener subcarpetas)`);
          }
        }
      }
    } catch (e) {
      console.log('❌ No se pudo acceder a la API de carpetas');
    }
    
    // También buscar en recursos
    console.log('\n\n📸 Buscando en recursos que contengan "cloud" en el path...');
    
    const allResources = [];
    let nextCursor = null;
    
    do {
      const options = {
        type: 'upload',
        max_results: 500
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.v2.api.resources(options);
      allResources.push(...result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor && allResources.length < 1000); // Limitar para no exceder
    
    // Filtrar recursos con "cloud" en el path
    const cloudResources = allResources.filter(r => 
      r.public_id.toLowerCase().includes('cloud')
    );
    
    if (cloudResources.length > 0) {
      console.log(`\n✅ Encontrados ${cloudResources.length} recursos con "cloud" en el path\n`);
      
      // Extraer patrones únicos de carpetas
      const cloudFolders = new Set();
      cloudResources.forEach(r => {
        const parts = r.public_id.split('/');
        // Buscar qué parte contiene "cloud"
        for (let i = 0; i < parts.length - 1; i++) {
          if (parts[i].toLowerCase().includes('cloud')) {
            // Construir el path hasta esa carpeta
            const folderPath = parts.slice(0, i + 1).join('/');
            cloudFolders.add(folderPath);
          }
        }
      });
      
      console.log('📂 Carpetas únicas con "cloud":');
      Array.from(cloudFolders).sort().forEach(folder => {
        const count = cloudResources.filter(r => r.public_id.startsWith(folder + '/')).length;
        console.log(`  - ${folder}/ (${count} archivos)`);
      });
      
      // Mostrar algunos ejemplos
      console.log('\n📄 Primeros 5 archivos de ejemplo:');
      cloudResources.slice(0, 5).forEach(r => {
        console.log(`  - ${r.public_id}`);
      });
    } else {
      console.log('\n❌ No se encontraron recursos con "cloud" en el path');
    }
    
    // Intentar buscar específicamente "blacro-cloud" y "cloud"
    console.log('\n\n🔍 Búsqueda específica de prefijos...');
    
    const prefixesToCheck = ['cloud', 'blacro-cloud', 'Cloud', 'CLOUD', 'blacro-Cloud'];
    
    for (const prefix of prefixesToCheck) {
      try {
        const result = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: prefix,
          max_results: 10
        });
        
        if (result.resources.length > 0) {
          console.log(`\n✅ Encontrados ${result.resources.length} recursos con prefijo "${prefix}":`);
          result.resources.forEach(r => {
            console.log(`  - ${r.public_id}`);
          });
        }
      } catch (e) {
        // Silently continue
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

searchCloudFolders();