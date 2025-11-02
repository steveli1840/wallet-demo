# 🪙 wallet-demo

一个使用 `ethers.js` 构建的最小以太坊钱包示例。  
功能包括助记词生成、ETH 与 ERC20 (LINK) 转账。

---

## 🚀 运行步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境
复制 `.env.example` 为 `.env` 并填入：
```
RPC_URL="https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>"
PRIVATE_KEY="<YOUR_TEST_PRIVATE_KEY>"
```

### 3. 领取测试币
前往 [https://faucets.chain.link/sepolia](https://faucets.chain.link/sepolia)
领取 ETH 与 LINK。

### 4. 运行程序
```bash
npm start
```

输出示例：
```
🪄 助记词: dust quick other ...
地址0: 0x...
地址1: 0x...
✅ ETH 转账完成: 0x...
✅ LINK 转账完成: 0x...
```

---

## 📘 依赖
- Node.js ≥ 18  
- ethers.js v6  
- dotenv
