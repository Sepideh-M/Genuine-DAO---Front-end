export const num = (result:any) => {
    if(result.data){
        return Number(result.data)/1e18;
    }else{
        return 0;
    }
}

export const str = (number:number) => number.toLocaleString('fullwide', {useGrouping:false})