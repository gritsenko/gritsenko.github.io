/*
node publish.js YOUR_API_KEY (from itch.io)
*/
const fs = require('fs').promises;
const Handlebars = require('handlebars');
const axios = require('axios');

// Get API key from command line arguments
const apiKey = process.argv[2];

async function main() {
    try {
        let jsonData;

        //downloading josn from itchio api
        if (apiKey) {
            // URL to fetch data from
            const apiUrl = `https://itch.io/api/1/${apiKey}/my-games`;

            try {
                const response = await axios.get(apiUrl);
                jsonData = response.data;

                // Save data to a JSON file
                await fs.writeFile('games.json', JSON.stringify(jsonData, null, 2));
                console.log('Data saved to games.json successfully.');
            } catch (error) {
                console.error('Error fetching or saving data:', error.message);
                throw error;
            }
        } else {
            console.error('Please provide the API key as a command line argument.');
            console.error('Continuing with old data...');
            try {
                const data = await fs.readFile('games.json', 'utf8');
                jsonData = JSON.parse(data);
            } catch (err) {
                console.error('No existing data found. Exiting.');
                process.exit(1);
            }
        }

        // Read the template file
        const templateSource = await fs.readFile('index_source.html', 'utf8');

        // Compile the template
        const template = Handlebars.compile(templateSource);

        // Parse JSON data
        const data = jsonData;

        console.log(`\n=== Game Processing Summary ===`);
        console.log(`Total games from itch.io API: ${data.games.length}`);

        // Filter only published games
        const publishedGames = data.games.filter(game => game.published);
        const unpublishedGames = data.games.filter(game => !game.published);

        console.log(`Published games to include in portfolio: ${publishedGames.length}`);
        console.log(`Unpublished games excluded: ${unpublishedGames.length}\n`);

        if (publishedGames.length > 0) {
            console.log(`=== Published Games ===`);
            publishedGames.forEach((game, index) => {
                console.log(`${index + 1}. ${game.title}`);
                console.log(`   URL: ${game.url}`);
                console.log(`   Published: ${game.published_at}`);
                console.log(`   Views: ${game.views_count}, Downloads: ${game.downloads_count}`);
            });
        }

        if (unpublishedGames.length > 0) {
            console.log(`\n=== Unpublished Games (excluded) ===`);
            unpublishedGames.forEach((game, index) => {
                console.log(`${index + 1}. ${game.title} - ${game.url}`);
            });
        }

        console.log(`\n=== Generating portfolio with ${publishedGames.length} games ===`);

        // Generate HTML using the template and filtered data
        const html = template({ games: publishedGames });

        // Write the generated HTML to index.html
        await fs.writeFile('index.html', html);
        console.log('index.html generated successfully.');
        console.log(`\n=== Portfolio generation complete ===`);

    } catch (error) {
        console.error('Error in main process:', error);
        process.exit(1);
    }
}

main();
