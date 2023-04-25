package com.spotipie.repository;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public class FileManager {

  private static final String savingPathDirectory = "./";

  /**
     * Upload the Spotify data zip
     * 
     * @param request
     * @return True for success, else False
     * @throws Exception
     */
    public void uploadFile(MultipartFile file) throws Exception {
      assertFileNameIsNotValid(file.getOriginalFilename());

      saveFile(file);
  }

  private void saveFile(MultipartFile file) {
    File dir = new File(savingPathDirectory);
    File fileToImport = null;
    if (dir.isDirectory()) {
      try {
        
          fileToImport = new File(dir + File.separator + file.getOriginalFilename());
          BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileToImport));
          stream.write(file.getBytes());

          stream.close();
      } catch (Exception e) {
          System.out.println("Got error in uploading file : "+e);
      }
    } else {
      System.out.println("Path to save is not a directory");
    }
  }

  private void assertFileNameIsNotValid(String fileName) throws Exception {
    if (!fileName.equals("my_spotify_data.zip")) {
      throw new Exception("Zip name is incorrect");
  }
  }
}
