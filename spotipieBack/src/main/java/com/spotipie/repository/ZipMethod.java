package com.spotipie.repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;
import java.util.zip.*;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.spotipie.domain.Song;
import com.spotipie.domain.Song.SongBuilder;

@Repository
public class ZipMethod {
    private String path = "my_spotify_data.zip";

    public ZipMethod() {
    }

    public List<Song> getAllPlayedSong() throws IOException {

        ZipFile zipFile = new ZipFile(path);
        List<ZipEntry> zipEntries = getStreamingHistoryFiles(zipFile);

        List<Song> allPlayedSong = new ArrayList<>();

        for (ZipEntry streamingHistoryFile : zipEntries) {
            List<String> songs = iterateThroughtStreamingHistory(streamingHistoryFile, zipFile);

            songs.stream().forEach(c -> {
                // Convert String to JSON
                JSONObject myjson = new JSONObject(c);

                // Convert trackname to lowerCase, to match the maximum of words
                String trackName = ((String) myjson.get("trackName")).toLowerCase();
                String artist = (String) myjson.get("artistName");

                addSongToList(allPlayedSong, artist, trackName);
            });
        }

        return allPlayedSong;
    }

    private void addSongToList(List<Song> songList, String artistName, String title) {
        int index = getIndexOf(songList, artistName, title);

        if (index >= 0) {
            Song originalSong = songList.get(index);
            Song modifiedSong = new SongBuilder().artistName(artistName).name(title)
                    .numberOfListening(originalSong.getNumberOfListening() + 1).build();
            songList.set(index, modifiedSong);
        } else {
            songList.add(new SongBuilder().artistName(artistName).name(title)
                    .numberOfListening(1).build());
        }
    }

    private int getIndexOf(List<Song> songList, String artistName, String title) {
        return IntStream.range(0, songList.size())
                .filter(i -> songList.get(i).equals(artistName) && songList.get(i).getName().equals(title)).findFirst()
                .orElse(-1);
    }

    private List<String> iterateThroughtStreamingHistory(ZipEntry zipEntry, ZipFile zipFile) throws IOException {

        String myfile = zipFileToString(zipEntry, zipFile);

        // Delete the "[" of the begining and the "]" at the end
        String myfile2 = myfile.substring(1, myfile.length() - 1);

        // String of the file to List of String
        List<String> songs = Arrays.asList(myfile2.split("(?<=}),"));

        return songs;

    }

    private List<ZipEntry> getStreamingHistoryFiles(ZipFile zipFile) {

        List<ZipEntry> listOfFiles = new ArrayList<>();

        Enumeration<? extends ZipEntry> entries = zipFile.entries();

        while (entries.hasMoreElements()) {
            ZipEntry zipEntry = entries.nextElement();
            Matcher matcher = Pattern.compile("MyData/StreamingHistory([0-9]+).json").matcher(zipEntry.getName());

            if (matcher.find()) {
                listOfFiles.add(zipEntry);
            }
        }

        return listOfFiles;
    }

    private String zipFileToString(ZipEntry zipEntry, ZipFile zipFile) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipEntry)));
        String line;

        StringBuilder s = new StringBuilder();
        while ((line = bufferedReader.readLine()) != null) {
            s.append(line);
        }
        bufferedReader.close();

        return s.toString();
    }
}
