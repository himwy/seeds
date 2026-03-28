const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const fs = require("fs");

async function compressImages() {
  try {
    console.log("Starting image compression...");

    // Create backup directory
    const backupDir = path.join(__dirname, "public", "assets", "original");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Get original file sizes
    const assetsDir = path.join(__dirname, "public", "assets");
    const files = fs
      .readdirSync(assetsDir)
      .filter(
        (file) =>
          file.match(/\.(jpg|jpeg|png)$/i) &&
          !fs.statSync(path.join(assetsDir, file)).isDirectory()
      );

    console.log("Original file sizes:");
    for (const file of files) {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

      // Create backup
      const backupPath = path.join(backupDir, file);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }
    }

    // Compress images
    await imagemin(["public/assets/*.{jpg,jpeg,png}"], {
      destination: "public/assets",
      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    console.log("\nCompressed file sizes:");
    for (const file of files) {
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
