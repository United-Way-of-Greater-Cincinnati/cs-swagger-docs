// generate-swagger-pages.js
const fs = require("fs");
const path = require("path");

// Directory containing your OpenAPI JSON files
const docsDir = path.join(__dirname, "docs");

// Template for the Swagger UI page
const generateHtmlPage = (jsonFilename) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Swagger UI - ${jsonFilename}</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js"></script>
  <script>
    const ui = SwaggerUIBundle({
      url: "./${jsonFilename}",
      dom_id: '#swagger-ui',
      deepLinking: true,
    });
  </script>
</body>
</html>
`;
};

fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error("Error reading docs directory", err);
    process.exit(1);
  }

  // Filter for files that end with .openapi.json
  const apiFiles = files.filter((file) => file.endsWith(".openapi.json"));

  if (!apiFiles.length) {
    console.log("No .openapi.json files found in docs/");
    process.exit(0);
  }

  apiFiles.forEach((file) => {
    const htmlContent = generateHtmlPage(file);
    // Create a HTML file using the same basename (e.g., myapi.openapi.json -> myapi.html)
    const baseName = file
      .replace(/\.openapi\.json$/, "")
      .toLowerCase()
      .split(" ")
      .join("-");
    const htmlFilename = baseName + ".html";
    fs.writeFile(path.join(docsDir, htmlFilename), htmlContent, (err) => {
      if (err) {
        console.error(`Error writing ${htmlFilename}:`, err);
      } else {
        console.log(`Generated ${htmlFilename}`);
      }
    });
  });
});
