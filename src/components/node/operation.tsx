import { AttrID, OperCategory, OperNodeData } from "@/utils/process"
import { NodeProps } from "reactflow"
import Node from '.'
import Attribute from "./attribute"

export type OperNodeProps = NodeProps<OperNodeData>

const backgroundColor: Record<OperCategory, string> = {
    "data-process": "#fbe5d6",
    "algorithm": "#f2f2f2"
}

export default (props: NodeProps<OperNodeData>) => {
    const { id, data: { category, mapping_data } } = props
    return <Node<OperNodeData> {...props} backgroundColor={backgroundColor[category]}>
        {Object.entries(mapping_data ?? {})
            .map(([mapping, mapped]) =>
                <Attribute
                    key={`${id}_${mapped}`}
                    sourceID={AttrID(id, mapping)}
                    targetID={AttrID(id, mapped)}
                    name={mapping}
                    value={mapped} />)}
    </Node>
}