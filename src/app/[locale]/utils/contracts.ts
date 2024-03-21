import { getContract } from "viem";
import {
  alloContractDetails,
  strategyContractDetails,
} from "../config/allo.config";
import { ViemClient } from "./client";
import { getChainId } from "../config/network.config";

const networkId = getChainId();

const _alloContractDetails: any = alloContractDetails();
const _strategyContractDetails: any = strategyContractDetails();

export const alloContract = getContract({
  address: _alloContractDetails[networkId]?.proxy,
  abi: _alloContractDetails[networkId]?.abi,
  client: ViemClient,
});

export const strategyContract = getContract({
  address: _strategyContractDetails[networkId]?.address,
  abi: _strategyContractDetails[networkId]?.abi,
  client: ViemClient,
});
