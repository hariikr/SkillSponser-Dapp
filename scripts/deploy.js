const hre = require("hardhat");

async function main() {
  console.log("Deploying SkillSponsor CrowdFunding contract to BNB Chain...");

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.waitForDeployment();

  const address = await crowdFunding.getAddress();
  console.log("SkillSponsor CrowdFunding deployed to:", address);

  // Verify the contract on BSCScan
  console.log("Waiting for block confirmations...");
  await crowdFunding.deploymentTransaction().wait(6);
  await verify(address, []);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 