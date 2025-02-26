import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http } from "viem";
import { privateKeyToAccount, Address } from "viem/accounts";
import { zeroAddress } from 'viem';

const main = async () => {
  const privateKey = `0x${process.env.WALLET_PRIVATE_KEY}`;
  const account = privateKeyToAccount(privateKey as Address);

  const config: StoryConfig = {
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chainId: "aeneid",
  };
  
  const client = StoryClient.newClient(config);

  const newCollection = await client.nftClient.createNFTCollection({
    name: 'Dataset NFTs',
    symbol: 'DATA',
    isPublicMinting: true,
    mintOpen: true,
    mintFeeRecipient: zeroAddress,
    contractURI: '',
    txOptions: { waitForTransaction: true },
  });

  console.log(`New SPG NFT collection created at transaction hash ${newCollection.txHash}`);
  console.log(`NFT contract address: ${newCollection.spgNftContract}`);
};

main().catch(console.error); 