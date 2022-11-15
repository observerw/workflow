import { AttrID, DataCategory, DataNodeData } from "@/utils/process"
import { NodeProps } from "reactflow"
import Node from '.'
import Attribute from "./attribute"

export type DataNodeProps = NodeProps<DataNodeData>

const backgroundColor: Record<DataCategory, string> = {
    "raw-data": "#dae3f3",
    "data-collection": "#e2f0d9",
    "structured-data": "#fff2cc",
    "model": "#d6dce5"
}

export default (props: NodeProps<DataNodeData>) => {
    const { id, data: { category, stored_data } } = props
    return <Node<DataNodeData> {...props} backgroundColor={backgroundColor[category]}>
        {Object.entries(stored_data ?? {})
            .map(([name, value]) =>
                <Attribute
                    key={AttrID(id, name)}
                    sourceID={AttrID(id, name)}
                    targetID={AttrID(id, name)}
                    name={name}
                    value={value} />)}
    </Node>
}