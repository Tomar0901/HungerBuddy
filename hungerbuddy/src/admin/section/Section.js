import SectionInterface from "./SectionInterface";
import DisplaySection from "./DisplaySection";
import { useState } from "react"

export default function Section(){
    const [refresh, setRefresh] = useState(false);
    return(
        <div>
            <SectionInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplaySection refresh={refresh} setRefresh={setRefresh} />
        </div>
    )
}