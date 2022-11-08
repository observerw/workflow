import { DataCategory, DataNodeData } from "@/utils/process"
import { Handle, NodeProps, Position } from "reactflow"

export type DataNodeProps = NodeProps<DataNodeData>

const backgroundColor: Record<DataCategory, string> = {
    "raw-data": "#dae3f3",
    "data-collection": "#e2f0d9",
    "structured-data": "#fff2cc",
    "model": "#d6dce5"
}

const Attribute = ({ id, name, value }: { id: string, name: string, value: string }) => {
    return <div className="relative">
        <Handle type="target" position={Position.Left} id={`${id}_${name}`} />
        <div className="
            w-full h-[50px]
            bg-white rounded-lg shadow-lg
            flex items-center justify-center
            text-sm overflow-hidden">
            {name} : {value}
        </div>
        <Handle type="source" position={Position.Right} id={`${id}_${name}`} />
    </div>
}

export default ({ id, data: { stored_data, category, name }, selected }: DataNodeProps) => {
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
            {/* <div className="flex flex-col space-y-2">
                {Object.entries(stored_data ?? {}).map(([name, value]) =>
                    <Attribute id={`${id}_${name}`} name={name} value={value} />)}
            </div> */}
        </div>
        <Handle type="source" position={Position.Right} id={id} />
    </>
}