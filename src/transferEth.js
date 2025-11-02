import { ethers } from "ethers";

export async function transferEth(sender, to, amountEth) {
  console.log(`\n🔹 正在发送 ${amountEth} ETH 到 ${to}...`);
  const tx = await sender.sendTransaction({
    to,
    value: ethers.parseEther(amountEth),
  });
  await tx.wait();
  console.log("✅ ETH 转账完成:", tx.hash);
}
