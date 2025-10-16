#!/usr/bin/env node

/**
 * Pre-deployment verification script
 * Run this before deploying to catch common issues
 */

const fs = require("fs");
const path = require("path");

const errors = [];
const warnings = [];

console.log("🔍 Running pre-deployment checks...\n");

// 1. Check .env.example exists
console.log("✓ Checking environment files...");
const envExample = path.join(__dirname, ".env.example");
if (!fs.existsSync(envExample)) {
  errors.push(".env.example file is missing");
}

// 2. Check .env is not committed
const gitignore = path.join(__dirname, ".gitignore");
if (fs.existsSync(gitignore)) {
  const content = fs.readFileSync(gitignore, "utf8");
  if (!content.includes(".env")) {
    warnings.push(".env should be in .gitignore");
  }
}

// 3. Check required files
console.log("✓ Checking required files...");
const requiredFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "DEPLOYMENT.md",
];

requiredFiles.forEach((file) => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    errors.push(`Required file missing: ${file}`);
  }
});

// 4. Check package.json
console.log("✓ Checking package.json...");
const packageJson = require("./package.json");

if (!packageJson.scripts.build) {
  errors.push("Build script missing in package.json");
}

if (!packageJson.engines) {
  warnings.push("Node.js version not specified in package.json engines");
}

// 5. Check environment variables usage
console.log("✓ Checking environment variables...");
const envVars = [
  "NEXT_PUBLIC_BACKEND_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const envExampleContent = fs.readFileSync(envExample, "utf8");
envVars.forEach((varName) => {
  if (!envExampleContent.includes(varName)) {
    warnings.push(
      `Environment variable ${varName} not documented in .env.example`
    );
  }
});

// 6. Check for sensitive data
console.log("✓ Checking for sensitive data...");
const sensitivePatterns = [
  /sk-[a-zA-Z0-9]{32,}/g, // Supabase service keys
  /[A-Za-z0-9+/]{100,}={0,2}/g, // Long base64 strings
];

function checkFileForSecrets(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  sensitivePatterns.forEach((pattern) => {
    if (pattern.test(content)) {
      warnings.push(`Possible sensitive data in ${filePath}`);
    }
  });
}

// Check key files
const filesToCheck = ["src/lib/apiClient.ts", "src/lib/supabase.ts"];

filesToCheck.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    checkFileForSecrets(filePath);
  }
});

// 7. Summary
console.log("\n📊 Pre-deployment Check Results:\n");

if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ All checks passed! Ready to deploy.\n");
  process.exit(0);
}

if (errors.length > 0) {
  console.log("❌ ERRORS (Must fix before deploying):");
  errors.forEach((error) => console.log(`  - ${error}`));
  console.log("");
}

if (warnings.length > 0) {
  console.log("⚠️  WARNINGS (Should fix):");
  warnings.forEach((warning) => console.log(`  - ${warning}`));
  console.log("");
}

if (errors.length > 0) {
  console.log("❌ Deployment check failed. Fix errors above.\n");
  process.exit(1);
} else {
  console.log("⚠️  Warnings found but deployment can proceed.\n");
  process.exit(0);
}
