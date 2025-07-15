import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function mapImagesToCloud() {
  console.log('🔍 Mapeando imágenes disponibles a estructura cloud/blacro-cloud...\n');
  
  try {
    // Obtener todas las imágenes
    const allResources = [];
    let nextCursor = null;
    
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
    } while (nextCursor);
    
    console.log(`Total de imágenes encontradas: ${allResources.length}\n`);
    
    // Mapear por proyecto
    const projectMapping = {
      'isolla': [],
      'london': [],
      'myrica': [],
      'privatelimo': [],
      'unicoin': [],
      'youtube': [],
      'logos': []
    };
    
    // Clasificar imágenes por proyecto
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const filename = publicId.split('/').pop();
      
      // Buscar a qué proyecto pertenece
      if (publicId.includes('isolla') || filename.includes('isolla')) {
        projectMapping.isolla.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/isolla/${filename}`
        });
      } else if (publicId.includes('london') || filename.includes('london')) {
        projectMapping.london.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/london/${filename}`
        });
      } else if (publicId.includes('myrica') || filename.includes('myrica')) {
        projectMapping.myrica.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/myrica/${filename}`
        });
      } else if (publicId.includes('private') || filename.includes('private')) {
        projectMapping.privatelimo.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/privatelimo/${filename}`
        });
      } else if (publicId.includes('unicoin') || filename.includes('unicoin')) {
        projectMapping.unicoin.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/unicoin/${filename}`
        });
      } else if (publicId.includes('youtube') || filename.includes('youtube')) {
        projectMapping.youtube.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/youtube/${filename}`
        });
      } else if (filename.includes('logo') || publicId.includes('clients')) {
        projectMapping.logos.push({
          current: publicId,
          filename: filename,
          suggested: `cloud/logos/${filename}`
        });
      }
    });
    
    // Mostrar mapeo sugerido
    console.log('📋 MAPEO SUGERIDO DE IMÁGENES:\n');
    
    Object.entries(projectMapping).forEach(([project, images]) => {
      if (images.length > 0) {
        console.log(`\n📂 ${project.toUpperCase()} (${images.length} imágenes)`);
        console.log('─'.repeat(50));
        
        images.slice(0, 5).forEach(img => {
          console.log(`  ${img.current}`);
          console.log(`  → ${img.suggested}`);
          console.log('');
        });
        
        if (images.length > 5) {
          console.log(`  ... y ${images.length - 5} más\n`);
        }
      }
    });
    
    // Crear script para copiar
    console.log('\n\n📝 SCRIPT PARA COPIAR IMÁGENES (si necesitas ejecutarlo):\n');
    console.log('```javascript');
    console.log('// Script para copiar imágenes a cloud/');
    console.log('async function copyToCloud() {');
    console.log('  const copies = [');
    
    let count = 0;
    Object.entries(projectMapping).forEach(([project, images]) => {
      images.slice(0, 3).forEach(img => {
        if (count < 10) {
          console.log(`    { from: "${img.current}", to: "${img.suggested}" },`);
          count++;
        }
      });
    });
    
    console.log('    // ... más copias aquí');
    console.log('  ];');
    console.log('  // Código para ejecutar las copias');
    console.log('}');
    console.log('```');
    
    // Verificar si necesitamos copiar o solo actualizar referencias
    const needsCopy = projectMapping.isolla.length + projectMapping.london.length + 
                     projectMapping.myrica.length + projectMapping.privatelimo.length + 
                     projectMapping.unicoin.length + projectMapping.youtube.length > 0;
    
    if (needsCopy) {
      console.log('\n\n💡 RECOMENDACIÓN:');
      console.log('Las imágenes existen pero necesitan ser copiadas/movidas a las carpetas cloud/');
      console.log('¿Quieres que cree un script para hacer esto automáticamente?');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

mapImagesToCloud();