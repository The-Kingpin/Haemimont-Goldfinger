package haemimont.goldfinger.service;

import java.util.Map;
import java.util.SortedSet;

public interface MapService {
    Map getPolygonData(double x, double y, String shapeType, String colorByField);
    SortedSet<String> getAllShapesNames();
    SortedSet<String> findAllShapesFieldsNames(String shapeType);
    String setColorByFieldValue(String fieldName);
}
