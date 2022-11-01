import { DataCategory, DataNodeData } from "@/utils/process"
import { Handle, NodeProps, Position } from "reactflow"

export type DataNodeProps = NodeProps<DataNodeData>

const backgroundColor: Record<DataCategory, string> = {
    "raw-data": "#dae3f3",
    "data-collection": "#e2f0d9",
    "structured-data": "#fff2cc",
    "model": "#d6dce5"
}

export default ({ id, data: { stored_data, category, name }, selected }: DataNodeProps) => {
    return <>
        <Handle type="target" position={Position.Left} id={id} />
        <div
            style={{ backgroundColor: backgroundColor[category] }}
            className={`
            border ${selected && `border-[3px]`} border-gray-600 
            w-[150px] h-[100px] 
            rounded-lg cursor-pointer
            transition-shadow shadow-lg ${selected && `shadow-xl`}
            flex items-center justify-center`}>
            {name}
        </div>
        <Handle type="source" position={Position.Right} id={id} />
    </>
}