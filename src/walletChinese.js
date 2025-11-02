import { ethers } from "ethers";
import * as bip39 from 'bip39';
import { RPC_URL, PRIVATE_KEY, LINK_TOKEN } from "./config.js";
import { transferEth } from "./transferEth.js";
import { transferToken } from "./transferToken.js";

async function checkBalance(address,provider) {
  const ethBalance = await provider.getBalance(address);

  const erc20 = new ethers.Contract(
    LINK_TOKEN,
    [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ],
    provider
  );

  let decimals = 18;
  try {
    decimals = await erc20.decimals();
  } catch (error) {
    console.error("无法获取LINK代币的decimals，使用默认值18");
  }

  const linkBalance = await erc20.balanceOf(address);

  console.log(`💰 地址：${address}`);
  console.log(`   ETH 余额: ${ethers.formatEther(ethBalance)} ETH`);
  console.log(`   LINK 余额: ${ethers.formatUnits(linkBalance, decimals)} LINK`);
}

async function main() {
  // 1. 生成随机助记词（中文）
  const entropy = ethers.randomBytes(16); // 128 位熵生成12个词
  const mnemonic = bip39.entropyToMnemonic(entropy, bip39.wordlists.chinese_simplified);
  console.log("🪄 助记词:", mnemonic);

  // 2. 从助记词生成种子
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdNode = ethers.HDNodeWallet.fromSeed(seed);
  
  const wallet0 = hdNode.derivePath("m/44'/60'/0'/0/0");
  const wallet1 = hdNode.derivePath("m/44'/60'/0'/0/1");

  console.log("地址0:", wallet0.address);
  console.log("地址1:", wallet1.address);

  // 3. 连接 RPC
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // 用外部钱包发起交易
  const sender = new ethers.Wallet(PRIVATE_KEY, provider);

  // 4. 转 ETH
  await transferEth(sender, wallet1.address, "0.001");

  // 5. 转 LINK
  await transferToken(sender, wallet1.address, "0.1", provider);

  // 6. 查询余额
  console.log("\n=== 查询余额 ===");
  await checkBalance(sender.address, provider);
  await checkBalance(wallet0.address, provider);
  await checkBalance(wallet1.address, provider);
}

main().catch(console.error);