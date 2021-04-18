package com.Spotipie.Utils;

import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class SpotInfo {
    //private static String path = Paths.get("").toAbsolutePath().toString()+"/src/main/java/com/Spotipie/zipRessources/my_spotify_data.zip";
    private static String path = "/spotipie/data/my_spotify_data.zip";

    public static void main(String[] args) throws IOException {
       //String song = "Cotton candy".toLowerCase();
        //getNumberOfPlayedSong(song);
        //getTopPlayedSong(5);
        //System.out.println(MapToJson(getTopPlayedSong(5)));
        //getAllPlayedSong();
        //searchForASong("cotton candy");
        //songsByPages(2,20);
        //System.out.println("Number of songs :" + numberofSongs()/20);
        //String testpath= Paths.get("").toAbsolutePath().toString();
        //System.out.println(testpath);
    }

    public static int numberofSongs() throws IOException {
        return getAllPlayedSong().size();
    }

    public static LinkedHashMap<String, Integer> songsByPages(int page,int nbElementInPage) throws IOException {
        LinkedHashMap<String,Integer> songs = getAllPlayedSong();
        LinkedHashMap<String,Integer> results= new LinkedHashMap<String,Integer>();
        int count = 0;

        //Delete the first one input
        AuxilaryFunctions.deleteNumberOfElementOnMap(page*nbElementInPage,songs);


        for(Map.Entry<String,Integer> entries : songs.entrySet()){
            if(count>= nbElementInPage)
                break;

            results.put(entries.getKey(), entries.getValue());
            count++;
        }

        return results;
    }



    /**
     * Search for a song
     * @param mysong : Trackname
     * @return Map that contains the result of the search
     * @throws IOException
     */
    public static LinkedHashMap<String, Integer> searchForASong(String mysong) throws IOException {
        String title = mysong.toLowerCase();
        LinkedHashMap<String,Integer> songs = getAllPlayedSong();
        LinkedHashMap<String,Integer> results= new LinkedHashMap<String,Integer>();

        for(Map.Entry<String,Integer> song : songs.entrySet()){
            String songtitle= song.getKey().split(":")[1];

            if(Pattern.compile(title).matcher(songtitle).find())
            {
                results.put(song.getKey(),song.getValue());
            }

        }

        /*for(Map.Entry<String,Integer> song2 : results.entrySet()){
            System.out.println(song2.getKey());
        }*/
        return results;
    }

    /**
     * Upload the Spotify data zip
     * @param request
     * @return True for success, else False
     */
    public static boolean uploadFile(MultipartHttpServletRequest request) throws Exception {
        Iterator<String> itr = request.getFileNames();


        MultipartFile file = request.getFile(itr.next());
        String fileType = request.getParameter("fileType");
        String fileName = file.getOriginalFilename();

        //Check of the name : Maybe i can use all filenames
        if(!fileName.equals("my_spotify_data.zip"))
            throw new Exception("Zip name is incorrect");

        /*String savingPathDirectory = Paths.get("").toAbsolutePath().toString()+
                "/src/main/java/com/Spotipie/zipRessources/";*/

        String savingPathDirectory = "/spotipie/data/";

        //Directory to save the file
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

    /**
     * Get the top playedSong
     * @param number : Represent the first top played songs
     * @return The "number" of top played songs
     * @throws IOException
     */
    public static LinkedHashMap<String, Integer> getTopPlayedSong(int number) throws IOException {

        LinkedHashMap<String,Integer> results = new LinkedHashMap<String,Integer>();
        int count=0;

        for(Map.Entry<String,Integer> entries : getAllPlayedSong().entrySet()) {

            if(count>= number)
                break;

            results.put(entries.getKey(), entries.getValue());
            count++;
        }

        //results.forEach( (k,v) -> System.out.println(k+" : "+v));
        return results;
    }

    /**
     * Number of listening of a specific song /!\ A changer
     * @param mysong
     * @throws IOException
     */
    public static void getNumberOfPlayedSong(String mysong) throws IOException {

        ZipFile zipFile = new ZipFile(path);
        List<ZipEntry> zipEntries = ZipMethod.getStreamingHistoryFiles(zipFile);

        //Key = Artist, Value = Number of listenings
        HashMap<String,Integer> mamap = new HashMap<String,Integer>();

        //Iterate throught all history files
        for(ZipEntry streamingHistoryFile: zipEntries ){
           List<String> songs =  IterateThroughtStreamingHistory(streamingHistoryFile,zipFile);

            songs.parallelStream().forEach( (c) -> {
                //Convert String to JSON
                JSONObject myjson = new JSONObject(c);

                //Convert trackname to lowerCase, to match the maximum of words
                String trackName= ((String)myjson.get("trackName")).toLowerCase();

                if(trackName.equals(mysong)){
                    String artist = (String)myjson.get("artistName");

                    if(mamap.containsKey(artist)){
                        int temp = mamap.get(artist)+1;
                        mamap.put(artist,temp);
                    }
                    else{
                        mamap.put(artist,1);
                    }
                }

            });
        }
        
        /*for(Map.Entry<String,Integer> entries : mamap.entrySet()) {
            System.out.println("Artist : "+entries.getKey()+" Song : "+mysong+" Nb écoutes : "+entries.getValue());
        }*/
    }



    private static List<String> IterateThroughtStreamingHistory(ZipEntry zipEntry, ZipFile zipFile) throws IOException {

       String myfile = ZipMethod.zipFileToString(zipEntry,zipFile);

       //Delete the "[" of the begining and the "]" at the end
       String myfile2 = myfile.substring( 1, myfile.length() - 1 );

       //String of the file to List of String
       List<String> songs = Arrays.asList(myfile2.split("(?<=}),"));

       return songs;

    }

    public static LinkedHashMap<String,Integer>  getAllPlayedSong() throws IOException {

        ZipFile zipFile = new ZipFile(path);
        List<ZipEntry> zipEntries = ZipMethod.getStreamingHistoryFiles(zipFile); //O(n)

        //Key = Artist, Value = Number of listenings
        LinkedHashMap<String,Integer> allPlayedSongMap = new LinkedHashMap<String,Integer>();

        //Iterate throught all history files (O(n2))
        for(ZipEntry streamingHistoryFile: zipEntries ){
            List<String> songs =  IterateThroughtStreamingHistory(streamingHistoryFile,zipFile);

            songs.stream().forEach( (c) -> {
                //Convert String to JSON
                JSONObject myjson = new JSONObject(c);

                //Convert trackname to lowerCase, to match the maximum of words
                String trackName= ((String)myjson.get("trackName")).toLowerCase();
                String artist = (String)myjson.get("artistName");

                String key = artist+":"+trackName;

                if(allPlayedSongMap.containsKey(key)){
                    int temp = allPlayedSongMap.get(key)+1;
                    allPlayedSongMap.put(key,temp);
                }
                else{
                    allPlayedSongMap.put(key,1);
                }

            });
        }

        //sorted by descending order
        LinkedHashMap<String,Integer> sortedPlayedSongs = new LinkedHashMap<String,Integer>();

        // O(n)
        allPlayedSongMap.entrySet().stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .forEach( (e) -> sortedPlayedSongs.put(e.getKey(),e.getValue()));

        //clear memory of the old map
        allPlayedSongMap.clear();

       /* for(Map.Entry<String,Integer> entries : sortedPlayedSongs.entrySet()) {
            System.out.println("Song : "+entries.getKey()+" Nb écoutes : "+entries.getValue());
        }*/

        return sortedPlayedSongs;
    }


    /**
     * Sort an HashMap of a Pair
     * @param allPlayedSongMap
     * @return LinkedHashMap (HashMap with order)
     */
    private static LinkedHashMap<String, Pair<String, Integer>> sortedBooksFromKeywords(
            LinkedHashMap<String,Pair<String,Integer>> allPlayedSongMap){

        //LinkedHashMap : Préserver l'ordre des élémenents
        LinkedHashMap<String, Pair<String, Integer>> sortedMap;

        //Use Comparator.reverseOrder() for reverse ordering
        sortedMap = allPlayedSongMap.entrySet()
                .stream()
                .sorted((b1,b2) -> compare(b1.getValue(),b2.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        return sortedMap;
    }

    /**
     * Compare 2 pair
     * @param p1
     * @param p2
     * @return
     */
    private static int compare(Pair<String,Integer> p1, Pair<String,Integer> p2) {
        return p2.getValue() - p1.getValue();
    }



}
