package com.Spotipie.Controller;

import com.Spotipie.Utils.SpotInfo;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.LinkedHashMap;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class SearchEngine {
    private static String path = Paths.get("").toAbsolutePath().toString()+"/src/main/java/com/Spotipie/myuploads";

    /**
     * Error Attributes in the Application
     */
    private ErrorAttributes errorAttributes;

    private final static String ERROR_PATH = "/error";

    /**
     * Controller for the Error Controller
     * @param errorAttributes
     */
    public void AppErrorController(ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

    @RequestMapping("/top")
    public LinkedHashMap<String, Integer> getTopPlayedSongs(@RequestParam(value = "num") int number) throws Exception {

        return SpotInfo.getTopPlayedSong(number);
    }

    @RequestMapping("/allsongs")
    public LinkedHashMap<String, Integer> getAllPlayedSongs() throws Exception {

        return SpotInfo.getAllPlayedSong();
    }

    @RequestMapping("/songsByPages")
    public LinkedHashMap<String, Integer> getAllPlayedSongs(@RequestParam(value = "page") int page,
                                                            @RequestParam(value="nbElementByPage")
                                                                    int nbElementByPage) throws Exception {

        return SpotInfo.songsByPages(page,nbElementByPage);
    }

    @RequestMapping("/search")
    public LinkedHashMap<String, Integer> getAllPlayedSongs(@RequestParam(value = "song") String song) throws Exception {

        return SpotInfo.searchForASong(song);
    }

    @RequestMapping("/numberOfSongs")
    public int getnumberOfSongs() throws Exception {

        return SpotInfo.numberofSongs();
    }


    @RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
    public boolean uploadFile(MultipartHttpServletRequest request) throws IOException {
        return SpotInfo.uploadFile(request);
    }

}
