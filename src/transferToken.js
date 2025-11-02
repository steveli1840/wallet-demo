import { ethers } from "ethers";
import { LINK_TOKEN } from "./config.js";

const abi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address) view returns (uint)",
  "function decimals() view returns (uint8)"
];

export async function transferToken(sender, to, amount, provider) {
  const link = new ethers.Contract(LINK_TOKEN, abi, sender);

  const decimals = await link.decimals();
  const balance = await link.balanceOf(sender.address);
  console.log(`当前 LINK 余额: ${ethers.formatUnits(balance, decimals)} LINK`);

  console.log(`\n🔹 正在发送 ${amount} LINK 到 ${to}...`);
  const tx = await link.transfer(to, ethers.parseUnits(amount, decimals));
  await tx.wait();
  console.log("✅ LINK 转账完成:", tx.hash);
}
