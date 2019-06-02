package haemimont.goldfinger.helpers.GeoJSON;

import org.springframework.validation.ObjectError;

public class Source {
    private String type;
    private Data data;

    public Source() {
        setType();
    }

    public Source(String type, Data data) {
        this.type = type;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    private void setType() {
        this.type = "geojson";
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }
}
