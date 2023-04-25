import './Upload.scss';
import { useUploadHelper } from "./UploadHelper";

interface UploadProps {
  setIsFileUpload: (isFileUpload: boolean) => void
}

export function Upload({ setIsFileUpload }: UploadProps) {

  const { uploadFileToServer, setInput } = useUploadHelper({setIsFileUpload})
  
  return (
    <>
      <h1 className="title" >Welcome to SpotiPie</h1>
      <form className="form">
        <input
          id="myzipId"
          type="file" 
          accept=".zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
          onChange={(v) => setInput(v)}
        />
        <button type="button" onClick={uploadFileToServer}>Submit</button>
      </form>
    </>
   );
}