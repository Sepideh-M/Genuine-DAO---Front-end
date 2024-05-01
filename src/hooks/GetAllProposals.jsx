import { useContractRead } from 'wagmi'
import { ageAbi, ageContractAddress, masterDContractAddress, masterDStorageAbi, masterDStorageContractAddress, nftAbi, nftContractAddress } from './abi'
import { useEffect, useState } from 'react';
import { GetProposalCount } from './GetProposalCount';
import { readContract } from '@wagmi/core';
import { GetAgeContract } from './contracts';
 
export function GetAllProposals(id) {


  const [proposals, setProposals] = useState([]);

  const proposalCount = GetProposalCount();
  const ageContract = GetAgeContract();

  
  const decoded = (sig) => {
    const suggestedFee = ageContract.interface.decodeFunctionData("setFee", sig);
    return suggestedFee[0];
  }

  const convertTime = (timestamp) => {
    var date = new Date(timestamp * 1000);
    return date.toUTCString();
  }

  function summaryOwner(owner){
    if(!owner) return "connectWallet";
    var firstCharacters = owner.substring(0, 8);
    var lastCharacters = owner.substring(owner.length - 8);
    return firstCharacters + "..."  + lastCharacters;
  }

  const getStatus = (status) => {
        if(status == 0){
            return 'Pending';
        }else if(status == 1){
            return 'Active';
        }else if(status == 2){
            return 'Canceled';
        }else if(status == 3){
            return 'Defeated';
        }else if(status == 4){
            return 'Succeeded';
        }else if(status == 5){
            return 'Queued';
        }else if(status == 6){
            return 'Expired';
        }else if(status == 7){
            return 'Executed';
        }else if(status == 8){
            return 'Vetoed';
        }else{
            return '';
        }
  }

  const calculateProposals = async () => {
    if(proposalCount?.data > 0){
        setProposals([]);
        for(var i = 1; i <= proposalCount?.data; i++){
            //get proposal object
            const proposal = await readContract({
                address: masterDStorageContractAddress,
                abi: masterDStorageAbi,
                functionName: 'getProposal',
                args: [i]
              });
            //get proposal 
            const proposalStatus = await readContract({
            address: masterDStorageContractAddress,
            abi: masterDStorageAbi,
            functionName: 'state',
            args: [i]
            });
            const finalData = {
                no: proposal?.id.toString(),
                startBlock: Number(proposal?.startBlock),
                endBlock: Number(proposal?.endBlock),
                client: proposal?.proposer,
                amount: decoded(proposal?.signatures[0]).toString(),
                status: getStatus(proposalStatus),
                canceled: proposal?.canceled,
                vetoed: proposal?.vetoed,
                executed: proposal?.executed,
                forVotes: proposal?.forVotes,
                againstVotes: proposal?.againstVotes,
                abstainVotes: proposal?.abstainVotes,
                eta: proposal?.eta,
            }
            setProposals(preProposals => [...preProposals, finalData]);
        }
    }
  }

  useEffect(() => {
    calculateProposals();
  },[proposalCount.data])

  const reload = () => {
    console.log("HHH")
    calculateProposals();
  }

  return {data:proposals, reload};
}