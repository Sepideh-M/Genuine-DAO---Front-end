import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { masterDAbi, masterDContractAddress } from "./abi";


export function Execute(proposalId) {
    const { config, error } = usePrepareContractWrite({
        address: masterDContractAddress,
        abi: masterDAbi,
        functionName: 'executeTransaction',
        args: [proposalId],
        enable: Boolean(proposalId)
      });
    
    const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)
    return { data, isLoading, isSuccess, write, writeAsync }
}