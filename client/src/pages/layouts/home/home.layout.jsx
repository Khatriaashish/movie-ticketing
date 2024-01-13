import { Outlet } from "react-router-dom";
import HomeHeading from "../../../components/home/homeheading.component";

const Homelayout = ()=>{
    return (<>
        <HomeHeading/>
        <Outlet/>
    </>)
}

export default Homelayout;