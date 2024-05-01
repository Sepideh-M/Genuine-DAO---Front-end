import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ageAbi, ageContractAddress, nftAbi, nftContractAddress } from './abi'

export function Delegate(user) {
  const { config } = usePrepareContractWrite({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'delegate',
    // args: [newOwner],
    args: [user],
    enabled: Boolean(user)
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}