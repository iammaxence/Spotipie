package com.spotipie.controller;

import java.util.List;

import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spotipie.domain.Song;
import com.spotipie.services.SpotInfo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SearchEngine {

    /**
     * Error Attributes in the Application
     */
    private ErrorAttributes errorAttributes;
    private final static String ERROR_PATH = "/error";

    private SpotInfo spotInfo;

    /**
     * Controller for the Error Controller
     * 
     * @param errorAttributes
     */
    public void AppErrorController(ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

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

    @RequestMapping("/search")
    public List<Song> searchSong(@RequestParam(value = "song") String song)
            throws Exception {

        return spotInfo.searchForASong(song);
    }

    @RequestMapping("/numberOfSongs")
    public int getnumberOfSongs() throws Exception {

        return spotInfo.numberofSongs();
    }

    @RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
    public boolean uploadFile(MultipartHttpServletRequest request) throws Exception {
        return spotInfo.uploadFile(request);
    }

}
