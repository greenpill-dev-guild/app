import { IAllocationParams } from "@/app/types";
import {
  alloContractDetails,
  strategyContractDetails,
} from "../config/allo.config";
// import { ViemClient } from "./client";
import { encodeAbiParameters, encodeFunctionData } from "viem";
import { getChainId } from "../config/network.config";
import { alloContract, strategyContract } from "./contracts";

// Import the Viem client
// const client = ViemClient;

/**
 * Get the Allo proxy address
 * @returns Promise<`0x${string}`>
 */
export function getAllo() {
  return alloContractDetails()[getChainId()]?.proxy;
}

/**
 * Get the strategy address for a pool
 * @param poolId
 * @param networkId
 * @returns Promise<`0x${string}`>
 */
export async function getStrategy(poolId: number): Promise<`0x${string}`> {
  const data: any = await alloContract.read.getStrategy([poolId]);

  return `0x${data.toString()}`;
}

export function allocate(allocations: IAllocationParams) {
  const poolId = strategyContractDetails()[getChainId()]?.poolId;
  const poolIdArray = Array.from(Object.values(allocations), () => poolId);

  const filterZeroAllocations = (allocations: IAllocationParams) => {
    return Object.entries(allocations).reduce((acc, [recipientId, value]) => {
      if (value > 0) {
        acc[recipientId] = value;
      }
      return acc;
    }, {} as IAllocationParams);
  };

  const filteredAllocations = filterZeroAllocations(allocations);

  const encodedDataArray: `0x${string}`[] = Object.entries(
    filteredAllocations
  ).map(([recipientId, value]) => {
    return encodeAbiParameters(
      [{ type: "address" }, { type: "uint256" }],
      [recipientId as `0x${string}`, BigInt(value)]
    );
  });

  const encodedTxData = encodeFunctionData({
    abi: alloContract.abi,
    functionName: "batchAllocate",
    args: [poolIdArray, encodedDataArray],
  });

  const unsignedTx = {
    to: getAllo(),
    chainId: getChainId(),
    data: encodedTxData,
  };

  return unsignedTx;
}

// function setPayouts(networkId: number) {
//   const alloAddress = alloContract[networkId]?.proxy;
//   // set the payouts for the pool
// }

// function distribute(networkId: number) {
//   const alloAddress = alloContract[networkId]?.proxy;
//   // distribute the payouts
// }

/**
 * Check if an allocator is valid
 * @param networkId
 * @param allocatorId
 * @returns boolean
 */
async function isValidAllocator(allocatorId: string): Promise<boolean> {
  const isValid: any = await strategyContract.read.isValidAllocator([
    allocatorId,
  ]);

  console.log("isValid", isValid);

  return isValid;
}

/********** Strategy Helper functions **********/

/**
 * Get the max voice credits per allocator for this strategy
 * @param networkId
 * @returns number
 */
export async function getMaxVoiceCreditsPerAllocator() {
  const maxVoiceCredits = Number(
    // @ts-ignore
    (await strategyContract.read.maxVoiceCreditsPerAllocator([])).toString()
  );

  return maxVoiceCredits;
}

// /**
//  * Get the voice credits already cast by an allocator
//  * @param networkId
//  * @param allocatorId
//  * @returns
//  */
export async function getVoiceCreditsCastByAllocator(allocatorId: string) {
  if (!(await isValidAllocator(allocatorId))) {
    return 0;
  }

  const voiceCreditsCastByAllocator = Number(
    await strategyContract.read.getVoiceCreditsCastByAllocator([allocatorId])
  );

  return voiceCreditsCastByAllocator;
}

// /**
//  * Get the voice credits allocated to a recipient
//  * @param networkId
//  * @param allocatorId
//  * @param recipientId
//  * @returns number
//  */
export async function getVoiceCreditsCastByAllocatorToRecipient(
  allocatorId: string,
  recipientId: string
): Promise<number> {
  if (!(await isValidAllocator(allocatorId))) {
    return 0;
  }

  if (!allocatorId || !recipientId) return 0;

  const voiceCreditsCastByAllocatorToRecipient = Number(
    await strategyContract.read.getVoiceCreditsCastByAllocatorToRecipient([
      allocatorId,
      recipientId,
    ])
  );

  return voiceCreditsCastByAllocatorToRecipient;
}

