import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress } from './abi'
 
export function GetCurrentOwner() {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: ageContractAddress,
    abi: ageAbi,
    functionName: 'owner',
  })
  return { data, isError, isLoading, refetch };
}