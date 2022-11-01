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
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
    {
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
    {
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
    {
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
    {
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
    {
        title: '114514',
        attributes: {
            '1919810': '1919810',
            '114514': '114514',
            '810': '810',
            '1919': '1919',
        }
    },
]

export default () => {
    return <div className="w-full h-full space-y-2 p-2 overflow-y-scroll">
        {init.map((block, index) => <Block key={index} {...block} />)}
    </div>
}