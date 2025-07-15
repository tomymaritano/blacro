import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function checkBlacroFolder() {
  console.log('🔍 Verificando la carpeta blacro en Cloudinary...\n');
  
  try {
    // Primero verificar las carpetas raíz
    console.log('📁 Verificando carpetas raíz...');
    try {
      const folders = await cloudinary.v2.api.root_folders();
      console.log('Carpetas encontradas:');
      folders.folders.forEach(folder => {
        console.log(`  - ${folder.name}/`);
      });
      
      // Buscar subcarpetas de blacro
      const blacroFolder = folders.folders.find(f => f.name === 'blacro');
      if (blacroFolder) {
        console.log('\n✅ Carpeta "blacro" encontrada!');
        
        try {
          const subfolders = await cloudinary.v2.api.sub_folders('blacro');
          if (subfolders.folders.length > 0) {
            console.log('\nSubcarpetas de blacro:');
            subfolders.folders.forEach(sub => {
              console.log(`  - blacro/${sub.name}/`);
            });
          }
        } catch (e) {
          console.log('(No hay subcarpetas o no se pudieron listar)');
        }
      }
    } catch (e) {
      console.log('Error listando carpetas:', e.message);
    }
    
    // Obtener todos los recursos de la carpeta blacro
    console.log('\n\n📸 Buscando imágenes en blacro/...');
    
    const allResources = [];
    let nextCursor = null;
    
    do {
      const options = {
        type: 'upload',
        prefix: 'blacro',
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
    
    console.log(`\n✅ Total de imágenes encontradas en blacro/: ${allResources.length}\n`);
    
    if (allResources.length === 0) {
      console.log('❌ No se encontraron imágenes en la carpeta blacro');
      return;
    }
    
    // Organizar por estructura
    const organized = {};
    
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const parts = publicId.split('/');
      const relativePath = parts.slice(1).join('/');
      const folder = parts.length > 2 ? parts.slice(1, -1).join('/') : 'root';
      const filename = parts[parts.length - 1];
      
      if (!organized[folder]) {
        organized[folder] = [];
      }
      
      organized[folder].push({
        filename: filename,
        publicId: publicId,
        relativePath: relativePath,
        format: resource.format,
        url: resource.secure_url
      });
    });
    
    // Mostrar estructura
    console.log('📁 ESTRUCTURA DE BLACRO:\n');
    
    Object.keys(organized).sort().forEach(folder => {
      console.log(`\n📂 ${folder === 'root' ? 'blacro/' : `blacro/${folder}/`}`);
      console.log('─'.repeat(50));
      
      // Mostrar primeros archivos
      const files = organized[folder];
      files.slice(0, 10).forEach(file => {
        console.log(`  📄 ${file.filename}.${file.format}`);
      });
      
      if (files.length > 10) {
        console.log(`  ... y ${files.length - 10} archivos más`);
      }
      
      console.log(`  Total: ${files.length} archivos`);
    });
    
    // Resumen por tipo de proyecto
    console.log('\n\n🎨 ANÁLISIS DE CONTENIDO:');
    
    const projects = {
      isolla: [],
      london: [],
      myrica: [],
      privatelimo: [],
      unicoin: [],
      youtube: [],
      logos: [],
      otros: []
    };
    
    allResources.forEach(resource => {
      const publicId = resource.public_id;
      const filename = publicId.split('/').pop();
      
      if (publicId.includes('isolla') || filename.includes('isolla')) {
        projects.isolla.push(publicId);
      } else if (publicId.includes('london') || filename.includes('london')) {
        projects.london.push(publicId);
      } else if (publicId.includes('myrica') || filename.includes('myrica')) {
        projects.myrica.push(publicId);
      } else if (publicId.includes('private') || filename.includes('private')) {
        projects.privatelimo.push(publicId);
      } else if (publicId.includes('unicoin') || filename.includes('unicoin')) {
        projects.unicoin.push(publicId);
      } else if (publicId.includes('youtube') || filename.includes('youtube')) {
        projects.youtube.push(publicId);
      } else if (filename.includes('logo') || publicId.includes('logo')) {
        projects.logos.push(publicId);
      } else {
        projects.otros.push(publicId);
      }
    });
    
    console.log('\nArchivos por proyecto:');
    Object.entries(projects).forEach(([project, files]) => {
      if (files.length > 0) {
        console.log(`  ${project}: ${files.length} archivos`);
      }
    });
    
    // Guardar estructura para referencia
    const output = {
      timestamp: new Date().toISOString(),
      totalImages: allResources.length,
      structure: organized,
      byProject: projects
    };
    
    await import('fs').then(fs => {
      fs.default.writeFileSync(
        'blacro-structure.json',
        JSON.stringify(output, null, 2)
      );
    });
    
    console.log('\n✅ Estructura guardada en blacro-structure.json');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBlacroFolder();