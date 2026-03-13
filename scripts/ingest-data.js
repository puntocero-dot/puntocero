/**
 * Automatic Ingestion Script for Punto Cero Core
 * 
 * This script reads 'projects_config.json' from the root directory
 * and updates the project data and credentials.
 */

const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const CONFIG_PATH = path.join(__dirname, '..', 'projects_config.json');
const CONSTANTS_PATH = path.join(__dirname, '..', 'src', 'lib', 'constants.ts');
const SCHEMA_PATH = path.join(__dirname, '..', 'supabase', 'schema.sql');

// Use same key logic as crypto.ts for local development consistency
const ENCRYPTION_KEY = process.env.CREDENTIALS_ENCRYPTION_KEY || "default-dev-key-change-me!!";

function updateConstants(projects) {
  let content = fs.readFileSync(CONSTANTS_PATH, 'utf8');
  
  // Encrypt passwords before saving
  const processedProjects = projects.map(p => ({
    ...p,
    credentials: p.credentials?.map(c => {
      if (c.password) {
        return {
          ...c,
          encrypted_password: CryptoJS.AES.encrypt(c.password, ENCRYPTION_KEY).toString(),
          password: undefined // remove plain text
        };
      }
      return c;
    })
  }));

  // Create the new PROJECTS array string
  const projectsString = JSON.stringify(processedProjects, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'"); // Use single quotes
    
  const updatedContent = content.replace(
    /export const PROJECTS = \[[\s\S]*?\] as const;/,
    `export const PROJECTS = ${projectsString} as const;`
  );
  
  fs.writeFileSync(CONSTANTS_PATH, updatedContent);
  console.log('✅ src/lib/constants.ts updated');
}

function generateSql(projects, licenses) {
  // Simple SQL generator for bulk insertion
  // In a real scenario, this would be more complex and handle conflicts
  console.log('ℹ️ SQL generation logic can be extended here for local DB updates');
}

try {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Error: projects_config.json not found in root.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  
  if (config.projects) {
    updateConstants(config.projects);
  }
  
  if (config.licenses) {
    generateSql(config.projects, config.licenses);
  }
  
  console.log('🚀 Ingestion complete! Run "git add . && git commit -m \'data: auto-update\' && git push" to sync.');

} catch (error) {
  console.error('❌ Error processing config:', error.message);
}
