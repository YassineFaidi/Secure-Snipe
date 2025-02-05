const { getLatestTokenProfiles } = require('../services/tokenService');
const { getTokenPoolData } = require('../services/poolService');

// Controller to handle /projects endpoint
async function getProjects(req, res) {
  try {
    const tokenProfiles = await getLatestTokenProfiles();
    const projects = [];

    for (const profile of tokenProfiles) {
      const { tokenAddress, chainId } = profile;
      const pools = await getTokenPoolData(chainId, tokenAddress);

      pools.forEach(pool => {
        if (pool?.liquidity?.usd < 50) {
          const project = {
            tokenName: pool.baseToken.name,
            contractAddress: pool.baseToken.address,
            liquidity: pool.liquidity.usd,
            firstTradeTimestamp: pool.pairCreatedAt,
            dexScreenerLink: pool.url,
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
}

module.exports = { getProjects };
