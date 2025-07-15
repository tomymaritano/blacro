import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function findBlacroCloudStructure() {
  console.log('🔍 Buscando TODAS las carpetas que contengan "blacro-cloud"...\n');
  
  try {
    const allResources = [];
    let nextCursor = null;
    
    // Obtener TODOS los recursos
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
    
    // Filtrar solo los que contengan "blacro-cloud" en cualquier parte del path
    const blacroCloudResources = allResources.filter(r => 
      r.public_id.toLowerCase().includes('blacro-cloud')
    );
    
    console.log(`✅ Total de imágenes con "blacro-cloud" en el path: ${blacroCloudResources.length}\n`);
    
    if (blacroCloudResources.length === 0) {
      console.log('❌ No se encontraron imágenes con "blacro-cloud" en el path');
      
      // Mostrar todas las carpetas principales para ayudar
      const mainFolders = new Set();
      allResources.forEach(r => {
        const mainFolder = r.public_id.split('/')[0];
        mainFolders.add(mainFolder);
      });
      
      console.log('\n📁 Carpetas principales disponibles en Cloudinary:');
      Array.from(mainFolders).sort().forEach(folder => {
        console.log(`  - ${folder}/`);
      });
      
      return;
    }
    
    // Organizar por estructura completa
    const organized = {};
    
    blacroCloudResources.forEach(resource => {
      const publicId = resource.public_id;
      const parts = publicId.split('/');
      const folder = parts.slice(0, -1).join('/') || 'root';
      const filename = parts[parts.length - 1];
      
      if (!organized[folder]) {
        organized[folder] = [];
      }
      
      organized[folder].push({
        filename: filename,
        fullPath: publicId,
        url: resource.secure_url,
        format: resource.format
      });
    });
    
    // Mostrar estructura encontrada
    console.log('📁 ESTRUCTURA ENCONTRADA CON "blacro-cloud":\n');
    
    Object.keys(organized).sort().forEach(folder => {
      console.log(`\n📂 ${folder}/`);
      console.log('─'.repeat(60));
      
      organized[folder].forEach(file => {
        console.log(`  📄 ${file.filename}.${file.format}`);
        console.log(`     Full Path: ${file.fullPath}`);
      });
    });
    
    // Mostrar patrones encontrados
    console.log('\n\n🔍 ANÁLISIS DE RUTAS:');
    const patterns = new Set();
    blacroCloudResources.forEach(r => {
      const parts = r.public_id.split('/');
      if (parts.length >= 2) {
        patterns.add(`${parts[0]}/${parts[1]}`);
      }
    });
    
    console.log('\nPatrones de carpetas encontrados:');
    Array.from(patterns).sort().forEach(pattern => {
      console.log(`  - ${pattern}/...`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

findBlacroCloudStructure();