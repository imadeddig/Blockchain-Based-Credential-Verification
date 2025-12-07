## 4.6 User Workflows

### **Credential Issuance**
1. User connects their wallet  
2. Contract instance is initialized  
3. User fills out the credential issuance form  
4. User reviews the MetaMask transaction  
5. User approves and signs the transaction  
6. System returns a **Token ID** as confirmation  

### **Credential Verification**
1. User enters a Token ID  
2. System performs a free read-operation on the blockchain  
3. Credential details and validity status are displayed  

---

## 5. Development and Deployment

### 5.1 Technology Stack Summary

| Layer          | Technology          | Purpose                              |
|----------------|----------------------|--------------------------------------|
| Smart Contract | Solidity             | Credential logic and storage         |
| Blockchain     | Ethereum (Sepolia)   | Transaction processing               |
| Frontend       | React 19.2.0         | User interface                       |
| Web3 Library   | Ethers.js 5.7.2       | Blockchain interaction               |
| Wallet         | MetaMask             | Identity and signing                 |
| Build Tool     | Vite                 | Development and bundling             |
| Deployment     | Vercel               | Frontend hosting                     |

---

## 5.2 Development Commands

```bash
npm install      # Install dependencies  
npm run dev      # Run development server  
npm run build    # Create production build  
npm run preview  # Preview production build  
