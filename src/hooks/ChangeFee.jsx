import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ageAbi, ageContractAddress } from './abi'

export function ChangeFee(newFee) {
  const { config } = usePrepareContractWrite({
    address: ageContractAddress,
    abi: ageAbi,
    functionName: 'setFee',
    args: [newFee],
    enabled: Boolean(newFee)
    
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}