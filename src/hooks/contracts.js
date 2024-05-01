import { getContract } from "@wagmi/core";
import { ageAbi, ageContractAddress, masterDAbi, masterDContractAddress } from "./abi";
import { usePublicClient } from "wagmi";
import {ethers} from "ethers";

export function GetAgeContract() {
    const provider = usePublicClient();
    const ageContract = new ethers.Contract(ageContractAddress, ageAbi, provider);
    return ageContract;
}


export function GetMasterDContract() {
const provider = usePublicClient();
const masterDContract = new ethers.Contract(masterDContractAddress, masterDAbi, provider);
return masterDContract;
}