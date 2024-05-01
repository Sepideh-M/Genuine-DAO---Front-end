import Card from "components/card";
import Widget from "components/widget/Widget";
import { MdBarChart, MdHowToVote } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import tableDataInvoices from "../tables/variables/tableDataInvoices";
import InvoicesTable from "../default/components/InvoicesTable";
import TransactionsTable from "../tables/components/TransactionsTable";
import tableDataTransactions from "../tables/variables/tableDataTransactions";
import { MintNFT } from "hooks/MintNFT";
import { useAccount, useBlockNumber, useWaitForTransaction } from "wagmi";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAgeContract } from "hooks/contracts";
import { GetAllProposals } from "hooks/GetAllProposals";
import { GetProposalCount } from "hooks/GetProposalCount";
import { GetNFTBalance } from "hooks/GetNFTBalance";
import { GetLatestProposalIds } from "hooks/GetLatestProposalIds";
import { GetProposersLatestProposalState } from "hooks/GetProposersLatestProposalState";
import { num } from "hooks/utils";
import { GetBlockNumber } from "hooks/GetBlockNumber";
import VersionDropdown from "components/VersionDropdown";
import { Delegate } from "hooks/Delegate";
import { CastVote } from "hooks/CastVote";
import { GetReceipt } from "hooks/GetReceipt";
import { config } from "process";
import { Queue } from "hooks/Queue";
import { writeContract } from "@wagmi/core";
import { masterDAbi, masterDContractAddress } from "hooks/abi";
import { Execute } from "hooks/Execute";
// import { getBlockNumber } from 'viem/dist/types/actions/public/getBlockNumber'
// import { GetBlockNumber } from "hooks/GetBlockNumber";

