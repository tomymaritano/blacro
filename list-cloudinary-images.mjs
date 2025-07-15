import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function listAllCloudinaryImages() {
  console.log('🔍 Listando todas las imágenes en Cloudinary...\n');
  
  try {
    const allResources = [];
    let nextCursor = null;
    
    // Función para obtener recursos con paginación
    async function getResources(prefix, cursor = null) {
      const options = {
        type: 'upload',
        prefix: prefix,
        max_results: 500,
        resource_type: 'image'
      };
      
      if (cursor) {
        options.next_cursor = cursor;
      }
      
      return await cloudinary.v2.api.resources(options);
    }
    
    // Obtener recursos de blacro-cloud
    console.log('📁 Obteniendo imágenes de blacro-cloud...');
    do {
      const result = await getResources('blacro-cloud', nextCursor);
      allResources.push(...result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);
    
    console.log(`✅ Total de imágenes encontradas: ${allResources.length}\n`);
    
    // Organizar por carpetas
    const organized = {};
    
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const parts = publicId.split('/');
      
      // Ignorar la primera parte (blacro-cloud)
      const relativePath = parts.slice(1).join('/');
      const folder = parts.slice(1, -1).join('/') || 'root';
      const filename = parts[parts.length - 1];
      
      if (!organized[folder]) {
        organized[folder] = [];
      }
      
      organized[folder].push({
        filename: filename,
        publicId: publicId,
        relativePath: relativePath,
        url: resource.secure_url,
        format: resource.format,
        width: resource.width,
        height: resource.height
      });
    });
    
    // Mostrar estructura organizada
    console.log('📁 ESTRUCTURA DE CARPETAS EN BLACRO-CLOUD:\n');
    
    Object.keys(organized).sort().forEach(folder => {
      console.log(`\n📂 ${folder}/`);
      console.log('─'.repeat(50));
      
      organized[folder].sort((a, b) => a.filename.localeCompare(b.filename)).forEach(file => {
        console.log(`  📄 ${file.filename} (${file.format}) - ${file.width}x${file.height}`);
        console.log(`     Path: ${file.relativePath}`);
      });
    });
    
    // Guardar en archivo JSON para referencia
    const outputData = {
      timestamp: new Date().toISOString(),
      totalImages: allResources.length,
      structure: organized
    };
    
    await import('fs').then(fs => {
      fs.default.writeFileSync(
        'cloudinary-images-structure.json', 
        JSON.stringify(outputData, null, 2)
      );
    });
    
    console.log('\n✅ Estructura guardada en cloudinary-images-structure.json');
    
    // Mostrar resumen
    console.log('\n📊 RESUMEN:');
    console.log(`Total de imágenes: ${allResources.length}`);
    console.log(`Total de carpetas: ${Object.keys(organized).length}`);
    
    // Mostrar imágenes por proyecto
    console.log('\n🎨 IMÁGENES POR PROYECTO:');
    
    const projectFolders = Object.keys(organized).filter(folder => 
      folder.startsWith('projects/') && !folder.includes('covers') && !folder.includes('logos')
    );
    
    projectFolders.forEach(folder => {
      const projectName = folder.split('/').pop();
      console.log(`\n${projectName.toUpperCase()}: ${organized[folder].length} imágenes`);
      organized[folder].forEach(img => {
        console.log(`  - ${img.filename}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error listando imágenes:', error.message);
  }
}

listAllCloudinaryImages();