// async function getVotesCastByAllocatorToRecipient(
//   networkId: number,
//   allocatorId: string,
//   recipientId: string,
// ): Promise<number> {
//   // const strategyAddress = strategyContract[networkId]?.address;
//   // if (!(await isValidAllocator(networkId, allocatorId))) {
//   //   return 0;
//   // }
//   // const votesCastByAllocatorToRecipient = Number(
//   //   await callReadContract({
//   //     address: strategyAddress,
//   //     abi: strategyContract[networkId]?.abi,
//   //     functionName: "getVotesCastByAllocatorToRecipient",
//   //     args: [allocatorId, recipientId],
//   //   }),
//   // );

//   // return votesCastByAllocatorToRecipient;
// }

// /**
//  * Get the available voice credits for an allocator
//  * @param networkId
//  * @param allocatorId
//  * @returns number
//  */
// export async function getRemainingVoiceCreditsForAllocator(
//   networkId: number,
//   allocatorId: string,
// ) {
//   if (!(await isValidAllocator(networkId, allocatorId))) {
//     return 0;
//   }

//   const maxVoiceCredits = Number(
//     await getMaxVoiceCreditsPerAllocator(networkId),
//   );
//   const usedVoiceCredits = await getVoiceCreditsCastByAllocator(
//     networkId,
//     allocatorId,
//   );

//   return maxVoiceCredits - usedVoiceCredits;
// }

// /**
//  * Check if an allocator has enough voice credits left to allocate to a recipient
//  * @param networkId
//  * @param allocatorId
//  * @param voiceCredits
//  * @returns boolean
//  */
// async function canAllocatorSpendVoiceCredits(
//   networkId: number,
//   allocatorId: string,
//   voiceCredits: number,
// ) {
//   const maxVoiceCredits = Number(
//     await getMaxVoiceCreditsPerAllocator(networkId),
//   );
//   const remainingVoiceCredits = Number(
//     await getRemainingVoiceCreditsForAllocator(networkId, allocatorId),
//   );
//   return maxVoiceCredits >= remainingVoiceCredits + voiceCredits;
// }

// /********** Main functions **********/
// vote 2 voiceCredits => sqrt(2) votes
// other way around
// voice credits -> votes

// 1 => 1
// 4 => 2
// 9 => 3

// /**
//  * In the UI -> the allocator would enter the number of votes they want to cast to a recipient
//  * This function checks to see if the allocator have enough credits to purchase/cast those votes
//  *
//  * @param networkId
//  * @param allocatorId the ID of the allocator
//  * @param recipientId the ID of the recipient
//  * @param votes the number of votes cast to the recipient
//  * @returns if the allocator can cast the votes to the recipient
//  */
// async function canAllocateVotesToRecipient(
//   networkId: number,
//   allocatorId: string,
//   recipientId: string,
//   votes: number,
// ) {
//   // ==> assume 1 vote is to be cast to recipient
//   // ==> allocator has already cast 2 votes to this recipient and 1 vote to another

//   // get the max voice credits per allocator
//   // ==> assume: 10
//   const maxVoiceCreditsPerAllocator =
//     Number(await getMaxVoiceCreditsPerAllocator(networkId)) * 10 ** 18;

//   if (!(await isValidAllocator(networkId, allocatorId))) {
//     return false;
//   }

//   // get the voice credits already allocated to the recipient
//   // ==> assume 4 credits has already been allocated
//   const voiceCreditsAlreadyAllocatedToRecipient =
//     await getVoiceCreditsCastByAllocatorToRecipient(
//       networkId,
//       allocatorId,
//       recipientId,
//     );

//   // get the actual votes allocated to the recipient
//   // ==> Math.sqrt(4) => 2
//   // const votesAlreadyAllocatedToRecipient = Math.sqrt(voiceCreditsAlreadyAllocatedToRecipient);
//   const votesAlreadyAllocatedToRecipient = Number(
//     await getVotesCastByAllocatorToRecipient(
//       networkId,
//       allocatorId,
//       recipientId,
//     ),
//   );

//   // get total votes to recipient with the votes the user wants to cast
//   // ==> 1 + 2 => 3
//   const totalVotesToRecipient = votes + votesAlreadyAllocatedToRecipient;

//   // ==> 3^2 => 9
//   const totalVoiceCreditsToRecipient = Math.pow(totalVotesToRecipient, 2);

//   // get total voice credits used
//   // ==> 4 + 1 => 5
//   const voiceCreditsUsedByAllocator = await getVoiceCreditsCastByAllocator(
//     networkId,
//     allocatorId,
//   );

