# VeriChain - Blockchain Credential Verification System

A decentralized application for issuing and verifying academic credentials on the blockchain using React and Ethereum smart contracts.

## 🚀 Features

✅ **MetaMask Integration** - Connect your crypto wallet
✅ **Issue Credentials** - Create verifiable academic credentials on the blockchain
✅ **Verify Credentials** - Validate credential authenticity using Token IDs
✅ **Immutable Records** - Credentials stored permanently on the blockchain
✅ **Smart Contract Interaction** - Direct integration with Ethereum-based contracts
✅ **Real-time Verification** - Instant credential validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MetaMask** browser extension
- **A deployed smart contract** address

## 🛠️ Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### 1. Connect MetaMask Wallet

- Click the **"Connect Wallet"** button in the navbar
- Approve the connection in MetaMask
- Your wallet address will appear in the button

### 2. Set Contract Address

- After connecting your wallet, you'll see a contract setup form
- Enter your deployed smart contract address
- Click **"Set Contract"** to initialize the connection

### 3. Network Configuration

Make sure MetaMask is connected to the correct network where your contract is deployed:
- **Localhost** (for development): Chain ID 31337
- **Sepolia Testnet**: Chain ID 11155111
- **Ethereum Mainnet**: Chain ID 1

## 📝 How to Use

### Issue a Credential (For Institutions)

1. Navigate to the **"Issue Verifiable Credentials"** section
2. Fill in the form:
   - **Recipient Wallet Address**: The student's Ethereum address
   - **Credential Type**: Select from Course Completion, Competition Award, or Project Validation
   - **Credential Title**: e.g., "Bachelor of Science in Computer Science"
   - **Institution**: Your institution name
   - **Expiry Date** (Optional): When the credential expires
   - **IPFS URI** (Optional): Link to additional credential data

3. Click **"Generate & Issue Credential"**
4. Approve the transaction in MetaMask
5. Wait for confirmation (you'll receive a Token ID)

### Verify a Credential (For Anyone)

1. Navigate to the **"Access and Verify Your Achievements"** section
2. Enter a **Token ID** in the verification form
3. Click **"Verify Now"**
4. View the credential details:
   - Title, Institution, Type
   - Issuer and Recipient addresses
   - Issue and expiry dates
   - Revocation status
   - IPFS URI

### Check Your Credentials

- View sample credentials in the **"My Credentials"** section
- Click on any credential card to auto-fill its Token ID for verification

## 🔐 Smart Contract Functions

### Write Functions (Cost Gas)
- `issueCredential()` - Create a new credential NFT
- `revokeCredential()` - Revoke an existing credential
- `grantIssuerRole()` - Give issuer permissions to an address
- `revokeIssuerRole()` - Remove issuer permissions

### Read Functions (Free)
- `getCredential()` - Get credential details by Token ID
- `isValid()` - Check if a credential is valid
- `totalCredentials()` - Get total number of issued credentials
- `isIssuer()` - Check if an address has issuer role
- `tokenURI()` - Get the IPFS URI for a credential

## 🎨 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation with wallet connection
│   │   ├── Hero.jsx             # Landing page hero section
│   │   ├── IssueCredential.jsx  # Form to issue credentials
│   │   └── VerifyCredential.jsx # Credential verification interface
│   ├── pages/
│   │   └── HomePage.jsx         # Main page with contract setup
│   ├── styles/
│   │   ├── global.css           # Global styles
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   ├── IssueCredential.css
│   │   ├── VerifyCredential.css
│   │   └── HomePage.css
│   ├── utils/
│   │   ├── web3.js              # Web3 utility functions
│   │   └── contractABI.js       # Smart contract ABI
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## 🧪 Testing

To test the application:

1. **Connect to a test network** (e.g., Sepolia)
2. **Get test ETH** from a faucet
3. **Deploy your smart contract** or use an existing one
4. **Enter the contract address** in the app
5. **Try issuing a test credential** to your own address
6. **Verify the credential** using its Token ID

## ⚠️ Important Notes

- **Gas Fees**: Issuing and revoking credentials requires paying gas fees
- **Wallet Connection**: Always connect to the correct network
- **Contract Address**: Make sure you have the correct contract address
- **Issuer Role**: You need issuer permissions to issue credentials
- **Token IDs**: Start from 0 and increment with each new credential

## 🔗 Blockchain Integration Details

This app uses:
- **Ethers.js v5.7.2** for blockchain interactions
- **MetaMask** for wallet management
- **ERC-721** based credential NFTs
- **Role-based access control** for issuers

## 🐛 Troubleshooting

**"MetaMask is not installed"**
- Install MetaMask browser extension

**"Please connect wallet first"**
- Click "Connect Wallet" button in navbar

**"Contract not initialized"**
- Enter your contract address and click "Set Contract"

**Transaction fails**
- Check you have enough ETH for gas
- Verify you're on the correct network
- Ensure you have issuer role (for issuing credentials)

**Verification shows error**
- Check the Token ID is correct
- Ensure the credential exists
- Verify contract address is correct

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React, Ethers.js, and Solidity
