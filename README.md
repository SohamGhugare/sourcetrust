# SourceTrust: AI Dataset Marketplace with Story Protocol Integration

## Technical Overview

SourceTrust is a decentralized marketplace for AI datasets, leveraging Story Protocol for intellectual property registration and protection. The application is built using Next.js, TypeScript, and integrates with blockchain technologies.

## Core Technologies

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Blockchain**: Story Protocol SDK, Wagmi, Viem
- **Storage**: IPFS via Pinata
- **Authentication**: MetaMask Wallet

## Key Components

### 1. Wallet Integration (`src/components/WalletButton.tsx`)
- Implements MetaMask wallet connection
- Handles wallet state management
- Provides wallet address display and disconnection
- Uses Wagmi hooks for Web3 interactions

### 2. Marketplace Page (`src/pages/marketplace.tsx`)
- Core functionality for dataset management
- Implements Story Protocol IP registration
- Features:
  - Dataset listing
  - Dataset addition
  - IP registration
  - IPFS metadata storage

### 3. IPFS Integration (`src/utils/uploadToIpfs.ts`)
- Handles metadata upload to IPFS
- Uses Pinata SDK for reliable IPFS storage
- Returns IPFS hashes for metadata URIs

## Implementation Details

### Story Protocol Integration

```typescript
const registerDatasetAsIP = async (dataset: NewDataset) => {
  const client = await setupStoryClient();
  
  // Generate metadata
  const ipMetadata = client.ipAsset.generateIpMetadata({
    title: dataset.name,
    description: dataset.description,
    ipType: 'dataset',
    attributes: [{ key: 'Category', value: dataset.category }],
    creators: [{
      name: 'Dataset Owner',
      contributionPercent: 100,
      address: wallet?.account.address as Address,
    }],
  });

  // Upload to IPFS and register IP
  const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
  const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex');
  
  const response = await client.ipAsset.mintAndRegisterIp({
    spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
    recipient: wallet?.account.address as Address,
    ipMetadata: {
      ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
      ipMetadataHash: `0x${ipHash}`,
      // ... additional metadata
    },
  });
}
```

### Environment Configuration

Required environment variables:
```env
NEXT_PUBLIC_SPG_NFT_CONTRACT_ADDRESS=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here
```


## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Add required API keys and contract addresses

3. Run development server:
   ```bash
   npm run dev
   ```

## Architecture

### Data Flow
1. User connects wallet
2. Creates dataset entry
3. Metadata generated and uploaded to IPFS
4. IP registered through Story Protocol
5. NFT minted to user's wallet
6. UI updated with new dataset

### Security Considerations
- Wallet connection required for sensitive operations
- Metadata hashing for integrity
- IPFS for decentralized storage
- Smart contract security through Story Protocol

## Contract Addresses

- SPG NFT Contract (Aeneid): `0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc`

## Future Enhancements

1. Dataset search and filtering
2. Advanced metadata management
3. Dataset version control
4. Access control mechanisms
5. Dataset analytics

## Dependencies

Core dependencies:
- @story-protocol/core-sdk
- wagmi
- viem
- pinata-web3
- ethers
- next
- react
- tailwindcss
