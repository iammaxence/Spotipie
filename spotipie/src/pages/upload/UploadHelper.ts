import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpPort } from "../../config/HttpPort";

interface UploadHelperProps {
  axiosHttp: HttpPort
  setIsFileUpload: (isFileUpload: boolean) => void
}

export function useUploadHelper({axiosHttp, setIsFileUpload}: UploadHelperProps) {
  const [input, setInput] = useState<any>();
  const navigate = useNavigate();
  
  
  const uploadFileToServer = () => {
    let fileList: FileList = input.target.files;
    let file: File = fileList[0];

    if (fileList.length > 0 ) {
      const formData = buildFormDate(file);
      axiosHttp.post('/uploadfile', formData);

      setIsFileUpload(true);
      navigate("/home");
    } else {
      throw new Error('Invalid file')
    }
  }

  const buildFormDate = (file: File) => {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('fileType', 'zip');

    return formData;
  }

  return {
    uploadFileToServer,
    input,
    setInput
  }
} 