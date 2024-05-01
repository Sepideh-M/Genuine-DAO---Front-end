import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDStorageAbi, masterDStorageContractAddress, nftAbi, nftContractAddress } from './abi'
import { GetLatestProposalIds } from './GetLatestProposalIds';
 
export function GetProposersLatestProposalState(user) {
  
  const latestProposalId = GetLatestProposalIds(user);
  const { data, isError, isLoading, refetch } = useContractRead({
    address: masterDStorageContractAddress,
    abi: masterDStorageAbi,
    functionName: 'state',
    args: [latestProposalId.data],
    enabled:Boolean(user)
  })
  return { data, isError, isLoading, refetch };
}