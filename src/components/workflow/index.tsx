import { useEffect } from 'react'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    BackgroundVariant,
    NodeTypes,
    Controls,
} from 'reactflow'
import { Direction, useDAGLayout } from '../../utils/useDAGLayout'
import DataNode from '@/components/node/data'
import OperNode from '@/components/node/operation'
import process, { rawData } from '@/utils/process'

const nodeTypes: NodeTypes = {
    data: DataNode,
    operation: OperNode,
}

const { nodes: initNodes, edges: initEdges } = process(rawData)

export type WorkflowProps = {
    direction?: Direction
}
export default ({ direction = 'LR' }: WorkflowProps) => {
    useDAGLayout({ direction })

    const [nodes, _setNodes, onNodesChange] = useNodesState(initNodes)
    const [edges, _setEdges, onEdgesChange] = useEdgesState(initEdges)

    return <div className='w-full h-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            // minZoom={0.5}
            // maxZoom={3}
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}>
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
    </div>
}