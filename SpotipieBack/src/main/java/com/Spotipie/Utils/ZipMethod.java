package com.Spotipie.Utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.*;

public class ZipMethod {

    public static void main(String[] args) throws IOException {
        System.out.println(Paths.get("").toAbsolutePath().toString());
        String path = Paths.get("").toAbsolutePath().toString();
        //myzip(path+"/src/main/java/com/Spotipie/zipRessources/my_spotify_data.zip");
    }

    public static List<ZipEntry> getStreamingHistoryFiles( ZipFile zipFile) throws IOException {

        List<ZipEntry> listOfFiles = new ArrayList<ZipEntry>();

        Enumeration<? extends ZipEntry> entries = zipFile.entries();

        while(entries.hasMoreElements()) {
            ZipEntry zipEntry = entries.nextElement();
            //System.out.println(zipEntry.getName());

           // Regex to only take StreamingHistory files
            Matcher matcher = Pattern.compile("MyData/StreamingHistory([0-9]+).json").matcher(zipEntry.getName());

            if(matcher.find()){
                listOfFiles.add(zipEntry);
            }
        }

        return listOfFiles;
    }

    private static void IterateThroughtStreamingHistory(ZipEntry zipEntry, ZipFile zipFile) throws IOException {

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
        String line;
        while((line = bufferedReader.readLine()) != null){
            System.out.println(line);
        }
        bufferedReader.close();
    }

    public static String zipFileToString(ZipEntry zipEntry,ZipFile zipFile) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
        String line;

        StringBuilder s = new StringBuilder();
        while((line = bufferedReader.readLine()) != null){
            s.append(line);
        }
        bufferedReader.close();

        return s.toString();
    }
}
