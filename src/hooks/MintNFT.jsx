import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ageAbi, ageContractAddress, nftAbi, nftContractAddress } from './abi'

export function MintNFT(user) {
  const { config } = usePrepareContractWrite({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'mint',
    // args: [newOwner],
    args: [user, "1000000000000000000"],
    enabled: Boolean(user)
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}