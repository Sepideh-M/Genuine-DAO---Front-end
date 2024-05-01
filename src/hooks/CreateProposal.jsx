import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { masterDContractAddress, ageAbi, ageContractAddress, masterDAbi } from './abi'
import { GetAgeContract } from './contracts'

export function CreateProposal(newFee) {
  const ageContract = GetAgeContract();
  const encodedFunctionData = ageContract.interface.encodeFunctionData("setFee", [newFee])

  const { config } = usePrepareContractWrite({
    address: masterDContractAddress,
    abi: masterDAbi,
    functionName: 'proposeToMakeChangeInContract',
    args: [[ageContractAddress], [0], [encodedFunctionData], []],
    enabled: Boolean(newFee)
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}