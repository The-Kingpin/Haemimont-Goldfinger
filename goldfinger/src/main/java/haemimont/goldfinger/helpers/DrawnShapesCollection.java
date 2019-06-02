package haemimont.goldfinger.helpers;

import java.util.HashSet;
import java.util.Set;

public class DrawnShapesCollection {

    private Set<Integer> drawnShapes;

    public DrawnShapesCollection() {
        this.drawnShapes = new HashSet<>();
    }

    public Set<Integer> getDrawnShapes() {
        return drawnShapes;
    }

    public void addShape(int shapeId) {
        if (!this.drawnShapes.contains(shapeId)){
            this.drawnShapes.add(shapeId);
        }else {
            removeShape(shapeId);
        }
    }

    private void removeShape(int shapeId){

        this.drawnShapes.remove(shapeId);
    }

    public void clearShapes(){
        this.drawnShapes.clear();
    }
}


