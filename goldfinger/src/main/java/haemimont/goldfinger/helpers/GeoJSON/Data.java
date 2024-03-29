package haemimont.goldfinger.helpers.GeoJSON;

import java.util.Map;

public class Data {
    private String type;
    private Map geometry;

    public Data() {
        setType();
    }

    public String getType() {
        return type;
    }

    private void setType() {
        this.type = "Feature";
    }

    public Map getGeometry() {
        return geometry;
    }

    public void setGeometry(Map geometry) {
        this.geometry = geometry;
    }
}
