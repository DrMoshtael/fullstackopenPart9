import Part from "./Part"
import type { CoursePart } from "../types"

const Content = ({parts}: {parts:CoursePart[]}) => (
    <div>
        {parts.map((p,index) => 
            <Part key={index} part={p} />)}
    </div>
)

export default Content