const fetch = require('node-fetch');

async function getLatestTokenProfiles() {
  const url = 'https://api.dexscreener.com/token-profiles/latest/v1';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token profiles:', error);
    return [];
  }
}

module.exports = { getLatestTokenProfiles };
