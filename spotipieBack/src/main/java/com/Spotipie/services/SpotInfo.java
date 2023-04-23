package com.spotipie.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spotipie.domain.Song;
import com.spotipie.repository.ZipMethod;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

@Service
public class SpotInfo {
    private ZipMethod zipMethod;

    public SpotInfo(ZipMethod zipMethod) {
        this.zipMethod = zipMethod;
    }

    public List<Song> getAllPlayedSongs() throws IOException {
        return zipMethod.getAllPlayedSong();
    }

    public int numberofSongs() throws IOException {
        return zipMethod.getAllPlayedSong().size();
    }

    public List<Song> songsByPages(int page, int nbElementInPage) throws IOException {
        List<Song> songList = zipMethod.getAllPlayedSong();
        List<Song> results = new ArrayList<>();

        int min = page * nbElementInPage;
        int max = Math.min(songList.size(), page * nbElementInPage + nbElementInPage);

        for (Song song : songList.subList(min, max)) {
            results.add(song);
        }

        return results;
    }

    /**
     * Search for a song
     * 
     * @param mysong : Trackname
     * @return Map that contains the result of the search
     * @throws IOException
     */
    public List<Song> searchForASong(String mysong) throws IOException {
        String title = mysong.toLowerCase();
        List<Song> songList = zipMethod.getAllPlayedSong();
        List<Song> results = new ArrayList<>();

        songList.forEach(song -> {
            if (Pattern.compile(title).matcher(song.getName()).find()) {
                results.add(song);
            }
        });

        return results;
    }

    /**
     * Get the top playedSong
     * 
     * @param number : Represent the first top played songs
     * @return The "number" of top played songs
     * @throws IOException
     */
    public List<Song> getTopPlayedSong(int number) throws IOException {

        List<Song> results = new ArrayList<>();
        AtomicInteger count = new AtomicInteger(0);

        zipMethod.getAllPlayedSong().stream()
                .forEach(song -> {
                    if (count.getAndIncrement() < number) {
                        results.add(song);
                    }
                });

        return results;
    }

    /**
     * Upload the Spotify data zip
     * 
     * @param request
     * @return True for success, else False
     */
    public boolean uploadFile(MultipartHttpServletRequest request) throws Exception {
        Iterator<String> itr = request.getFileNames();

        MultipartFile file = request.getFile(itr.next());
        String fileName = file.getOriginalFilename();

        // Check of the name : Maybe i can use all filenames
        if (!fileName.equals("my_spotify_data.zip"))
            throw new Exception("Zip name is incorrect");

        String savingPathDirectory = "/spotipie/data/";

        // Directory to save the file
        File dir = new File(savingPathDirectory);
        File fileToImport = null;
        if (dir.isDirectory()) {
            try {
                fileToImport = new File(dir + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileToImport));
                stream.write(file.getBytes());
                stream.close();
            } catch (Exception e) {
                System.out.println("Got error in uploading file.");
            }

        }
        return true;
    }

    // private void sort(List<Song> songList) {
    // Collections.sort(songList, new Comparator<Song>() {
    // @Override
    // public int compare(Song s1, Song s2) {
    // return Integer.compare(s2.getNumberOfListening(), s1.getNumberOfListening());
    // }
    // });
    // }
}
