package com.spotipie.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spotipie.domain.Song;
import com.spotipie.services.SpotInfo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SearchEngine {

    private SpotInfo spotInfo;

    public SearchEngine(SpotInfo spotInfo) {
        this.spotInfo = spotInfo;
    }

    @RequestMapping("/top")
    public List<Song> getTopPlayedSongs(@RequestParam(value = "num") int number) throws Exception {

        return spotInfo.getTopPlayedSong(number);
    }

    @RequestMapping("/allsongs")
    public List<Song> getAllPlayedSongs() throws Exception {

        return spotInfo.getAllPlayedSongs();
    }

    @RequestMapping("/songsByPages")
    public List<Song> getAllPlayedSongs(@RequestParam(value = "page") int page,
            @RequestParam(value = "nbElementByPage") int nbElementByPage) throws Exception {

        return spotInfo.songsByPages(page, nbElementByPage);
    }

    @GetMapping("/search")
    public List<Song> searchSong(@RequestParam(value = "song") String song)
            throws Exception {

        return spotInfo.searchForASong(song);
    }

    @RequestMapping("/numberOfSongs")
    public int getnumberOfSongs() throws Exception {

        return spotInfo.numberofSongs();
    }

    @PostMapping(value = "/uploadfile")
    public void uploadFile(MultipartHttpServletRequest request) throws Exception {
        spotInfo.uploadFile(request);
    }

}
