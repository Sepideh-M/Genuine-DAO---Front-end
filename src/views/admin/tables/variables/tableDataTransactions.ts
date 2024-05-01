type RowObj = {
    name: string;
    date: string;
    // client: string;
    amount: string;
    status: string;
  };
  
  const tableDataTransactions: RowObj[] = [
    {
      name: "Spotify",
      date: "Jun21,2020",
    //   client: "Alexander Parkinson",
      amount: "$ 13435.50",
      status: "Successful",
    },
    {
      name: "Amazon",
      date: "Feb21,2021",
    //   client: "Natasa Analington",
      amount: "$ 1254.50",
      status: "Pending",
    },
  ];
  export default tableDataTransactions;
  