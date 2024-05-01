import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import InvoicesTable from "views/admin/default/components/InvoicesTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataInvoices from "./variables/tableDataInvoices";
import { GetCurrentOwner } from "hooks/GetCurrentOwner";
import { GetCurrentFee } from "hooks/GetCurrentFee";
import { useAccount } from "wagmi";
import { GetProposalCount } from "hooks/GetProposalCount";
import { GetNFTBalance } from "hooks/GetNFTBalance";
import { GetBlockNumber } from "hooks/GetBlockNumber";
import { masterDContractAddress } from "hooks/abi";
import { num } from "hooks/utils";

const Dashboard = () => {

  const { address, isConnected } = useAccount();

  const currentFee = GetCurrentFee();
  const currentOwner = GetCurrentOwner();
  const proposalCount = GetProposalCount();
  const nftBalance = GetNFTBalance(address);
  const blockNumber = GetBlockNumber();

  function summaryOwner(owner: string){
    if(!owner) return "connectWallet";
    var firstCharacters = owner.substring(0, 8);
    var lastCharacters = owner.substring(owner.length - 8);
    return firstCharacters + "..."  + lastCharacters;
  }

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Current Fee"}
          subtitle={`${currentFee.data}%`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Current Owner"}
          subtitle={`${summaryOwner(currentOwner.data as string)}`}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"DAO Address"}
          subtitle={`${summaryOwner(masterDContractAddress)}`}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Total Proposals"}
          subtitle={`${proposalCount.data}`}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Your Vote Token Balance"}
          subtitle={`${num(nftBalance)}`}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Block Number"}
          subtitle={`${blockNumber.data}`}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        {/* <div> */}
          {/* <CheckTable tableData={tableDataCheck} /> */}
          <DailyTraffic />
        {/* </div> */}

        {/* Traffic chart & Pie Chart */}

        {/* <div > */}
          {/* <DailyTraffic /> */}
          <PieChartCard />
        {/* </div> */}

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
      {/* Complex Table , Task & Calendar */}
      <div className="mt-5">
        {/* <InvoicesTable tableData={tableDataInvoices} isMine={false}/> */}
      </div>
    </div>
  );
};

export default Dashboard;