//   // ==> 5 - 4 = 1
//   const voiceCreditsAllocatedToOtherRecipients =
//     voiceCreditsUsedByAllocator - voiceCreditsAlreadyAllocatedToRecipient!;

//   // ==> 1 + 9 == 10
//   const totalVoiceCredits =
//     voiceCreditsAllocatedToOtherRecipients + totalVoiceCreditsToRecipient;

//   if (totalVoiceCredits > maxVoiceCreditsPerAllocator) {
//     return false;
//   }

//   return true;
// }

// /**
//  * In the cart UI -> the allocator would enter the number of votes they want to cast for multiple recipients
//  * This function checks to see if the allocator have enough credits to purchase/cast those votes to multiple recipients
//  * @param networkId
//  * @param allocatorId ID of the allocator
//  * @param recipientIds IDs of the recipients
//  * @param votes number of votes to cast to each recipient
//  * @returns
//  */
// async function canAllocateVotesToRecipients(
//   networkId: number,
//   allocatorId: string,
//   recipientIds: string[],
//   votes: number[],
// ) {
//   // ==> assume the allocator wants to cast 1 vote for recipient1 and 2 votes for recipient2
//   // ==> allocator has already cast 1 votes to recipient1 and 1 vote to recipient3 (not in the list)

//   if (!(await isValidAllocator(networkId, allocatorId))) {
//     return false;
//   }

//   if (recipientIds.length !== votes.length) {
//     return false;
//   }

//   // get the max voice credits per allocator
//   // ==> assume: 10
//   const maxVoiceCreditsPerAllocator =
//     Number(await getMaxVoiceCreditsPerAllocator(networkId)) * 10 ** 18;

//   // get total voice credits used
//   // ==>  1 (recipient1) + 0 (recipient2) + 1 (recipient3) => 2
//   const voiceCreditsUsedByAllocator = await getVoiceCreditsCastByAllocator(
//     networkId,
//     allocatorId,
//   );

//   let totalVoiceCreditsUsedByAllocatorToRecipientsInCart = 0;
//   let voiceCreditsAlreadyAllocatedToRecipientsInCart = 0;

//   for (let i = 0; i <= recipientIds.length; i++) {
//     // get the voice credits already allocated to the recipient
//     // recipient1 => 1
//     // recipient2 => 0
//     const voiceCreditsAlreadyAllocatedToRecipient = Number(
//       await getVoiceCreditsCastByAllocatorToRecipient(
//         networkId,
//         allocatorId,
//         recipientIds[i],
//       ),
//     );

//     // get the actual votes allocated to the recipient
//     // ==> (recipient1) Math.sqrt(1) => 1
//     // ==> (recipient2) Math.sqrt(0) => 0
//     // const votesAlreadyAllocatedToRecipient = Math.sqrt(voiceCreditsAlreadyAllocatedToRecipient);
//     const votesAlreadyAllocatedToRecipient = Number(
//       await getVotesCastByAllocatorToRecipient(
//         networkId,
//         allocatorId,
//         recipientIds[i],
//       ),
//     );

//     // get total votes to recipient with the votes the user wants to cast
//     // ==> (recipient1) 1 + 1 => 2
//     // ==> (recipient2) 2 + 0 => 2
//     const totalVotesToRecipient = votes[i] + votesAlreadyAllocatedToRecipient;

//     // ==> (recipient1) 2^2 => 4
//     // ==> (recipient2) 2^2 => 4
//     const totalVoiceCreditsToRecipient = Math.pow(totalVotesToRecipient, 2);

//     // ==> 0 => 4 => 8
//     totalVoiceCreditsUsedByAllocatorToRecipientsInCart +=
//       totalVoiceCreditsToRecipient;
//     // ==> 0 => 1 => 1
//     voiceCreditsAlreadyAllocatedToRecipientsInCart +=
//       voiceCreditsAlreadyAllocatedToRecipient!;
//   }

//   // 2 - 1 = 1
//   const voiceCreditsAllocatedToOtherRecipients =
//     voiceCreditsUsedByAllocator -
//     voiceCreditsAlreadyAllocatedToRecipientsInCart;

//   // 8 + 1 = 9
//   const totalVoiceCredits =
//     totalVoiceCreditsUsedByAllocatorToRecipientsInCart +
//     voiceCreditsAllocatedToOtherRecipients;

//   if (totalVoiceCredits > maxVoiceCreditsPerAllocator) {
//     return false;
//   }

//   return true;
// }
