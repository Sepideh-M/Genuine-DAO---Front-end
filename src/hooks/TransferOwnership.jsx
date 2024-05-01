import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ageAbi, ageContractAddress } from './abi'

export function TransferOwnerShip(newOwner) {
  const { config } = usePrepareContractWrite({
    address: ageContractAddress,
    abi: ageAbi,
    functionName: 'transferOwnership',
    // args: [newOwner],
    args: [newOwner],
    enabled: Boolean(newOwner)
    
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}