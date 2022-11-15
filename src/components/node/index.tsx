import { NodeData } from "@/utils/process"
import { PropsWithChildren } from "react"
import { Handle, NodeProps, Position } from "reactflow"

export { default as DataNode } from './data'
export { default as OperNode } from './operation'

type WorkflowNodeProps<T extends NodeData> = NodeProps<T> & PropsWithChildren<{
    id: string
    backgroundColor?: string
}>

export default function Node<T extends NodeData>({ children, id, data, selected, backgroundColor }: WorkflowNodeProps<T>) {
    const { name } = data
    return <>
        <Handle type="target" position={Position.Left} id={id} />
        <div
            style={{ backgroundColor: backgroundColor ?? "#fff" }}
            className={`
            flex flex-col p-2 border
            ${selected && `outline outline-2 outline-gray-600`}
            transition-shadow shadow-lg ${selected && `shadow-xl`}
            w-[150px] rounded-lg cursor-pointer`}>
            <div className="h-[50px] flex justify-center items-center">{name}</div>
            <div className="flex flex-col space-y-2">
                {children}
            </div>
        </div>
        <Handle type="source" position={Position.Right} id={id} />
    </>
}
