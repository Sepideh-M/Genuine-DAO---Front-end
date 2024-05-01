import React, { useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import avatar from "../../../../assets/img/avatars/avatar4.png";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type RowObj = {
  isMine: boolean
  no: string;
  startBlock: Number;
  endBlock: Number;
  client: string;
  amount: string;
  status: string;
  forVotes: Number;
  againstVotes: Number;
  abstainVotes: Number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function InvoicesTable(props: { tableData: any, isMine:boolean }) {
  // const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // let defaultData = tableData;

  function summaryOwner(owner:string){
    if(!owner) return "connectWallet";
    var firstCharacters = owner.substring(0, 8);
    var lastCharacters = owner.substring(owner.length - 8);
    return firstCharacters + "..."  + lastCharacters;
  }

  const columns = [
    columnHelper.accessor("no", {
      id: "no",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("startBlock", {
      id: "startBlock",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Start Block</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {`${info.getValue()}`}
        </p>
      ),
    }),
    columnHelper.accessor("endBlock", {
      id: "endBlock",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">End Block</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {`${info.getValue()}`}
        </p>
      ),
    }),
    columnHelper.accessor("client", {
      id: "client",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Proposer
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white">
          {/* <img
            className="h-10 w-10 cursor-pointer rounded-full"
            src={avatar}
            alt="Elon Musk"
          /> */}
          <span>{summaryOwner(info.getValue())}</span>
        </div>
      ),
    }),

    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Fee
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Status
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === "Succeeded" ? (
            <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
          ) : info.getValue() === "Defeated" ? (
            <MdCancel className="text-red-500 me-1 dark:text-red-300" />
          ) : info.getValue() === "Pending" ? (
            <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
          ) :  info.getValue() === "Succeeded" ? (
            <MdOutlineError className="text-green-500 me-1 dark:text-green-300" />
          ) :  null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("forVotes", {
      id: "forVotes",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          For Votes
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-green-400 dark:text-green-300">
          {Number(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("againstVotes", {
      id: "againstVotes",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Against Votes
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-red-400 dark:text-white">
          {Number(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("abstainVotes", {
      id: "abstainVotes",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Abstain Votes
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-yellow-400 dark:text-yellow-300">
          {Number(info.getValue())}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  // const [data, setData] = React.useState(() => [...defaultData]);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    // console.log("table data :", data)
    // console.log("HHH-I")
    setData(props.tableData)
  },[props.tableData])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {props.isMine ? "My proposals" :"All proposals"}
        </div>
        {/* <CardMenu /> */}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 50)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
