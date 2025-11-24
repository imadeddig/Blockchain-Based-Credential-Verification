// Import contract ABI
import { CONTRACT_ABI } from './contractABI.js';

// Access ethers from global window object (loaded via CDN in index.html)
const getEthers = () => {
  if (typeof window.ethers === 'undefined') {
    throw new Error('Ethers.js is not loaded! Make sure the CDN script is included in index.html');
  }
  return window.ethers;
};

let provider = null;
let signer = null;
let contract = null;
let userAddress = null;

// Connect to MetaMask wallet
export const connectWallet = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed!');
    }

    const ethers = getEthers();

    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });

    userAddress = accounts[0];
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const network = await provider.getNetwork();

    return {
      address: userAddress,
      network: network.name,
      chainId: network.chainId
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Initialize contract with address
export const initializeContract = (contractAddress) => {
  if (!contractAddress) {
    throw new Error('Contract address is required!');
  }

  if (!signer) {
    throw new Error('Please connect wallet first!');
  }

  try {
    const ethers = getEthers();
    contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.error('Error initializing contract:', error);
    throw error;
  }
};

// Get current wallet address
export const getWalletAddress = () => userAddress;

// Get contract instance
export const getContract = () => contract;

// Issue a new credential
export const issueCredential = async (credentialData) => {
  if (!contract) {
    throw new Error('Contract not initialized!');
  }

  try {
    const { to, credentialType, title, institution, expiryDate, credentialHash, ipfsURI } = credentialData;
    
    const tx = await contract.issueCredential(
      to,
      credentialType,
      title,
      institution,
      expiryDate || 0,
      credentialHash,
      ipfsURI
    );

    const receipt = await tx.wait();
    const event = receipt.events?.find(e => e.event === 'CredentialIssued');
    const tokenId = event?.args?.tokenId;

    return {
      tokenId: tokenId?.toString(),
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error issuing credential:', error);
    
    // Provide helpful error messages
    if (error.code === 'CALL_EXCEPTION') {
      throw new Error('Transaction failed - you may not have ISSUER_ROLE permissions. Contact the contract owner to grant you issuer privileges.');
    }
    
    throw error;
  }
};

// Verify a credential by token ID
export const verifyCredential = async (tokenId) => {
  if (!contract) {
    throw new Error('Contract not initialized!');
  }

  try {
    // First check if credential exists by checking total supply
    const totalCredentials = await contract.totalCredentials();
    if (tokenId >= totalCredentials.toNumber()) {
      throw new Error(`Credential #${tokenId} does not exist. Total credentials issued: ${totalCredentials.toNumber()}`);
    }

    const isValid = await contract.isValid(tokenId);
    const credential = await contract.getCredential(tokenId);

    const types = ['Course Completion', 'Competition Award', 'Project Validation'];

    return {
      isValid,
      data: {
        issuer: credential.issuer,
        recipient: credential.recipient,
        type: types[credential.ctype],
        typeId: credential.ctype,
        title: credential.title,
        institution: credential.institution,
        issueDate: new Date(credential.issueDate * 1000),
        expiryDate: credential.expiryDate == 0 ? null : new Date(credential.expiryDate * 1000),
        credentialHash: credential.credentialHash,
        revoked: credential.revoked,
        ipfsURI: credential.ipfsURI
      }
    };
  } catch (error) {
    console.error('Error verifying credential:', error);
    throw error;
  }
};

// Get total credentials count
export const getTotalCredentials = async () => {
  if (!contract) {
    throw new Error('Contract not initialized!');
  }

  try {
    const total = await contract.totalCredentials();
    return total.toString();
  } catch (error) {
    console.error('Error getting total credentials:', error);
    throw error;
  }
};

// Check if address is an issuer
export const checkIsIssuer = async (address) => {
  if (!contract) {
    throw new Error('Contract not initialized!');
  }

  try {
    const isIssuer = await contract.isIssuer(address);
    return isIssuer;
  } catch (error) {
    console.error('Error checking issuer status:', error);
    throw error;
  }
};

// Revoke a credential
export const revokeCredential = async (tokenId, reason) => {
  if (!contract) {
    throw new Error('Contract not initialized!');
  }

  try {
    const tx = await contract.revokeCredential(tokenId, reason);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error revoking credential:', error);
    throw error;
  }
};

// Listen for account changes
export const onAccountsChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      userAddress = accounts[0];
      callback(accounts[0]);
    });
  }
};

// Listen for network changes
export const onChainChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId) => {
      callback(chainId);
      // Reload the page as recommended by MetaMask
      window.location.reload();
    });
  }
};