const Vote = () => {

  const { address, isConnected } = useAccount();

  const [proposalIdVal, setProposalIdVal] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [myProposals, setMyProposals] = useState([]);
  const [succeededPorposals, setSucceededPorposals] = useState([]);
  const [queuedPorposals, setQueuedPorposals] = useState([]);
  const [voteId, setVoteId] = useState(1);
  const [isDelegated, setIsDelegated] = useState(false);
  const [queueProposalIdVal, setQueueProposalIdVal] = useState<any>();
  const [lastQueueHash, setLastQueueHash] = useState<string>('');
  const [queueIsLoading, setQueueIsLoading] = useState<boolean>(false);
  //execute
  const [executeProposalIdVal, setExecuteProposalIdVal] = useState<any>();
  const [lastExecuteHash, setLastExecuteHash] = useState<string>('');
  const [executeIsLoading, setExecuteIsLoading] = useState<boolean>(false);

  const ageContract = GetAgeContract();
  const proposals = GetAllProposals();
  const proposalCount = GetProposalCount();
  const nftBalance = GetNFTBalance(address);
  const latestProposalId = GetLatestProposalIds(address);
  const latestProposalState = GetProposersLatestProposalState(address);
  const blockNumber = GetBlockNumber();
  const userReceipt = GetReceipt(address, proposalIdVal);
  
  useEffect(() => console.log("user receipt :", userReceipt.data),[userReceipt.data]);


  const mintNFT = MintNFT(address);
  const mintNFTWait = useWaitForTransaction({hash: mintNFT?.data?.hash});
  const delegate = Delegate(address);
  const delegateWait = useWaitForTransaction({hash: delegate?.data?.hash});
  const castVote = CastVote(address, proposalIdVal, voteId);
  const castVoteWait = useWaitForTransaction({hash: castVote?.data?.hash});
  const queue = Queue(queueProposalIdVal);
  const queueWait = useWaitForTransaction({hash: lastQueueHash as any});
  const execute = Execute(queueProposalIdVal);
  const executeWait = useWaitForTransaction({hash: lastExecuteHash as any});

  const getProposalStatus = (id:number) => {
    const selectedProposal = proposals?.data.filter((object:any) => object?.no == id);
    return selectedProposal[0]?.status;
  }

  const getProposalEta = (id:number) => {
    const selectedProposal = proposals?.data.filter((object:any) => object?.no == id);
    return selectedProposal[0]?.eta;
  }

  useEffect(() => {
      setIsLoading(mintNFTWait.isLoading);
      if(mintNFTWait.isSuccess){
        toast.success("You Mint the NFT successfully!")
      }
      if(mintNFTWait.isError){
        toast.error("Minting of the NFT failed!")
      }
  },[mintNFTWait.isLoading])


  const delegateFunc = () => {
    if(proposalIdVal ==0 || proposalIdVal > Number(proposalCount.data)){
      toast.error("Invalid proposal ID!")
      return;
    }
    const selectedProposalStatus = getProposalStatus(proposalIdVal);
    if(selectedProposalStatus != "Active"){
      toast.error("Selected proposal is not active!")
      return;
    }
    if((userReceipt.data as any)?.hasVoted){
      toast.error("voter already voted!")
      return;
    }
    delegate.write?.()
  }


  useEffect(() => {
    // setIsLoading(delegateWait.isLoading);
    // setIsDelegated(true);
    if(delegateWait.isLoading){
      setIsDelegated(true);
    }
    if(delegateWait.isSuccess){
      toast.success("You delegated successfully, now please press vote button!")
      setIsDelegated(true);
    }
    if(delegateWait.isError){
      toast.error("delegating failed!")
    }
  },[delegateWait.isLoading])

  const castVoteFunc = () => {
    if(!isDelegated){
      toast.error("Please first delegate")
      return;
    }
    if(proposalIdVal ==0 || proposalIdVal > Number(proposalCount.data)){
      toast.error("Invalid proposal ID!")
      return;
    }
    const selectedProposalStatus = getProposalStatus(proposalIdVal);
    if(selectedProposalStatus != "Active"){
      toast.error("Selected proposal is not active!")
      return;
    }
    if((userReceipt.data as any)?.hasVoted){
      toast.error("voter already voted!")
      return;
    }
    castVote.write?.()
  }

  useEffect(() => {
    console.log("castVote", castVoteWait)
    setIsLoading(castVoteWait.isLoading);
    if(castVoteWait.isSuccess){
      toast.success("You voted successfully")
      setIsDelegated(false);
      proposals.reload();
    }
    if(castVoteWait.isError){
      toast.error("Casting vote failed!")
    }
  },[castVoteWait.isLoading, castVoteWait.isSuccess, castVoteWait.isError])



  const queueFunc = async (id:number) => {
    if(!id || id == 0) return;
    try {
      setQueueIsLoading(true);
      console.log("Queue proposal:", queueProposalIdVal);
      const {hash} = await writeContract({
      address: masterDContractAddress,
      abi: masterDAbi,
      functionName: 'queue',
      args: [id],
    } as any)
      setLastQueueHash(hash);
      setQueueIsLoading(false);
    } catch (error) {
      setQueueIsLoading(false);
    }
    
  }

  useEffect(() => {
    setIsLoading(queueWait.isLoading);
    if(queueWait.isSuccess){
      toast.success("Queued successfully")
      setIsDelegated(false);
      proposals.reload?.();
    }
    if(queueWait.isError){
      toast.error("Queue transaction failed!")
    }
  },[queueWait.isLoading, queueWait.isSuccess, queueWait.isError])


  const executeFunc = async (id:number) => {
    // console.log("ID", id)
    console.log("eta", id)
    if(!id || id == 0) return;
    try {
      if(Number(getProposalEta(id)) > Number(blockNumber.data)){
        toast.error("Please wait for the eta to be reached!");
        setExecuteIsLoading(false);
        return;
      }
    setExecuteIsLoading(true);
    // console.log("Queue proposal:", queueProposalIdVal);
    const {hash} = await writeContract({
      address: masterDContractAddress,
      abi: masterDAbi,
      functionName: 'executeTransaction',
      args: [id],
    } as any)
    setLastExecuteHash(hash);
    setExecuteIsLoading(false);
    } catch (error) {
      console.log("error", error)
      setExecuteIsLoading(false);
    }
  }


  useEffect(() => {
    setIsLoading(executeWait.isLoading);
    if(executeWait.isSuccess){
      toast.success("Transaction Executed successfully")
      setIsDelegated(false);
      proposals.reload?.();
    }
    if(executeWait.isError){
      toast.error("Executing transaction failed!")
    }
  },[executeWait.isLoading])

  useEffect(() => {
    if(proposals?.data.length > 0){
      const myProposals = proposals?.data.filter((object:any) => object?.client == address);
      setMyProposals(myProposals);
      //save succeeded proposals
      const succeededProposals = proposals?.data.filter((object:any) => object?.status == "Succeeded");
      setSucceededPorposals(succeededProposals);
      //save succeeded proposals
      const queuedProposals = proposals?.data.filter((object:any) => object?.status == "Queued");
      setQueuedPorposals(queuedProposals);
    }
    console.log("Proposals :", proposals.data)
  },[proposals.data])

  
  useEffect(() => {
    if(blockNumber?.data){
    const matchedProposals = proposals?.data.filter((object:any) => (object?.startBlock == Number(blockNumber?.data) - 1 || object?.endBlock == Number(blockNumber?.data) - 1));
    if(matchedProposals.length > 0){
      proposals.reload();
    }
  }
  },[blockNumber?.data])
  

  
  return (
    <div>
      <Loading loading={isLoading} setLoading={setIsLoading}/>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Proposals"}
          subtitle={(proposals?.data?.length).toString()}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Your Vote Tokens"}
          subtitle={num(nftBalance).toString()}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Current Block Number"}
          subtitle={`${blockNumber?.data as any}`}
        />
      </div>

      {/* mint */}
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <Card extra="flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="linear flex items-center justify-center  p-2 text-xl font-bold text-brand-500 dark:text-white">
              <MdHowToVote className="h-6 w-6" />
              <span className="ml-2 text-lg">Mint</span>
            </div>
          </div>

          <div className="h-50 ml-4 flex w-[70%] flex-col items-center justify-center">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              {/* <input
                type="text"
                placeholder="Proposals number here ..."
                className="block h-full w-full rounded-full border-none bg-lightPrimary p-4 text-sm font-medium text-navy-700 outline-none placeholder:text-xs placeholder:!text-gray-400 focus:outline-0 focus:ring-0 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              /> */}
            </div>

            <div className="flex items-center justify-center">
              {/* <button className="m-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
                <span className="flex items-center justify-center text-brand-500 dark:text-white">
                  Cast
                </span>
              </button> */}
              <button onClick={() => mintNFT.write?.()} className="m-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
                <span className="flex items-center justify-center text-brand-500 dark:text-white">
                  {mintNFT.isLoading ? "Loading..." : "Mint"}
                </span>
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <Card extra="flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="linear flex items-center justify-center  p-2 text-xl font-bold text-brand-500 dark:text-white">
              <MdHowToVote className="h-6 w-6" />
              <span className="ml-2 text-lg">Vote</span>
            </div>
          </div>

          <div className="h-50 ml-4 flex w-[70%] flex-col items-center justify-center">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <input
                type="text"
                onChange={e => setProposalIdVal(Number(e.target.value))}
                placeholder="Proposals number here ..."
                className="block h-full w-full rounded-full border-none bg-lightPrimary p-4 text-sm font-medium text-navy-700 outline-none placeholder:text-xs placeholder:!text-gray-400 focus:outline-0 focus:ring-0 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              />
              <VersionDropdown setVoteId={setVoteId}/>
            </div>

            <div className="flex items-center justify-center">
              {!isDelegated && <button onClick={() => delegateFunc()} className="m-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
                <span className="flex items-center justify-center text-brand-500 dark:text-white">
                {delegate.isLoading ? "Loading..." : "Delegate"}
                </span>
              </button>}
              <button onClick={() => castVoteFunc()} className="m-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
                <span className="flex items-center justify-center text-brand-500 dark:text-white">
                {castVote.isLoading ? "Loading..." : "Cast Vote"}
                </span>
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        {/* <ColumnsTable tableData={tableDataColumns} /> */}
        <InvoicesTable tableData={proposals.data} isMine={false}/>
        {/** queue table*/}
        <TransactionsTable tableData={succeededPorposals} queueFunc={queueFunc} isLoading={queueIsLoading} selectedId={queueProposalIdVal} setProposalId={setQueueProposalIdVal} isForQueue={true}/>
        {/** send transaction table*/}
        <TransactionsTable tableData={queuedPorposals} queueFunc={executeFunc} isLoading={executeIsLoading} selectedId={executeProposalIdVal} setProposalId={setExecuteProposalIdVal} isForQueue={false}/>
      </div>
    </div>
  );
};

export default Vote;
