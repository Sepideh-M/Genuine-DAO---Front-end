import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress } from './abi'
 
export function GetCurrentFee() {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: ageContractAddress,
    abi: ageAbi,
    functionName: 'getFee',
  })
  return { data, isError, isLoading, refetch };
}