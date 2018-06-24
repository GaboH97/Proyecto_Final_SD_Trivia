package persistence;

import com.google.gson.Gson;
import java.util.ArrayList;
import spark.ResponseTransformer;

/**
 *
 * @author Gabriel Huertas, Juan Molina, Cesar Cardozo
 */
public class JsonUtil {

    /**
     *
     * @param object
     * @return a String representation of an object in JSON format
     */
    public static String toJson(Object object) {
        return new Gson().toJson(object);
    }

    public static ArrayList<String> getIds(String text, String param) {
        System.out.println(text);
        ArrayList<String> list = new ArrayList<>();
        for (int i = -1; (i = text.indexOf(param, i + 1)) != -1; i++) {
            list.add(getId(text.substring(i + param.length(), text.length())));
        }
        return list;
    }

    public static String getId(String string) {
        return string.substring(0, string.indexOf("&"));
    }

    public static String getText(String text,String param) {
        for (int i = -1; (i = text.indexOf(param, i + 1)) != -1; i++) {
            return  getId(text.substring(i + param.length(), text.length())).replace('+', ' ');
        }
        return null;
    }

    /**
     *
     * @return A response transformer object that contains a string
     * representation of a persisted object
     */
    public static ResponseTransformer json() {
        return JsonUtil::toJson;
    }
}
