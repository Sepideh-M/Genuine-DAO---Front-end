import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, nftAbi, nftContractAddress } from './abi'
 
export function GetNFTBalance(user) {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'balanceOf',
    args: [user],
    enabled:Boolean(user)
  })
  return { data, isError, isLoading, refetch };
}