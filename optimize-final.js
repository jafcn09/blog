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
    const tempPath = inputPath + '.optimized';

    try {
        let sharpInstance = sharp(inputPath);

        // Get image metadata to check dimensions
        const metadata = await sharpInstance.metadata();

        // Only resize if image is larger than target
        if (metadata.width > 1920 || metadata.height > 1080) {
            sharpInstance = sharpInstance.resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Apply format-specific optimizations
        if (ext === '.jpg' || ext === '.jpeg') {
            await sharpInstance.jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true
            }).toFile(tempPath);
        } else if (ext === '.png') {
            // For PNG files, try both PNG optimization and JPEG conversion
            const pngPath = tempPath + '.png';
            const jpegPath = tempPath + '.jpg';

            // Try PNG optimization
            await sharp(inputPath).png({
                quality: 90,
                compressionLevel: 9
            }).toFile(pngPath);

            // Try JPEG conversion
            await sharp(inputPath).jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true
            }).toFile(jpegPath);

            const pngSize = await getFileSize(pngPath);
            const jpegSize = await getFileSize(jpegPath);

            // Use the smaller file
            if (jpegSize < pngSize && jpegSize < originalSize * 0.8) { // Only convert if significant savings
                fs.copyFileSync(jpegPath, tempPath);
                console.log(`   📝 Note: Consider converting ${path.basename(inputPath)} to JPEG for ${((pngSize - jpegSize) / 1024).toFixed(1)}KB savings`);
            } else {
                fs.copyFileSync(pngPath, tempPath);
            }

            // Clean up
            if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
            if (fs.existsSync(jpegPath)) fs.unlinkSync(jpegPath);
        }

        const optimizedSize = await getFileSize(tempPath);

        // Only use optimized version if it's smaller
        if (optimizedSize < originalSize) {
            fs.copyFileSync(tempPath, inputPath);
            fs.unlinkSync(tempPath);
            return {
                inputSize: originalSize,
                outputSize: optimizedSize,
                savings: ((originalSize - optimizedSize) / originalSize * 100).toFixed(2)
            };
        } else {
            // Keep original
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            return {
                inputSize: originalSize,
                outputSize: originalSize,
                savings: 0
            };
        }

    } catch (error) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        throw error;
    }
}

async function main() {
    console.log('🖼️  Final Image Optimization Report\n');
    console.log('===================================\n');

    // Record original sizes
    console.log('📏 Original File Sizes:');
    const originalSizes = {};
    let totalOriginal = 0;

    for (const imageName of targetImages) {
        const imagePath = path.join(assetsDir, imageName);
        if (fs.existsSync(imagePath)) {
            const size = await getFileSize(imagePath);
            originalSizes[imageName] = size;
            totalOriginal += size;
            console.log(`   ${imageName}: ${(size / 1024).toFixed(1)}KB`);
        }
    }

    console.log(`\n   Total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB\n`);

    // Optimize images
    console.log('🔄 Optimizing Images:\n');
    const results = [];
    let totalOptimized = 0;

    for (const imageName of targetImages) {
        const imagePath = path.join(assetsDir, imageName);

        if (!fs.existsSync(imagePath)) {
            console.log(`   ⚠️  ${imageName}: File not found`);
            continue;
        }

        console.log(`   Processing ${imageName}...`);

        try {
            const result = await optimizeImage(imagePath);
            result.fileName = imageName;
            results.push(result);
            totalOptimized += result.outputSize;

            const status = result.savings > 0 ? '✅' : '⚪';
            console.log(`   ${status} ${(result.inputSize / 1024).toFixed(1)}KB → ${(result.outputSize / 1024).toFixed(1)}KB (${result.savings}% reduction)`);
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
        }
    }

    // Final report
    console.log('\n📊 Optimization Summary:');
    console.log('========================');
    console.log(`Files processed: ${results.length}`);
    console.log(`Size before: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Size after: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total savings: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Overall reduction: ${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(2)}%`);

    // Best optimizations
    const significantSavings = results.filter(r => r.savings > 5).sort((a, b) => b.savings - a.savings);
    if (significantSavings.length > 0) {
        console.log('\n🏆 Best Optimizations:');
        console.log('======================');
        significantSavings.forEach(result => {
            console.log(`${result.fileName}: ${result.savings}% (${((result.inputSize - result.outputSize) / 1024).toFixed(1)}KB saved)`);
        });
    }

    console.log('\n✅ Optimization complete!');
}

main().catch(console.error);