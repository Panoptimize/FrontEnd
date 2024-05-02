import httpInstance from "../httpInstance";

export const getSatisfaction = async () => {
    let res: any
    const endpoint = 'customer-satisfaction';
    await httpInstance.get(endpoint).then((data) => {
        console.log(data)
        res = data;
    }).catch((err) => {
        res = err.response
    });
    console.log(res)
    return res;
}
