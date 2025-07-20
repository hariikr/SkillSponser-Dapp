// BNB Chain Network Configuration
export const NETWORKS = {
  // BSC Testnet
  bscTestnet: {
    chainId: '0x61', // 97 in hex
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  // BSC Mainnet
  bscMainnet: {
    chainId: '0x38', // 56 in hex
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
};

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  bscTestnet: '0x0000000000000000000000000000000000000000', // Replace with deployed address
  bscMainnet: '0x0000000000000000000000000000000000000000', // Replace with deployed address
};

// Get current network configuration
export const getCurrentNetwork = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const chainId = window.ethereum.chainId;
    if (chainId === '0x61') return 'bscTestnet';
    if (chainId === '0x38') return 'bscMainnet';
  }
  return 'bscTestnet'; // Default to testnet
};

// Add BNB Chain to MetaMask
export const addBNBChainToMetaMask = async (network = 'bscTestnet') => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORKS[network]],
      });
      return true;
    } catch (error) {
      console.error('Error adding BNB Chain to MetaMask:', error);
      return false;
    }
  }
  return false;
};

// Switch to BNB Chain network
export const switchToBNBChain = async (network = 'bscTestnet') => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORKS[network].chainId }],
      });
      return true;
    } catch (error) {
      if (error.code === 4902) {
        // Chain not added, add it first
        return await addBNBChainToMetaMask(network);
      }
      console.error('Error switching to BNB Chain:', error);
      return false;
    }
  }
  return false;
}; 