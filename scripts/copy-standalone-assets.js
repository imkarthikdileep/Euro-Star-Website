const fs = require("fs");
const path = require("path");

const standaloneDir = path.join(".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  console.log("No .next/standalone folder, skipping static copy.");
  process.exit(0);
}

const publicDir = "public";
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, path.join(standaloneDir, "public"), { recursive: true });
}

const staticDir = path.join(".next", "static");
if (fs.existsSync(staticDir)) {
  const target = path.join(standaloneDir, ".next", "static");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(staticDir, target, { recursive: true });
}

console.log("Copied public/ and .next/static into the standalone server.");
