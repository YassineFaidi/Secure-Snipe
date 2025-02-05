const fetch = require('node-fetch');

async function getTokenPoolData(chainId, tokenAddress) {
  const url = `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token pools:', error);
    return [];
  }
}

module.exports = { getTokenPoolData };
