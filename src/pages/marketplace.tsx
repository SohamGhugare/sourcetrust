import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Geist } from "next/font/google";
import Navbar from '../components/Navbar';
import { StoryClient, StoryConfig, IpMetadata } from "@story-protocol/core-sdk";
import { custom, Address } from 'viem';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { hashMetadata } from '../utils/hash';
import { uploadJSONToIPFS } from '../utils/uploadToIpfs';
import { createHash } from 'crypto';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface Dataset {
  id: string;
  name: string;
  description: string;
  owner: string;
  category: string;
}

interface NewDataset {
  name: string;
  description: string;
  category: string;
}

export default function Marketplace() {
  const router = useRouter();
  const { data: wallet } = useWalletClient();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isAddingDataset, setIsAddingDataset] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newDataset, setNewDataset] = useState<NewDataset>({
    name: '',
    description: '',
    category: ''
  });

  const setupStoryClient = async (): Promise<StoryClient> => {
    if (!wallet) throw new Error("Wallet not connected");
    
    const config: StoryConfig = {
      account: wallet.account,
      transport: custom(wallet.transport),
      chainId: "aeneid",
    };
    return StoryClient.newClient(config);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDataset(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const registerDatasetAsIP = async (dataset: NewDataset) => {
    try {
      const client = await setupStoryClient();
      
      // Generate IP metadata
      const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
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

      const nftMetadata = {
        name: `${dataset.name} - Dataset NFT`,
        description: dataset.description,
        attributes: [{ trait_type: 'Category', value: dataset.category }]
      };

      const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
      const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex');
      console.log("ipIpfsHash", ipIpfsHash);
      const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
      const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex');
      console.log("nftIpfsHash", nftIpfsHash);

      const response = await client.ipAsset.mintAndRegisterIp({
        spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
        recipient: wallet?.account.address as Address,
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
          ipMetadataHash: `0x${ipHash}`,
          nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
          nftMetadataHash: `0x${nftHash}`,
        },
        allowDuplicates: true,
        txOptions: { waitForTransaction: true },
      });

      // Add the new dataset to the local state
      const newDatasetEntry: Dataset = {
        id: response.ipId as string || `0x${Date.now().toString(16)}`,
        name: dataset.name,
        description: dataset.description,
        owner: wallet?.account.address as string,
        category: dataset.category,
      };

      setDatasets(prev => [...prev, newDatasetEntry]);
      
      return response.ipId;
    } catch (error) {
      console.error('Error registering dataset:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerDatasetAsIP(newDataset);
      setIsAddingDataset(false);
      setNewDataset({ name: '', description: '', category: '' });
    } catch (error) {
      console.error('Error submitting dataset:', error);
      alert('Failed to register dataset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (!address) {
      router.push('/');
      return;
    }

    // Mock data - replace with actual API call
    setDatasets([
      {
        id: '1',
        name: 'Medical Image Dataset',
        description: 'A comprehensive collection of labeled medical images',
        owner: '0x1234...5678',
        category: 'Healthcare'
      },
      // Add more mock datasets...
    ]);
  }, [router]);

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50`}>
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dataset Marketplace</h1>
            <button
              onClick={() => setIsAddingDataset(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Dataset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{dataset.name}</h3>
                <p className="text-gray-600 mb-4">{dataset.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Owner: {dataset.owner}</span>
                  <span>{dataset.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Updated Add Dataset Modal */}
      {isAddingDataset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl text-gray-900 font-bold mb-4">Add New Dataset</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dataset Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newDataset.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 text-gray-900 px-3 py-2"
                  placeholder="Enter dataset name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newDataset.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 text-gray-900 px-3 py-2"
                  rows={3}
                  placeholder="Describe your dataset"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={newDataset.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 text-gray-900 px-3 py-2"
                  placeholder="e.g., Healthcare, Finance, etc."
                  required
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddingDataset(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Add Dataset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 