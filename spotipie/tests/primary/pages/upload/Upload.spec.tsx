import { describe, expect, vi} from 'vitest';
import { useNavigate } from 'react-router-dom';
import { useUploadHelper } from '../../../src/primary/pages/upload/UploadHelper';
import { act, renderHook } from '@testing-library/react';
import * as ReactRouterDom from "react-router-dom";
import { AxiosHttpFixture } from '../../config/AxiosHttpFixture';

vi.mock('../../src/config/AxiosHttp'); 

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));


const axiosHttp = AxiosHttpFixture();

describe('useUploadHelper', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should upload a file', async () => {
    const setIsFileUpload = vi.fn();
    const { result } = renderHook(() => useUploadHelper({axiosHttp, setIsFileUpload}));
    vi.spyOn(ReactRouterDom, 'useNavigate');

    const file1 = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });
    const file2 = new File(["Lorem ipsum dolor sit amet."], "lorem.txt", { type: "text/plain" });
    const file3 = new File(["Consectetur adipiscing elit."], "ipsum.txt", { type: "text/plain" });

    const fileList = {
      0: file1,
      1: file2,
      2: file3,
      length: 3,
    };

    const input = {
      target: {
        files: fileList
      }
    }

    act(() => {
      result.current.setInput(input);
    });
    
    result.current.uploadFileToServer();

    expect(setIsFileUpload).toHaveBeenCalledWith(true);
    expect(useNavigate).toHaveBeenCalledOnce();
  });

  it('Should throw error when input file is empty', () => {
    const setIsFileUpload = vi.fn();
    const { result } = renderHook(() => useUploadHelper({axiosHttp,setIsFileUpload}));
    vi.spyOn(ReactRouterDom, 'useNavigate');

    const input = {
      target: {
        files: []
      }
    }

    act(() => {
      result.current.setInput(input);
    });

    expect(() => result.current.uploadFileToServer()).toThrow('Invalid file');
  })
});