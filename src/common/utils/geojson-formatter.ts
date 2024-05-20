import { Feature, Geometry, Point } from 'typeorm';
import flip from '@turf/flip';

export class GeojsonFormatter {
  public static generateGeometryPoint(lon: number, lat: number): Point {
    const point: Point = {
      type: 'Point',
      coordinates: [lon, lat],
    };

    return point;
  }

  public static generateGeojson(geometry: Geometry): Feature {
    const flippedGeometry = flip(geometry);
    return {
      type: 'Feature',
      geometry: flippedGeometry,
      properties: {},
    };
  }

  public static parseGeojsonToGeom(geojson: Feature): Geometry {
    const geometry = geojson?.geometry as Geometry;
    if (!geometry) {
      return null;
    }
    const flippedGeometry: Geometry = flip(geometry);

    return flippedGeometry;
  }
}
