import React from "react";
import { currentUser } from "./getterApi";
function HomePage(){

    return(
        <>
        {currentUser.accountType}
        </>
    )
}
export default HomePage;