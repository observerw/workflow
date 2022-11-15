import { DataNode, OperNode } from '@/components/node'
import process, { rawData } from '@/utils/process'
import ReactFlow, { Background, BackgroundVariant, Controls, NodeTypes, useEdgesState, useNodesState } from 'reactflow'
import { Direction, useDAGLayout } from '../../utils/useDAGLayout'

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