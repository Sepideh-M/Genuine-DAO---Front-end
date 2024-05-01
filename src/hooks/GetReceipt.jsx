import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDStorageAbi, masterDStorageContractAddress, nftAbi, nftContractAddress } from './abi'
import { GetLatestProposalIds } from './GetLatestProposalIds';
 
export function GetReceipt(user, proposalId) {
  
  const { data, isError, isLoading, refetch } = useContractRead({
    address: masterDStorageContractAddress,
    abi: masterDStorageAbi,
    functionName: 'getReceipt',
    args: [proposalId, user],
    enabled:Boolean(user)
  })
  return { data, isError, isLoading, refetch };
}