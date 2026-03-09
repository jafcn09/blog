const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const assetsDir = './src/assets';
const targetImages = [
    'portafolio1.jpg', 'portafolio2.jpeg', 'portafolio3.jpg', 'portafolio4.jpg',
    'portafolio5.jpg', 'portafolio6.png', 'portafolio7.jpg', 'portafolio8.jpeg',
    'portafolio9.jpeg', 'portafolio10.jpg', 'portafolio11.jpg', 'portafolio12.jpg',
    'portafolio13.jpg', 'portafolio14.jpeg', 'portafolio15.jpg', 'portafolio16.jpg',
    'videotranscribe.jpg', 'prismpr.jpg', 'appointments.jpg', 'coderesolutions.png'
];

// Optimization settings
const jpegQuality = 85;
const pngQuality = 90;
const webpQuality = 85;
const maxWidth = 1920;
const maxHeight = 1080;

async function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.size;
    } catch (error) {
        return 0;
    }
}

async function optimizeImage(inputPath) {
    const inputSize = await getFileSize(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const tempPath = inputPath + '.temp';

    let sharpInstance = sharp(inputPath)
        .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true
        });

    // Apply format-specific optimizations
    if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({
            quality: jpegQuality,
            progressive: true,
            mozjpeg: true
        });
    } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({
            quality: pngQuality,
            compressionLevel: 9,
            progressive: true
        });
    }

    await sharpInstance.toFile(tempPath);

    // Replace original with optimized version
    fs.renameSync(tempPath, inputPath);

    const outputSize = await getFileSize(inputPath);
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(2);

    return {
        input: inputPath,
        inputSize,
        outputSize,
        savings: parseFloat(savings)
    };
}

async function optimizeAllImages() {
    console.log('🖼️  Starting image optimization...\n');

    const results = [];
    let totalInputSize = 0;
    let totalOutputSize = 0;

    for (const imageName of targetImages) {
        const inputPath = path.join(assetsDir, imageName);

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  Warning: ${imageName} not found, skipping...`);
            continue;
        }

        // Create backup
        const backupPath = path.join(assetsDir, 'backup_' + imageName);
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
        }

        console.log(`🔄 Optimizing ${imageName}...`);

        try {
            const result = await optimizeImage(inputPath);
            results.push(result);
            totalInputSize += result.inputSize;
            totalOutputSize += result.outputSize;

            console.log(`   ✅ ${imageName}: ${(result.inputSize / 1024).toFixed(1)}KB → ${(result.outputSize / 1024).toFixed(1)}KB (${result.savings}% reduction)`);
        } catch (error) {
            console.log(`   ❌ Error optimizing ${imageName}: ${error.message}`);
        }
    }

    const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(2);

    console.log('\n📊 Optimization Summary:');
    console.log('========================');
    console.log(`Total files processed: ${results.length}`);
    console.log(`Total size before: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total size after: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total savings: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);

    console.log('\n📝 Detailed Results:');
    console.log('===================');
    results.forEach(result => {
        console.log(`${path.basename(result.input)}: ${(result.inputSize / 1024).toFixed(1)}KB → ${(result.outputSize / 1024).toFixed(1)}KB (${result.savings}% reduction)`);
    });

    return results;
}

// Run optimization
optimizeAllImages().catch(console.error);