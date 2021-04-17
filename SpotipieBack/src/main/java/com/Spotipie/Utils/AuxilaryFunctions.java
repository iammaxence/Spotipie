package com.Spotipie.Utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class AuxilaryFunctions {

    public static void main(String[] args) {
        HashMap<String,Integer> mamap = new HashMap<String,Integer>();
        mamap.put("hello",1);
        mamap.put("world",2);

        deleteNumberOfElementOnMap(0,mamap);

        System.out.println(mamap);
    }


    public static void deleteNumberOfElementOnMap(int number, Map<String,Integer> map){
        Iterator<String> it = map.keySet().iterator();
        int cpt = 0;
        while (it.hasNext() && cpt<number ) {
            it.next();
            it.remove();
            cpt++;
        }
    }
}
