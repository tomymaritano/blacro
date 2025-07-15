import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function checkCloudContents() {
  console.log('🔍 Verificando contenido de las carpetas cloud y blacro-cloud...\n');
  
  try {
    const foldersToCheck = [
      'cloud',
      'blacro-cloud',
      'cloud/isolla',
      'cloud/logos', 
      'cloud/london',
      'cloud/myrica',
      'cloud/privatelimo',
      'cloud/unicoin',
      'cloud/youtube',
      'blacro-cloud/isolla',
      'blacro-cloud/logos',
      'blacro-cloud/london', 
      'blacro-cloud/myrica',
      'blacro-cloud/privatelimo',
      'blacro-cloud/unicoin',
      'blacro-cloud/youtube'
    ];
    
    for (const folder of foldersToCheck) {
      console.log(`\n📂 Verificando ${folder}/...`);
      
      try {
        const result = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: folder,
          max_results: 100,
          resource_type: 'image'
        });
        
        if (result.resources.length > 0) {
          console.log(`✅ Encontradas ${result.resources.length} imágenes:`);
          
          // Agrupar por tipo
          const byType = {};
          result.resources.forEach(r => {
            const filename = r.public_id.split('/').pop();
            const ext = r.format;
            if (!byType[ext]) byType[ext] = [];
            byType[ext].push(filename);
          });
          
          Object.entries(byType).forEach(([ext, files]) => {
            console.log(`   ${ext.toUpperCase()}: ${files.length} archivos`);
            files.slice(0, 3).forEach(f => {
              console.log(`     - ${f}`);
            });
            if (files.length > 3) {
              console.log(`     ... y ${files.length - 3} más`);
            }
          });
        } else {
          console.log(`❌ Carpeta vacía o sin imágenes`);
        }
      } catch (e) {
        console.log(`❌ Error al acceder a la carpeta: ${e.message}`);
      }
    }
    
    // También verificar si hay archivos con diferentes tipos de recursos
    console.log('\n\n🔍 Verificando otros tipos de recursos en cloud/blacro-cloud...');
    
    const resourceTypes = ['raw', 'video', 'auto'];
    
    for (const type of resourceTypes) {
      try {
        const result1 = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: 'cloud',
          max_results: 10,
          resource_type: type
        });
        
        if (result1.resources.length > 0) {
          console.log(`\n✅ Encontrados ${result1.resources.length} recursos tipo ${type} en cloud/`);
        }
        
        const result2 = await cloudinary.v2.api.resources({
          type: 'upload',
          prefix: 'blacro-cloud',
          max_results: 10,
          resource_type: type
        });
        
        if (result2.resources.length > 0) {
          console.log(`✅ Encontrados ${result2.resources.length} recursos tipo ${type} en blacro-cloud/`);
        }
      } catch (e) {
        // Continuar
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

checkCloudContents();