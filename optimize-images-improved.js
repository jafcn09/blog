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
    const originalSize = await getFileSize(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, ext);
    const dirName = path.dirname(inputPath);

    // First, restore from backup if it exists
    const backupPath = path.join(dirName, 'backup_' + path.basename(inputPath));
    if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, inputPath);
    }

    const inputSize = await getFileSize(inputPath);

    // Try different optimization strategies
    let bestResult = { path: inputPath, size: inputSize, format: ext };

    // Strategy 1: Optimize in original format
    await tryOptimization(inputPath, inputPath + '.temp1', ext, inputSize, bestResult);

    // Strategy 2: For PNG files, try converting to JPEG (if no transparency)
    if (ext === '.png') {
        const jpegPath = inputPath + '.temp2';
        await tryOptimization(inputPath, jpegPath, '.jpg', inputSize, bestResult);
    }

    // Apply the best optimization
    if (bestResult.path !== inputPath) {
        fs.copyFileSync(bestResult.path, inputPath);

        // If we converted PNG to JPEG, rename the file
        if (ext === '.png' && bestResult.format === '.jpg') {
            const newPath = path.join(dirName, baseName + '.jpg');
            fs.renameSync(inputPath, newPath);

            // Update references (this would need to be done manually in the code)
            console.log(`   📝 Note: ${path.basename(inputPath)} converted to ${path.basename(newPath)}`);
            bestResult.path = newPath;
        }
    }

    // Clean up temp files
    ['temp1', 'temp2'].forEach(suffix => {
        const tempFile = inputPath + '.' + suffix;
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
    });

    const finalSize = await getFileSize(bestResult.path);
    const savings = ((inputSize - finalSize) / inputSize * 100);

    return {
        input: inputPath,
        output: bestResult.path,
        inputSize,
        outputSize: finalSize,
        savings: parseFloat(savings.toFixed(2)),
        format: bestResult.format
    };
}

async function tryOptimization(inputPath, outputPath, targetFormat, originalSize, bestResult) {
    try {
        let sharpInstance = sharp(inputPath)
            .resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });

        // Apply format-specific optimizations
        if (targetFormat === '.jpg' || targetFormat === '.jpeg') {
            sharpInstance = sharpInstance.jpeg({
                quality: jpegQuality,
                progressive: true,
                mozjpeg: true
            });
        } else if (targetFormat === '.png') {
            sharpInstance = sharpInstance.png({
                quality: pngQuality,
                compressionLevel: 9,
                progressive: true
            });
        }

        await sharpInstance.toFile(outputPath);

        const optimizedSize = await getFileSize(outputPath);

        // Only use this optimization if it's better than current best
        if (optimizedSize < bestResult.size) {
            bestResult.path = outputPath;
            bestResult.size = optimizedSize;
            bestResult.format = targetFormat;
        }
    } catch (error) {
        // Silently fail for format conversion attempts
    }
}

async function optimizeAllImages() {
    console.log('🖼️  Starting improved image optimization...\n');

    const results = [];
    let totalInputSize = 0;
    let totalOutputSize = 0;

    // First, record original sizes
    console.log('📏 Recording original sizes...');
    for (const imageName of targetImages) {
        const inputPath = path.join(assetsDir, imageName);
        if (fs.existsSync(inputPath)) {
            const size = await getFileSize(inputPath);
            console.log(`   ${imageName}: ${(size / 1024).toFixed(1)}KB`);
        }
    }
    console.log('');

    for (const imageName of targetImages) {
        const inputPath = path.join(assetsDir, imageName);

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  Warning: ${imageName} not found, skipping...`);
            continue;
        }

        console.log(`🔄 Optimizing ${imageName}...`);

        try {
            const result = await optimizeImage(inputPath);
            results.push(result);
            totalInputSize += result.inputSize;
            totalOutputSize += result.outputSize;

            const status = result.savings > 0 ? '✅' : '⚪';
            console.log(`   ${status} ${imageName}: ${(result.inputSize / 1024).toFixed(1)}KB → ${(result.outputSize / 1024).toFixed(1)}KB (${result.savings}% ${result.savings > 0 ? 'reduction' : 'increase'})`);
        } catch (error) {
            console.log(`   ❌ Error optimizing ${imageName}: ${error.message}`);
        }
    }

    const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(2);

    console.log('\n📊 Final Optimization Summary:');
    console.log('=============================');
    console.log(`Total files processed: ${results.length}`);
    console.log(`Total size before: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total size after: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total savings: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);

    console.log('\n📈 Best Optimizations:');
    console.log('=====================');
    const sortedResults = results.filter(r => r.savings > 0).sort((a, b) => b.savings - a.savings);
    sortedResults.slice(0, 5).forEach(result => {
        console.log(`${path.basename(result.input)}: ${result.savings}% reduction (${(result.inputSize / 1024).toFixed(1)}KB → ${(result.outputSize / 1024).toFixed(1)}KB)`);
    });

    return results;
}

// Run optimization
optimizeAllImages().catch(console.error);