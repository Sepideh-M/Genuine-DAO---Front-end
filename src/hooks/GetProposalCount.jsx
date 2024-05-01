import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDStorageAbi, masterDStorageContractAddress } from './abi'
 
export function GetProposalCount() {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: masterDStorageContractAddress,
    abi: masterDStorageAbi,
    functionName: 'proposalCount',
  })
  return { data, isError, isLoading, refetch };
}