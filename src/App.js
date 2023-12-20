import { UploadExcel } from "./components";

function App() {
  return (
    <>
      <div className="flex flex-col mx-auto mt-20 px-10 items-center align-center h-[200px] w-[500px] bg-cyan-500 rounded-[10px]">
        <h1 className="text-4xl font-bold my-10 uppercase">Upload File</h1>
        <UploadExcel />
      </div>
    </>
  );
}

export default App;
