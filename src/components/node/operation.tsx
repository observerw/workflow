import { OperCategory, OperNodeData } from "@/utils/process"
import { Handle, NodeProps, Position } from "reactflow"

export type OperNodeProps = NodeProps<OperNodeData>

const backgroundColor: Record<OperCategory, string> = {
    "data-process": "#fbe5d6",
    "algorithm": "#f2f2f2"
}

export default ({ id, data: { mapping_data, category, name } }: OperNodeProps) => {
    return <>
        <Handle type="target" position={Position.Left} id={id} />
        <div
            style={{ backgroundColor: backgroundColor[category] }}
            className="border border-gray-600 w-[150px] h-[100px] rounded-lg shadow-md flex items-center justify-center">
            {name}
        </div>
        <Handle type="source" position={Position.Right} id={id} />
    </>
}