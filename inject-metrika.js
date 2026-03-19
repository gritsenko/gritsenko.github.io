const fs = require('fs');
const path = require('path');

const METRIKA_FILE = 'metrika.html.tpl';

function main() {
    if (!fs.existsSync(METRIKA_FILE)) {
        console.error(`Error: Template file ${METRIKA_FILE} not found.`);
        process.exit(1);
    }

    const metrikaContent = fs.readFileSync(METRIKA_FILE, 'utf8').trim();
    
    function processDirectory(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Skip common folders
                if (['.git', 'node_modules', 'images', 'textures'].includes(file)) continue;
                processDirectory(fullPath);
            } else if (file.endsWith('.html') && file !== METRIKA_FILE) {
                processFile(fullPath, metrikaContent);
            }
        }
    }

    function processFile(filePath, metrika) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if metrika already exists
        if (content.includes('<!-- Yandex.Metrika counter -->')) {
            console.log(`[SKIP] ${filePath} - already has metrika block`);
            return;
        }

        // Search for <body ...> (case insensitive)
        const bodyMatch = content.match(/<body[^>]*>/i);
        if (bodyMatch) {
            const bodyTag = bodyMatch[0];
            const index = content.indexOf(bodyTag) + bodyTag.length;
            
            // Inject right after the tag
            content = content.slice(0, index) + '\n' + metrika + content.slice(index);
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`[DONE] ${filePath} - metrika injected`);
        } else {
            console.warn(`[WARN] ${filePath} - could not find <body> tag`);
        }
    }

    console.log('Starting Yandex.Metrika injection...');
    processDirectory('.');
    console.log('Injection finished.');
}

main();
