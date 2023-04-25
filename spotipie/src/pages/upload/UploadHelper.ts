import axios from "axios";
import { AxiosHttp } from "../../config/AxiosHttp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UploadHelperProps {
  setIsFileUpload: (isFileUpload: boolean) => void
}

export function useUploadHelper({setIsFileUpload}: UploadHelperProps) {
  const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }))
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