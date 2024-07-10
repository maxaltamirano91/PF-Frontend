export default function code(){
    const deit = new Date();
    const code = Math.floor((((Number(deit.getTime())/100000)%1).toFixed(5))*100000);
    return code;
}       