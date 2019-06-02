package haemimont.goldfinger.service;

import java.util.Map;
import java.util.SortedSet;

public interface MapService {
    Map getPolygonData(double x, double y, String shapeType);
    SortedSet<String> getAllShapesNames();
}
