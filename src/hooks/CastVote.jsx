import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ageAbi, ageContractAddress, masterDAbi, masterDContractAddress, nftAbi, nftContractAddress } from './abi'
import { GetProposalCount } from './GetProposalCount';

export function CastVote(voter, proposalId, voteId) {
  const proposalCount = GetProposalCount();
  const { config } = usePrepareContractWrite({
    address: masterDContractAddress,
    abi: masterDAbi,
    functionName: 'castVote',
    // args: [newOwner],
    args: [proposalId, voteId],
    enabled: Boolean(proposalId, voteId, proposalId <= proposalCount.data)
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return { data, isLoading, isSuccess, write}
}