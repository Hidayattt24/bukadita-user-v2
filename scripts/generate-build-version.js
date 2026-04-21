/**
 * Generate Build Version Script
 * Auto-generate BUILD_VERSION untuk cache busting
 * Run sebelum build: node scripts/generate-build-version.js
 */

const fs = require('fs');
const path = require('path');

// Generate version berdasarkan timestamp
const buildVersion = `v${Date.now()}`;

// Path ke .env file
const envPath = path.join(__dirname, '..', '.env');
const envProductionPath = path.join(__dirname, '..', '.env.production');

/**
 * Update atau tambahkan BUILD_VERSION di .env file
 */
function updateEnvFile(filePath) {
  try {
    let envContent = '';
    
    // Baca file jika ada
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    }

    // Check apakah BUILD_VERSION sudah ada
    const buildVersionRegex = /^NEXT_PUBLIC_BUILD_VERSION=.*/m;
    
    if (buildVersionRegex.test(envContent)) {
      // Update existing
      envContent = envContent.replace(
        buildVersionRegex,
        `NEXT_PUBLIC_BUILD_VERSION=${buildVersion}`
      );
      console.log(`✅ Updated BUILD_VERSION in ${path.basename(filePath)}: ${buildVersion}`);
    } else {
      // Tambahkan baru
      envContent += `\n# Auto-generated build version\nNEXT_PUBLIC_BUILD_VERSION=${buildVersion}\n`;
      console.log(`✅ Added BUILD_VERSION to ${path.basename(filePath)}: ${buildVersion}`);
    }

    // Write back to file
    fs.writeFileSync(filePath, envContent);
  } catch (error) {
    console.error(`❌ Error updating ${path.basename(filePath)}:`, error.message);
  }
}

// Update .env
if (fs.existsSync(envPath)) {
  updateEnvFile(envPath);
} else {
  console.log('⚠️  .env file not found, skipping...');
}

// Update .env.production
if (fs.existsSync(envProductionPath)) {
  updateEnvFile(envProductionPath);
} else {
  console.log('⚠️  .env.production file not found, skipping...');
}

console.log('\n🎉 Build version generated successfully!');
console.log(`📦 Version: ${buildVersion}`);
console.log('\n💡 Tip: Run "npm run build" to build with new version\n');
