import httpInstance from "../httpInstance";


export const getContactMedium = async () => {
    let res: any;
    const endpoint = `dashboard/values`
    await httpInstance.get(endpoint)
    .then((data) => {
        res = data;
    }).catch((err) => {
            res = err.response;
        });
        return res;
}