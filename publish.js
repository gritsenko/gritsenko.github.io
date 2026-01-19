/*
node publish.js YOUR_API_KEY (from itch.io)
*/
const fs = require('fs');
const Handlebars = require('handlebars');
const axios = require('axios');

// Get API key from command line arguments
const apiKey = process.argv[2];

//downloading josn from itchio api
if (apiKey) {
    // URL to fetch data from
    const apiUrl = `https://itch.io/api/1/${apiKey}/my-games`;

    // Function to fetch data and save it to a JSON file
    async function fetchDataAndSave() {
        try {
            const response = await axios.get(apiUrl);
            const jsonData = response.data;

            // Save data to a JSON file
            fs.writeFileSync('games.json', JSON.stringify(jsonData, null, 2));
            console.log('Data saved to games.json successfully.');
        } catch (error) {
            console.error('Error fetching or saving data:', error.message);
        }
    }

    // Call the function to fetch data and save it
    fetchDataAndSave();
} else {
    console.error('Please provide the API key as a command line argument.');
    console.error('Continuing with old data...');
    //process.exit(1);
}

// Read the template file
fs.readFile('index_source.html', 'utf8', (err, templateSource) => {
    if (err) {
        console.error('Error reading template file:', err);
        return;
    }

    // Compile the template
    const template = Handlebars.compile(templateSource);

    // Read the games data from JSON
    fs.readFile('games.json', 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading JSON data:', err);
            return;
        }

        // Parse JSON
        const data = JSON.parse(jsonData);

        // Filter only published games
        const publishedGames = data.games.filter(game => game.published);

        // Generate HTML using the template and filtered data
        const html = template({ games: publishedGames });

        // Write the generated HTML to index.html
        fs.writeFile('index.html', html, (err) => {
            if (err) {
                console.error('Error writing HTML file:', err);
                return;
            }
            console.log('index.html generated successfully.');
        });
    });
});
