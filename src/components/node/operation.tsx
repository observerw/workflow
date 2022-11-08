import { OperCategory, OperNodeData } from "@/utils/process"
import { Handle, NodeProps, Position } from "reactflow"

export type OperNodeProps = NodeProps<OperNodeData>

const backgroundColor: Record<OperCategory, string> = {
    "data-process": "#fbe5d6",
    "algorithm": "#f2f2f2"
}

export default ({ id, data: { mapping_data, category, name }, selected }: OperNodeProps) => {
    return <>
        <Handle type="target" position={Position.Left} id={id} />
        <div
            style={{ backgroundColor: backgroundColor[category] }}
            className={`
            border border-gray-600
            ${selected && `outline outline-2 outline-gray-600`}
            flex flex-col p-2
            transition-shadow shadow-lg ${selected && `shadow-xl`}
            w-[150px] rounded-lg cursor-pointer`}>
            <div className="h-[50px] flex justify-center items-center">{name}</div>
        </div>
        <Handle type="source" position={Position.Right} id={id} />
    </>
}