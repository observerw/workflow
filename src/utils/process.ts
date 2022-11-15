import { Edge, Node } from "reactflow"

/// 边的 ID，由起点 ID 和终点 ID 组成
export const EdgeID = (source: string, target: string) => `${source}->${target}`

/// 节点属性的 ID
/// 对于数据节点，ID 由数据本身的 ID 和属性名组成
/// 对于操作节点，ID 由操作节点的 ID 和映射后的属性名组成
export const AttrID = (id: string, name: string) => `${id}_${name}`

/// 数据节点包含的类别
export type DataCategory = 'raw-data' | 'data-collection' | 'structured-data' | 'model'
/// 操作节点包含的类别
export type OperCategory = 'data-process' | 'algorithm'
export type NodeCategory = DataCategory | OperCategory

type EdgeCategory = 'node' | 'attr'

/// 所有种类节点都有的基础数据
export type NodeData = {
    name: string,
    info?: any,
}

/// 数据节点特有的数据
export type DataNodeData = NodeData & {
    category: DataCategory,
    stored_data?: Record<string, any>
}

/// 操作节点特有的数据
export type OperNodeData = NodeData & {
    category: OperCategory,
    mapping_data?: Record<string, string>,
}

/// 由后端传入的原始节点数据
export type RawNode = {
    id: string,
    sub: string[],
} & (
        ({ type: 'data' } & DataNodeData) |
        ({ type: 'operation' } & OperNodeData)
    )

/// React flow 的节点类型
export type WorkflowNode = Node<DataNodeData | OperNodeData>

/// React flow 的边类型
export type WorkflowEdge = Edge<{ category?: EdgeCategory }>

/// 根据原始节点数据获取相应类型的节点数据
const getData = (rawNode: RawNode) => {
    const { name, type, info } = rawNode
    switch (type) {
        case 'data':
            const { stored_data, category: dataCategory } = rawNode
            return { name, info, category: dataCategory, stored_data } as DataNodeData
        case 'operation':
            const { mapping_data, category: operCategory } = rawNode
            return { name, info, category: operCategory, mapping_data } as OperNodeData
    }
}

const processRawNode = (rawNode: RawNode): WorkflowNode => {
    const { id, type } = rawNode
    return {
        id,
        type,
        position: { x: 0, y: 0 },
        draggable: false,
        data: getData(rawNode)
    }
}

export default (rawNodes: RawNode[]): { nodes: WorkflowNode[], edges: WorkflowEdge[] } => {
    const nodes: WorkflowNode[] = []
    const lookup = new Map(rawNodes.map(node => [node.id, node]))
    const edges: WorkflowEdge[] = []

    for (const rawNode of rawNodes) {
        const { id: rawID, sub, type } = rawNode
        nodes.push(processRawNode(rawNode))
        // 数据节点取 stored_data 的 key，操作节点取 mapping_data 的 value
        const sourceAttrs = new Set(type === 'data' ? Object.keys(rawNode.stored_data ?? {}) : Object.values(rawNode.mapping_data ?? {}))

        for (const subID of sub) {
            let attrConnected = false


            const node = lookup.get(subID)
            if (node === undefined) { throw new Error(`invalid sub node: ${subID}`) }

            const { id: subNodeID, type } = node
            const data = (type === 'data' ? node.stored_data : node.mapping_data)
            if (data !== undefined && Object.keys(data).length !== 0) {
                const targetAttrs = new Set(Object.keys(data))

                for (const sourceAttr of sourceAttrs.values()) {
                    if (targetAttrs.has(sourceAttr)) {
                        attrConnected = true

                        const sourceID = AttrID(rawID, sourceAttr)
                        const targetID = AttrID(subNodeID, sourceAttr)
                        edges.push({
                            id: EdgeID(sourceID, targetID),
                            source: rawID,
                            sourceHandle: sourceID,
                            target: subNodeID,
                            targetHandle: targetID,
                            data: { category: 'attr' }
                        })
                    }
                }
            }
            edges.push({
                id: EdgeID(rawID, subID),
                source: rawID,
                sourceHandle: rawID,
                target: subID,
                targetHandle: subID,
                data: { category: 'node' },
                hidden: attrConnected,
            })
        }
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
        stored_data: {
        }
    },
    {
        id: '6',
        name: 'DataCollection2',
        category: 'data-collection',
        // pre: [],
        sub: ['9'],
        type: 'data',
        stored_data: {
            '字段1': '值1',
            '字段2': '值2',
            '字段3': '值3',
            '字段4': '值4',
            '字段5': '值5',
            '字段6': '值6',
        }
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
        mapping_data: {
            '字段1': '字段1-1',
        }
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
        mapping_data: {
            '字段1-1': '字段1-2',
        }
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
        stored_data: {
            '字段1-2': '值1-2'
        }
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