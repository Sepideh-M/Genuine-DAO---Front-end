import tableDataDevelopment from "./variables/tableDataDevelopment";
import tableDataCheck from "./variables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import tableDataColumns from "./variables/tableDataColumns";
import tableDataComplex from "./variables/tableDataInvoices";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/InvoicesTable";
import tableDataInvoices from "./variables/tableDataInvoices";
import InvoicesTable from "../default/components/InvoicesTable";
import Widget from "components/widget/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import Card from "components/card";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import { GetAgeContract, GetMasterDContract } from "hooks/contracts";
import { useEffect, useState } from "react";
import { CreateProposal } from "hooks/CreateProposal";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import { GetAllProposals } from "hooks/GetAllProposals";
import { Signature } from "ethers";
import { GetProposalCount } from "hooks/GetProposalCount";
import { GetNFTBalance } from "hooks/GetNFTBalance";
import { num } from "hooks/utils";
import { GetLatestProposalIds } from "hooks/GetLatestProposalIds";
import { GetProposersLatestProposalState } from "hooks/GetProposersLatestProposalState";
import { GetBlockNumber } from "hooks/GetBlockNumber";


const Tables = () => {

  const [newFeeVal, setNewFeeVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [myProposals, setMyProposals] = useState([]);

  const { address, isConnected } = useAccount();

  const ageContract = GetAgeContract();
  const proposals = GetAllProposals();
  const proposalCount = GetProposalCount();
  const nftBalance = GetNFTBalance(address);
  const latestProposalId = GetLatestProposalIds(address);
  const latestProposalState = GetProposersLatestProposalState(address);
  const blockNumber = GetBlockNumber();


  const createProposal = CreateProposal(newFeeVal);
  const createProposalWait = useWaitForTransaction({hash: createProposal?.data?.hash});

  useEffect(() => {
    setIsLoading(createProposalWait.isLoading);
    if(createProposalWait.isSuccess){
      toast.success("You made a proposal successfully!")
      proposalCount.refetch();
    }
    if(createProposalWait.isError){
      toast.error("Making proposal failed!")
    }
},[createProposalWait.isLoading])


  const createProposalFunc = () => {
    if(latestProposalId?.data as number > 0 && (latestProposalState?.data == 0 || latestProposalState?.data == 1) ){
      if(latestProposalState?.data == 0){
        toast.error("found an already pending proposal");
        return;
      }
      if(latestProposalState?.data == 1){
        toast.error("found an already active proposal");
        return;
      }
    }
    createProposal.write?.();
  }

  const decoded = (sig:string) => {
    return ageContract.interface.decodeFunctionData("setFee", sig);
  }
  
  useEffect(() => {
    console.log("ZZZ", proposals)
    if(proposals?.data?.length > 0){
      const myProposals = proposals?.data?.filter((object:any) => object?.client == address);
      setMyProposals(myProposals);
    }
  },[proposals.data])

  useEffect(() => {
    if(blockNumber?.data){
    const matchedProposals = proposals?.data.filter((object:any) => (object?.startBlock == Number(blockNumber?.data) - 1 || object?.endBlock == Number(blockNumber?.data) - 1));
    if(matchedProposals.length > 0){
      proposals.reload();
    }
  }
  },[blockNumber?.data])

  // useEffect(() => {
  //   console.log("latest proposal id", latestProposalId.data)
  //   console.log("latest proposal status", latestProposalState.data)
  // }, [latestProposalId.data, latestProposalState.data])


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

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <Card extra="flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="linear flex items-center justify-center  p-2 text-xl font-bold text-brand-500 dark:text-white">
              <MdCreateNewFolder className="h-6 w-6" />
              <span className="ml-2 text-lg">Create a Proposal</span>
            </div>
          </div>

          <div className="h-50 ml-4 flex w-[70%] flex-col items-center justify-center">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <input
                type="text"
                placeholder="Fee amount here ..."
                onChange={e => setNewFeeVal(Number(e.target.value))}
                className="block h-full w-full rounded-full border-none bg-lightPrimary p-4 text-sm font-medium text-navy-700 outline-none placeholder:text-xs placeholder:!text-gray-400 focus:outline-0 focus:ring-0 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              />
            </div>

            <button onClick={createProposalFunc} className="my-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
              <span className="flex items-center justify-center text-brand-500 dark:text-white">
                {createProposal.isLoading ? "Loading..." : "Submit"}
              </span>
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        {/* <ColumnsTable tableData={tableDataColumns} /> */}
        {/* <InvoicesTable tableData={tableDataInvoices} /> */}
        <InvoicesTable tableData={proposals.data} isMine={false}/>
        <InvoicesTable tableData={myProposals} isMine={true}/>
      </div>
    </div>
  );
};

export default Tables;
