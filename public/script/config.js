const config = {
    apiBaseURL: "http://localhost:3000" // Default to local API URL
};

// Override with environment-specific URL if needed
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    config.apiBaseURL = window.location.origin; // Use the current origin for production
}
console.log("config complete");
console.log("url config: "+config.apiBaseURL);