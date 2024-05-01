import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { masterDAbi, masterDContractAddress } from "./abi";


export function Queue(proposalId) {
    const { config, error } = usePrepareContractWrite({
        address: masterDContractAddress,
        abi: masterDAbi,
        functionName: 'queue',
        args: [proposalId],
        enable: Boolean(proposalId)
      });
    
    const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)
    return { data, isLoading, isSuccess, write, writeAsync }
}