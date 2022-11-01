import SideTable from "./components/side-table"
import Workflow from "./components/workflow"


export default () => {
  return <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
    <div className="w-[75vw] h-[75vh] bg-white shadow-lg flex flex-row">
      <div className="w-3/4">
        <Workflow />
      </div>
      <div className="w-1/4 h-full shadow-lg">
        <SideTable />
      </div>
    </div>
  </div>
}