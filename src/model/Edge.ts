import { LineString } from "geojson";
import { Vertex } from "./Vertex";
import length from "@turf/length";
import { lineString, tag } from "@turf/turf";

/**
 * An edge with its source and target
 */
export class Edge {
    id: string;
    geometry: LineString
    private _source: Vertex;
    private _target: Vertex;
    
    constructor(source: Vertex, target: Vertex){
        this._source = source;
        this._target = target;
        this._source._outEdges.push(this);
        this._target._inEdges.push(this);
    }
    
    getLength(): number {
        return length(lineString(this.getGeometry().coordinates));
    }
    getSource():Vertex {return this._source }
    getTarget():Vertex {return this._target }

    getGeometry(): LineString {
        return this.geometry ? this.geometry : {
            type: "LineString",
            coordinates: [
                this.getSource().coordinate,
                this.getTarget().coordinate
            ]
        }
    }
    setGeometry(geometry: LineString){
        this.geometry = geometry 
    }

}

