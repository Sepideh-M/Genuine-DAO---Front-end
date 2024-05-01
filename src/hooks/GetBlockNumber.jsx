import { useBlockNumber, useContractRead } from 'wagmi'

 
export function GetBlockNumber() {
    const { data } = useBlockNumber({watch:true})
    return {data};
}