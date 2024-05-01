import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import Widget from "components/widget/Widget";
import { MdBarChart, MdDashboard, MdChangeCircle } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import Card from "components/card";
import { MdCreateNewFolder } from "react-icons/md";
import { RiFolderTransferFill } from "react-icons/ri";
import { TransferOwnerShip } from "hooks/TransferOwnership";
import { useEffect, useState } from "react";
import { GetCurrentOwner } from "hooks/GetCurrentOwner";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { ChangeFee } from "hooks/ChangeFee";
import Loading from "components/Loading";
import { GetCurrentFee } from "hooks/GetCurrentFee";
import { masterDContractAddress } from "hooks/abi";


const Marketplace = () => {

  const { address, isConnected } = useAccount();


  const [newOwnerVal, setNewOwnerVal] = useState('');
  const [newFeeVal, setNewFeeVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const currentOwner = GetCurrentOwner();
  const currentFee = GetCurrentFee();

  const transferOwnerShip = TransferOwnerShip(newOwnerVal);
  const transferOwnerShipWait = useWaitForTransaction({hash: transferOwnerShip?.data?.hash});
  const changeFee = ChangeFee(newFeeVal);
  const changeFeeWait = useWaitForTransaction({hash: changeFee?.data?.hash});

  useEffect(() => {
    console.log("Fee", currentFee)
  },[currentFee.data])

  useEffect(() => {
    setIsLoading(transferOwnerShipWait.isLoading);
    if(transferOwnerShipWait.isSuccess){
      toast.success("You changed the owner successfully!");
      currentOwner.refetch()
    }
    if(transferOwnerShipWait.isError){
      toast.error("Changing of owner failed!")
    }
  },[transferOwnerShipWait.isLoading])


  useEffect(() => {
    setIsLoading(changeFeeWait.isLoading);
    if(changeFeeWait.isSuccess){
      toast.success("You changed fee successfully!")
      currentFee.refetch();
    }
    if(changeFeeWait.isError){
      toast.error("Changing of fee failed!")
    }
  },[changeFeeWait.isLoading])



  const transferOwner = () => {
    if(currentOwner.data != address){
      toast.error("You cannot change the owner, because you are not the owner!");
      return;
    }
    transferOwnerShip.write?.();
  }

  const changeFeeFunc = () => {
    if(currentOwner.data != address){
      toast.error("You cannot change the fee, because you are not the owner!");
      return;
    }
    changeFee.write?.();
  }

  function summaryOwner(owner: string){
    if(!owner) return "connectWallet";
    var firstCharacters = owner.substring(0, 8);
    var lastCharacters = owner.substring(owner.length - 8);
    return firstCharacters + "..."  + lastCharacters;
  }
  
  return (
    <div>
      <Loading loading={isLoading} setLoading={setIsLoading}/>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Current Fee"}
          subtitle={`${currentFee.data}%`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Current Owner"}
          subtitle={summaryOwner(currentOwner.data as string)}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Dao contract"}
          subtitle={summaryOwner(masterDContractAddress)}
        />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <Card extra="flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="linear flex items-center justify-center  p-2 text-xl font-bold text-brand-500 dark:text-white">
              <RiFolderTransferFill className="h-6 w-6" />
              <span className="ml-2 text-lg">Transfer ownership</span>
            </div>
          </div>

          <div className="h-50 ml-4 flex w-[80%] flex-col items-center justify-center">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white ">
              <input
                type="text"
                placeholder="New Owner here ..."
                onChange={e => setNewOwnerVal(e.target.value)}
                className="block h-full w-full rounded-full border-none bg-lightPrimary p-4 text-sm font-medium text-navy-700 outline-none placeholder:text-xs placeholder:!text-gray-400 focus:outline-0 focus:ring-0 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              />
            </div>

            <button onClick={transferOwner} className="my-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
              <span className="flex items-center justify-center text-brand-500 dark:text-white">
                {transferOwnerShip.isLoading ? "Loading ..." : "Submit"}
              </span>
            </button>
          </div>
        </Card>

        <Card extra="flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="linear flex items-center justify-center  p-2 text-xl font-bold text-brand-500 dark:text-white">
              <MdChangeCircle className="h-6 w-6" />
              <span className="ml-2 text-lg">Change Fee</span>
            </div>
          </div>

          <div className="h-50 ml-4 flex w-[80%] flex-col items-center justify-center">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <input
                type="text"
                placeholder="New Fee here ..."
                onChange={e => setNewFeeVal(e.target.value)}
                className="block h-full w-full rounded-full border-none bg-lightPrimary p-4 text-sm font-medium text-navy-700 outline-none placeholder:text-xs placeholder:!text-gray-400 focus:outline-0 focus:ring-0 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              />
            </div>

            <button onClick={changeFeeFunc} className="my-4 rounded-md bg-lightPrimary px-8 py-3 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20">
              <span className="flex items-center justify-center text-brand-500 dark:text-white">
              {changeFee.isLoading ? "Loading ..." : "Submit"}
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;
