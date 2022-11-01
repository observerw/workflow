import { Edge, Node } from "reactflow"

export type DataCategory = 'raw-data' | 'data-collection' | 'structured-data' | 'model'
export type OperCategory = 'data-process' | 'algorithm'
export type NodeCategory = DataCategory | OperCategory

export type NodeData = {
    name: string,
    info?: any,
}

export type DataNodeData = NodeData & {
    category: DataCategory,
    stored_data?: Record<string, any>
}

export type OperNodeData = NodeData & {
    category: OperCategory,
    mapping_data?: Record<string, string>,
}


export type RawNode = {
    id: string,
    sub: string[],
} & (
        ({ type: 'data' } & DataNodeData) |
        ({ type: 'operation' } & OperNodeData)
    )

export type WorkflowNode = Node<DataNodeData | OperNodeData>

export type WorkflowEdge = Edge

const getData = (rawNode: RawNode) => {
    const { name, type } = rawNode
    switch (type) {
        case 'data':
            const { stored_data, category: dataCategory } = rawNode
            return { name, category: dataCategory, stored_data }
        case 'operation':
            const { mapping_data, category: operCategory } = rawNode
            return { name, category: operCategory, mapping_data }
    }
}

export default (rawNodes: RawNode[]): { nodes: WorkflowNode[], edges: WorkflowEdge[] } => {
    const nodes: WorkflowNode[] = []
    let edges: WorkflowEdge[] = []

    for (const rawNode of rawNodes) {
        const { id, type, sub } = rawNode
        nodes.push({
            id,
            type,
            position: { x: 0, y: 0 },
            draggable: false,
            data: getData(rawNode)
        })
        edges = edges.concat(sub.map(subId => ({
            id: `${id}->${subId}`,
            source: id,
            target: subId
        })))
    }

    return { nodes, edges }
}

export const rawData: RawNode[] = [
    {
        id: '1',
        name: 'RawData1',
        category: 'raw-data',
        // pre: [],
        sub: ['5'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '2',
        name: 'RawData2',
        category: 'raw-data',
        // pre: [],
        sub: ['5'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '3',
        name: 'RawData3',
        category: 'raw-data',
        // pre: [],
        sub: ['6'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '4',
        name: 'RawData4',
        category: 'raw-data',
        // pre: [],
        sub: ['6'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '5',
        name: 'DataCollection1',
        category: 'data-collection',
        // pre: [],
        sub: ['9'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '6',
        name: 'DataCollection2',
        category: 'data-collection',
        // pre: [],
        sub: ['9'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '7',
        name: 'RawData5',
        category: 'raw-data',
        // pre: [],
        sub: ['10'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '8',
        name: 'RawData6',
        category: 'raw-data',
        // pre: [],
        sub: ['10'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '9',
        name: 'process1',
        category: 'data-process',
        // pre: [],
        sub: ['11'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '10',
        name: 'DataCollection3',
        category: 'data-collection',
        // pre: [],
        sub: ['12'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '11',
        name: 'process2',
        category: 'data-process',
        // pre: [],
        sub: ['13'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '12',
        name: 'process1',
        category: 'data-process',
        // pre: [],
        sub: ['14'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '13',
        name: 'structuredData1',
        category: 'structured-data',
        // pre: [],
        sub: ['15', '16'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '14',
        name: 'structuredData2',
        category: 'structured-data',
        // pre: [],
        sub: ['16'],
        type: 'data',
        stored_data: {}
    },
    {
        id: '15',
        name: 'pipeline1',
        category: 'algorithm',
        // pre: [],
        sub: ['17'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '16',
        name: 'pipeline3',
        category: 'algorithm',
        // pre: [],
        sub: ['18'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '17',
        name: 'pipeline2',
        category: 'algorithm',
        // pre: [],
        sub: ['19'],
        type: 'operation',
        mapping_data: {}
    },
    {
        id: '18',
        name: 'model2',
        category: 'model',
        // pre: [],
        sub: [],
        type: 'data',
        stored_data: {}
    },
    {
        id: '19',
        name: 'model1',
        category: 'model',
        // pre: [],
        sub: [],
        type: 'data',
        stored_data: {}
    }
]