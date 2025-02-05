const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware to allow cross-origin requests (for testing frontend)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Endpoint 1: Get latest token profiles
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

// Endpoint 2: Get token pools based on chainId and tokenAddress
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

// Endpoint: /projects (To detect new projects)
app.get('/projects', async (req, res) => {
  try {
    // Get the latest token profiles
    const tokenProfiles = await getLatestTokenProfiles();
    
    const projects = [];

    // Process each token profile
    for (const profile of tokenProfiles) {
      const tokenAddress = profile.tokenAddress;
      const chainId = profile.chainId;
      
      // Fetch pools for the token
      const pools = await getTokenPoolData(chainId, tokenAddress);
      
      // Extract details for each pool
      pools.forEach(pool => {
        if (pool?.liquidity?.usd < 50) { // Only include tokens with liquidity less than $50
          const project = {
            tokenName: pool.baseToken.name, // Token Name
            contractAddress: pool.baseToken.address, // Token Contract Address
            liquidity: pool.liquidity.usd, // Liquidity in USD
            firstTradeTimestamp: pool.pairCreatedAt, // First trade timestamp
            dexScreenerLink: pool.url // DexScreener Link
          };
          projects.push(project);
        }
      });
    }

    res.json(projects);
  } catch (error) {
    console.error('Error fetching project data:', error);
    res.status(500).json({ message: 'Error fetching project data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
