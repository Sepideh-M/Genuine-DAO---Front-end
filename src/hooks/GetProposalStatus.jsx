import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDStorageAbi, masterDStorageContractAddress, nftAbi, nftContractAddress } from './abi'
import { GetLatestProposalIds } from './GetLatestProposalIds';
 
export function GetProposalStatus(id) {
  
  
  const { data, isError, isLoading, refetch } = useContractRead({
    address: masterDStorageContractAddress,
    abi: masterDStorageAbi,
    functionName: 'state',
    args: [id],
    enabled:Boolean(id)
  })
  return { data, isError, isLoading, refetch };
}