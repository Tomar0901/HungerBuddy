import { useState } from "react";
import BranchForm from "./BranchForm";
import BranchDisplay from "./BranchDisplay";

export default function Branch()
{
    const [refresh,setRefresh]=useState(false)
   return(
    <div>
        <BranchForm refresh={refresh} setRefresh={setRefresh} />
        <BranchDisplay refresh={refresh} setRefresh={setRefresh}/>
    </div>
   )
}