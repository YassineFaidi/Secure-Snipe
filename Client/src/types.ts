export interface Project {
  tokenName: string;
  contractAddress: string;
  liquidity: number;
  firstTradeTimestamp: string;
  dexScreenerLink	: string;
}

export interface ApiResponse {
  projects: Project[];
}