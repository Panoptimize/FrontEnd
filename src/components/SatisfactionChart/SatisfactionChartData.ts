import axios from 'axios';

// URL of the JSON file
const url = 'http://127.0.0.1:8080/dashboard/customer-satisfaction';

// Function to fetch and return JSON data
async function fetchJsonData(): Promise<any> {
    try {
        // Fetch the JSON data from the URL using Axios
        const response = await axios.get(url);

        // Check if the request was successful (status code 200)
        if (response.status === 200) {
            // Return the JSON data
            return response.data;
        } else {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data`);
    }
}