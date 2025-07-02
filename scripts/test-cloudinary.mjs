import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function testCloudinary() {
  console.log('🔍 Testing Cloudinary connection...');
  
  try {
    // Test connection by getting account details
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful!');
    console.log('📊 Account status:', result);
    
    // Try to list some resources
    const resources = await cloudinary.api.resources({ max_results: 5 });
    console.log('📁 Available resources:', resources.resources.length);
    
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    console.log('\n💡 Please check:');
    console.log('1. Cloud name is correct');
    console.log('2. API key is correct');
    console.log('3. API secret is correct');
    console.log('4. Account is active');
  }
}

testCloudinary();