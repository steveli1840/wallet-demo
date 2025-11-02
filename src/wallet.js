import { ethers } from "ethers";
import { RPC_URL, PRIVATE_KEY } from "./config.js";
import { transferEth } from "./transferEth.js";
import { transferToken } from "./transferToken.js";

async function main() {
  // 1. 生成随机助记词
  const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
  console.log("🪄 助记词:", mnemonic);

  // 2. 派生两个地址
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
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
}

main().catch(console.error);
