import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDStorageAbi, masterDStorageContractAddress, nftAbi, nftContractAddress } from './abi'
 
export function GetLatestProposalIds(user) {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: masterDStorageContractAddress,
    abi: masterDStorageAbi,
    functionName: 'getLatestProposalIds',
    args: [user],
    enabled:Boolean(user)
  })
  return { data, isError, isLoading, refetch };
}