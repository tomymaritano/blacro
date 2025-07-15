import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function checkBlacroCloud() {
  console.log('🔍 Buscando imágenes en la carpeta blacro-cloud...\n');
  
  try {
    const allResources = [];
    let nextCursor = null;
    
    // Obtener recursos de blacro-cloud con paginación
    do {
      const options = {
        type: 'upload',
        prefix: 'blacro-cloud',
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
    
    if (allResources.length === 0) {
      console.log('❌ No se encontraron imágenes en la carpeta blacro-cloud');
      console.log('\n💡 ¿Quizás necesitas subir las imágenes primero?');
      return;
    }
    
    console.log(`✅ Total de imágenes en blacro-cloud: ${allResources.length}\n`);
    
    // Organizar por carpetas
    const organized = {};
    
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const parts = publicId.split('/');
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
        format: resource.format
      });
    });
    
    // Mostrar estructura
    console.log('📁 ESTRUCTURA DE BLACRO-CLOUD:\n');
    
    Object.keys(organized).sort().forEach(folder => {
      console.log(`\n📂 ${folder}/`);
      console.log('─'.repeat(50));
      
      organized[folder].sort((a, b) => a.filename.localeCompare(b.filename)).forEach(file => {
        console.log(`  📄 ${file.filename}.${file.format}`);
        console.log(`     Path: ${file.relativePath}`);
      });
    });
    
    // Mostrar resumen por proyecto
    console.log('\n\n🎨 PROYECTOS DISPONIBLES:');
    const projectFolders = Object.keys(organized).filter(folder => 
      folder.startsWith('projects/') && !folder.includes('covers') && !folder.includes('logos')
    );
    
    if (projectFolders.length > 0) {
      projectFolders.forEach(folder => {
        const projectName = folder.split('/').pop();
        console.log(`\n${projectName.toUpperCase()}: ${organized[folder].length} imágenes`);
      });
    } else {
      console.log('\n❌ No se encontraron carpetas de proyectos en blacro-cloud/projects/');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBlacroCloud();