const fs = require("fs");
const path = require("path");

const docsDir = path.join(__dirname, "docs");

// Read all HTML files in the docs directory
fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error("Error reading docs directory:", err);
    process.exit(1);
  }

  // Filter out index.html (if it exists) from the list
  const htmlFiles = files.filter(
    (file) => file.endsWith(".html") && file !== "index.html"
  );

  // Generate HTML links for each file
  const links = htmlFiles
    .map((f) => `<li><a href="${f}">${f}</a></li>`)
    .join("\n");

  const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My API Docs</title>
</head>
<body>
  <h1>Available API Documentation</h1>
  <ul>
    ${links}
  </ul>
</body>
</html>
`;

  fs.writeFile(path.join(docsDir, "index.html"), indexContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
    } else {
      console.log("index.html has been generated successfully.");
    }
  });
});
