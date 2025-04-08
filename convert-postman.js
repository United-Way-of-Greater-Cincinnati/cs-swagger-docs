const fs = require("fs");
const path = require("path");
const { transpile } = require("postman2openapi");

const inputDir = path.join(__dirname, "postman/collections");
const outputDir = path.join(__dirname, "docs");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".json"));

files.forEach((file) => {
  const collection = require(path.join(inputDir, file));
  const openapi = transpile(collection);
  const jsonOutput = JSON.stringify(openapi, null, 2);
  const outputFilename = file.replace(".json", ".openapi.json");

  fs.writeFileSync(path.join(outputDir, outputFilename), jsonOutput, "utf8");
  console.log(`Converted ${file} -> ${outputFilename}`);
});
