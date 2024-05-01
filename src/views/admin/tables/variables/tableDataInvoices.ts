type RowObj = {
  no: string;
  date: string;
  client: string;
  amount: string;
  status: string;
};

const tableDataInvoices: RowObj[] = [
  {
    no: "#BCS101",
    date: "Jun21,2020",
    client: "Alexander Parkinson",
    amount: "$ 13435.50",
    status: "Successful",
  },
  {
    no: "#ASD33",
    date: "Feb21,2021",
    client: "Natasa Analington",
    amount: "$ 1254.50",
    status: "Pending",
  },
];
export default tableDataInvoices;
