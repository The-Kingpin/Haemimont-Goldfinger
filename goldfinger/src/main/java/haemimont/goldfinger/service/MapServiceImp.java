package haemimont.goldfinger.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import haemimont.goldfinger.helpers.GeoJSON.Data;
import haemimont.goldfinger.helpers.GeoJSON.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;

@Service
@PropertySource("classpath:application.properties")
public class MapServiceImp implements MapService {

    private static final String NO_RESULT_FOUND = "No data found for this location...";

    private String url;
    private String username;
    private String password;
    private ObjectMapper jsonMapper;

    @Autowired
    MapServiceImp(Environment environment, ObjectMapper jsonMapper) {
        this.url = environment.getProperty("spring.datasource.url");
        this.username = environment.getProperty("spring.datasource.username");
        this.password = environment.getProperty("spring.datasource.password");
        this.jsonMapper = jsonMapper;
    }

    @Override
    public Map getPolygonData(double x, double y, String shapeType) {
        HashMap<String, Object> polygon = new HashMap<>();
        String polygonGeometry = String.format("%s.geom", shapeType);

        String sql = String.
                format("SELECT * , ST_ASGEOJSON(%s) as json FROM %s WHERE ST_CONTAINS(%s, ST_MAKEPOINT(%f, %f))",
                        polygonGeometry, shapeType, polygonGeometry, x, y);

        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery();
        ) {

            if (!resultSet.isBeforeFirst()) {
                System.out.println(NO_RESULT_FOUND);
                throw new EmptyResultDataAccessException(NO_RESULT_FOUND, 1);
            }

            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            int columnCount = resultSetMetaData.getColumnCount();
            polygon = new HashMap<>();

            while (resultSet.next()) {
                for (int i = 1; i <= columnCount; i++) {

                    if ("geom".equals(resultSetMetaData.getColumnName(i))) {

                        Source source = new Source();
                        Data data = new Data();


                        String json = resultSet.getString("json");

                        Map map = jsonMapper.readValue(json, Map.class);

                        data.setGeometry(map);
                        source.setData(data);

                        //      polygon.put("geometry", map);

                        polygon.put("source", source);

                    } else if ("gid".equals(resultSetMetaData.getColumnName(i))) {
                        polygon.put("id", String.valueOf(resultSet.getLong(i)));
                        polygon.put("type", "fill");

                    } else if (!"json".equals(resultSetMetaData.getColumnName(i))) {
                        polygon.put(resultSetMetaData.getColumnName(i), resultSet.getObject(i));
                    }
                }
            }


            Map<String, Object> color = new HashMap<>();
            color.put("fill-color", "#088");
            color.put("fill-opacity", 0.5);
            polygon.put("paint", color);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return polygon;
    }

    @Override
    public SortedSet<String> getAllShapesNames() {
        String sql = "SELECT table_name as shapes\n" +
                "  FROM information_schema.tables\n" +
                " WHERE table_schema='public'\n" +
                "   AND table_type='BASE TABLE'\n" +
                "   AND table_name != 'spatial_ref_sys';";

        SortedSet<String> shapes = new TreeSet<>();

        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            if (!resultSet.isBeforeFirst()) {
                System.out.println(NO_RESULT_FOUND);
                throw new EmptyResultDataAccessException(NO_RESULT_FOUND, 1);
            }

            while (resultSet.next()) {
                String shapeName = resultSet.getString("shapes").replaceAll("_", " ");
                shapeName = shapeName.substring(0, 1).toUpperCase().concat(shapeName.substring(1));
                shapes.add(shapeName);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return shapes;
    }
}