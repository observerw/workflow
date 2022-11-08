type BlockProps = {
    title: string,
    attributes: { [name: string]: string }
}
const Block = ({ title, attributes }: BlockProps) => {
    return <div className="w-full min-h-[20px] shadow-md rounded-lg border border-gray-200 p-2">
        <div className="font-semibold mb-2">{title}</div>
        {Object.entries(attributes).map(([name, value]) =>
            <div key={name} className="flex flex-row text-sm mb-2 space-x-1 overflow-hidden">
                <div className="w-1/4 flex items-center justify-end">{name} :</div>
                <div className="w-3/4 border border-gray-400 p-[2px] rounded-sm bg-gray-100">{value}</div>
            </div>)}
    </div>
}

const init = [
    {
        title: '节点属性1',
        attributes: {
            '属性1': '值1',
            '属性2': '值2',
            '属性3': '值3',
        }
    },
    {
        title: '节点属性2',
        attributes: {
            '属性1': '值1',
            '属性2': '值2',
            '属性3': '值3',
        }
    },
    {
        title: '节点属性3',
        attributes: {
            '属性1': '值1',
            '属性2': '值2',
            '属性3': '值3',
        }
    },
    {
        title: '节点属性4',
        attributes: {
            '属性1': '值1',
            '属性2': '值2',
            '属性3': '值3',
        }
    },
]

export default () => {
    return <div className="w-full h-full space-y-2 p-2 overflow-y-scroll">
        {init.map((block, index) => <Block key={index} {...block} />)}
    </div>
}