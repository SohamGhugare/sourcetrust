import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
});

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
    try {
        const { IpfsHash } = await pinata.upload.json(jsonMetadata);
        return IpfsHash;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw new Error('Failed to upload to IPFS');
    }
} 