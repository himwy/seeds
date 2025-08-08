const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function compressImages() {
  try {
    console.log("Starting image compression with Sharp...");

    const assetsDir = path.join(__dirname, "public", "assets");
    const backupDir = path.join(assetsDir, "original");

    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Get all image files
    const imageFiles = fs
      .readdirSync(assetsDir)
      .filter(
        (file) =>
          file.match(/\.(jpg|jpeg|png)$/i) &&
          !fs.statSync(path.join(assetsDir, file)).isDirectory()
      );

    console.log("Original file sizes:");
    for (const file of imageFiles) {
      const originalPath = path.join(assetsDir, file);
      const backupPath = path.join(backupDir, file);
      const stats = fs.statSync(originalPath);

      console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

      // Create backup if it doesn't exist
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(originalPath, backupPath);
      }

      // Compress based on file type
      if (file.toLowerCase().match(/\.(jpg|jpeg)$/)) {
        await sharp(originalPath)
          .jpeg({
            quality: 75,
            progressive: true,
            mozjpeg: true,
          })
          .toFile(originalPath + ".tmp");
      } else if (file.toLowerCase().match(/\.png$/)) {
        await sharp(originalPath)
          .png({
            quality: 75,
            compressionLevel: 9,
            palette: true,
          })
          .toFile(originalPath + ".tmp");
      }

      // Replace original with compressed version
      if (fs.existsSync(originalPath + ".tmp")) {
        fs.renameSync(originalPath + ".tmp", originalPath);
      }
    }

    console.log("\nCompressed file sizes:");
    for (const file of imageFiles) {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    }

    console.log("\nImage compression completed successfully!");
  } catch (error) {
    console.error("Error compressing images:", error);
  }
}

compressImages();
