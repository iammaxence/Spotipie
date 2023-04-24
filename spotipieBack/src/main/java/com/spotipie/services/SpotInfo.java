package com.spotipie.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spotipie.domain.Song;
import com.spotipie.repository.FileManager;
import com.spotipie.repository.ZipMethod;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

@Service
public class SpotInfo {
    private ZipMethod zipMethod;
    private FileManager fileManager;

    public SpotInfo(ZipMethod zipMethod, FileManager fileManager) {
        this.zipMethod = zipMethod;
        this.fileManager = fileManager;
    }

    public void uploadFile(MultipartHttpServletRequest request) throws Exception {
        fileManager.uploadFile(request.getFile(request.getFileNames().next()));
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

        sort(zipMethod.getAllPlayedSong()).stream()
                .forEach(song -> {
                    if (count.getAndIncrement() < number) {
                        results.add(song);
                    }
                });

        return results;
    }

    private List<Song> sort(List<Song> songList) {
        List<Song> sortedAllPlayedSong = new ArrayList<>(songList);

        Collections.sort(sortedAllPlayedSong, new Comparator<Song>() {
            public int compare(Song s1, Song s2) {
                return Integer.compare(s2.getNumberOfListening(), s1.getNumberOfListening());
            }
        });

        return sortedAllPlayedSong;
    }
}
