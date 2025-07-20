# 🚀 SkillSponsor BNB Chain Migration Guide

This guide will help you migrate your SkillSponsor project from Ethereum to BNB Chain (BSC).

## 📋 Prerequisites

1. **MetaMask Wallet** with your BSC address: `0xAbD44a309BC54020D16b30bEA1042cB7725A4187`
2. **BSC Testnet BNB** for testing (get from [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart))
3. **BSCScan API Key** for contract verification (get from [BSCScan](https://bscscan.com/apis))

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Your private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# BSCScan API Key for contract verification
BSCSCAN_API_KEY=your_bscscan_api_key_here
```

### 3. Add BNB Chain to MetaMask

#### BSC Testnet:
- **Network Name**: BSC Testnet
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Chain ID**: 97
- **Currency Symbol**: tBNB
- **Block Explorer**: https://testnet.bscscan.com/

#### BSC Mainnet:
- **Network Name**: BNB Smart Chain
- **RPC URL**: https://bsc-dataseed1.binance.org/
- **Chain ID**: 56
- **Currency Symbol**: BNB
- **Block Explorer**: https://bscscan.com/

## 🚀 Deployment Steps

### Step 1: Compile Smart Contract

```bash
npm run compile
```

### Step 2: Deploy to BSC Testnet

```bash
npm run deploy:testnet
```

This will:
- Deploy the contract to BSC Testnet
- Display the contract address
- Automatically verify the contract on BSCScan

### Step 3: Update Frontend Configuration

After deployment, update the contract address in `src/contract.js`:

```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

### Step 4: Deploy to BSC Mainnet (Optional)

```bash
npm run deploy:mainnet
```

## 🔍 Contract Verification

The deployment script automatically verifies contracts on BSCScan. If manual verification is needed:

```bash
# For testnet
npm run verify:testnet <CONTRACT_ADDRESS>

# For mainnet
npm run verify:mainnet <CONTRACT_ADDRESS>
```

## 🌐 Network Configuration

The frontend automatically detects and switches to BNB Chain networks. Key features:

- **Automatic Network Switching**: Users are prompted to switch to BNB Chain
- **Multi-Network Support**: Supports both testnet and mainnet
- **Fallback Handling**: Graceful error handling for network issues

## 💰 Getting Test BNB

### BSC Testnet Faucet
Visit [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart) to get test BNB.

### Alternative Faucets
- [BSC Testnet Faucet 2](https://faucet.quicknode.com/binance-smart-chain/bnb-testnet)
- [Chainlink Faucet](https://faucets.chain.link/bnb-chain-testnet)

## 🔧 Troubleshooting

### Common Issues

1. **"Insufficient funds"**
   - Ensure you have enough BNB for gas fees
   - Testnet: Get free tBNB from faucet
   - Mainnet: Purchase BNB from exchanges

2. **"Network not found"**
   - Add BNB Chain to MetaMask manually
   - Check RPC URL and Chain ID

3. **"Contract verification failed"**
   - Check BSCScan API key
   - Ensure contract compilation is successful
   - Verify constructor arguments

### Gas Optimization

BSC has lower gas fees than Ethereum:
- **Testnet**: ~1-5 Gwei
- **Mainnet**: ~3-10 Gwei

## 📊 Network Comparison

| Feature | Ethereum | BNB Chain |
|---------|----------|-----------|
| Block Time | ~12s | ~3s |
| Gas Fees | High | Low |
| TPS | ~15 | ~300 |
| Consensus | PoS | PoSA |

## 🔗 Useful Links

- [BSC Documentation](https://docs.bnbchain.org/)
- [BSCScan](https://bscscan.com/)
- [BSC Testnet Explorer](https://testnet.bscscan.com/)
- [BSC RPC Endpoints](https://docs.bnbchain.org/docs/rpc)
- [BSC Faucet](https://testnet.binance.org/faucet-smart)

## 🎯 Next Steps

1. **Deploy to Testnet**: Test all functionality
2. **Update Contract Address**: Update frontend configuration
3. **Test User Experience**: Verify wallet connections and transactions
4. **Deploy to Mainnet**: When ready for production
5. **Monitor**: Use BSCScan to monitor contract activity

## 🚨 Security Notes

- **Never share your private key**
- **Use testnet for development**
- **Verify contract addresses**
- **Test thoroughly before mainnet deployment**

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify network configuration
3. Ensure sufficient BNB balance
4. Check BSCScan for transaction status

---

**Happy Building on BNB Chain! 🚀** 