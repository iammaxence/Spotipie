import { describe, expect, vi} from 'vitest';
import { useNavigate } from 'react-router-dom';
import { useUploadHelper } from '../../src/pages/upload/UploadHelper';
import { fireEvent, render } from '@testing-library/react';

vi.mock('../../src/config/AxiosHttp'); 

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useUploadHelper', () => {
  // it('should upload a file', () => {
  //   const setIsFileUpload = vi.fn();
  //   const { getByLabelText } = render(
  //     <input type="file" onChange={useUploadHelper({ setIsFileUpload }).setInput} />
  //   );

  //   const file = new File(['test'], 'test.zip', { type: 'application/zip' });
  //   const input = getByLabelText('File upload');
  //   fireEvent.change(input, { target: { files: [file] } });

  //   const { uploadFileToServer } = useUploadHelper({ setIsFileUpload });
  //   uploadFileToServer();

  //   expect(setIsFileUpload).toHaveBeenCalledWith(true);
  //   expect(useNavigate).toHaveBeenCalledWith('/home');
  // });

  // it('should throw an error if no file is selected', () => {
  //   const setIsFileUpload = vi.fn();
  //   const { getByLabelText } = render(
  //     <input type="file" onChange={useUploadHelper({ setIsFileUpload }).setInput} />
  //   );

  //   const input = getByLabelText('File upload');
  //   expect(() => fireEvent.change(input, { target: { files: [] } })).toThrow('Invalid file');
  // });
});