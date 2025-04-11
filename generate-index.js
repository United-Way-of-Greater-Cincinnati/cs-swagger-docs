// generate-index.js
const fs = require("fs");
const path = require("path");

const docsDir = path.join(__dirname, "docs");

// Read all HTML files in the docs directory except index.html
fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error("Error reading docs directory:", err);
    process.exit(1);
  }

  const htmlFiles = files.filter(
    (file) => file.endsWith(".html") && file !== "index.html"
  );

  // Generate HTML links for each file
  const links = htmlFiles
    .map((f) => `<li><a href="${f}">${f.replace(".html", "")}</a></li>`)
    .join("\n");

  // Create an index file with Jekyll front matter
  const indexContent = `---
layout: default
title: My API Docs
---

<div class="page-header">
  <h1>Available API Documentation</h1>
</div>

<ul>
  ${links}
</ul>
`;

  fs.writeFile(path.join(docsDir, "index.html"), indexContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
    } else {
      console.log("index.html has been generated with a Jekyll theme.");
    }
  });
});
