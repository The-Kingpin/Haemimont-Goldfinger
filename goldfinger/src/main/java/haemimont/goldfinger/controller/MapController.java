package haemimont.goldfinger.controller;

import haemimont.goldfinger.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.SortedSet;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:8080")
@RestController
@RequestMapping("/map")
public class MapController {

    private MapService mapService;

    @Autowired
    MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping
    public String maps() {

        return "Success!";
    }

    @RequestMapping(value = "/draw", params = {"x", "y", "shape"}, method = RequestMethod.GET)
    public Map drawShape(double x, double y, String shape) {

        System.out.println();
        try {
            return mapService.getPolygonData(x, y, shape);
        } catch (ResourceAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/shapes")
    public SortedSet getAllShapesNames() {
        return mapService.getAllShapesNames();
    }
}
