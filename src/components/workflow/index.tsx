import { useEffect } from 'react';
import ReactFlow, {
    useReactFlow,
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    Background,
    BackgroundVariant,
    NodeTypes,
    Controls,
} from 'reactflow';
import { Direction, useDAGLayout } from '../../utils/useDAGLayout';
import DataNode from '@/components/node/data'
import OperNode from '@/components/node/operation'
import process, { rawData } from '@/utils/process'

const nodeTypes: NodeTypes = {
    data: DataNode,
    operation: OperNode,
}

const { nodes: initNodes, edges: initEdges } = process(rawData)

export type WorkflowProps = {
    direction?: Direction;
}
export default ({ direction = 'LR' }: WorkflowProps) => {
    const { fitView } = useReactFlow();
    // useAutoLayout({ direction });

    useDAGLayout({ direction });

    useEffect(() => {
        // 去水印
        document.querySelector('.react-flow__panel')?.remove()
    }, [])

    const [nodes, _setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, _setEdges, onEdgesChange] = useEdgesState(initEdges);

    useEffect(() => {
        fitView({ duration: 400 });
    }, [fitView]);

    return <div className='w-full h-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            minZoom={0.5}
            maxZoom={3}
            nodeTypes={nodeTypes}
        >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
    </div>
}