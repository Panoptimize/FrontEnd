import httpInstance from "../httpInstance";
import { useAppContext } from "../../store/app-context/app-context";

export const getSupervisorInfo = async () => {
    const { email } = useAppContext();

    let res: any;
    const endpoint = `/userInfo?${email}`;

    await httpInstance.get(endpoint).then((data) => {
        console.log("userInfo Endpoint");
        console.log(data);
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    
    return res;
};
