import {ethers } from "ethers";
import { RPC_URL, LINK_TOKEN } from "./config.js";

async function checkBalance(address) {
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // 检查 ETH 余额
    const ethBalance = await provider.getBalance(address);
    console.log(`💰地址：${address}`)
    console.log(`ETH 余额: ${ethers.formatEther(ethBalance)} ETH`);

    // 检查 LINK 余额
    const erc20 = new ethers.Contract(
        LINK_TOKEN,
        [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)"
        ],
        provider
    );

    const decimals = await erc20.decimals();
    const linkBalance = await erc20.balanceOf(address);
    console.log(`LINK 余额: ${ethers.formatUnits(linkBalance, decimals)} LINK`);
}

const address = [
    "0x3...",  // My metamask address
    "0x...",  // My program derived address 0
    "0x..."   // My program derived address 1
];

for (const addr of address) {
    await checkBalance(addr);
}