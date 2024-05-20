import { Geometry } from 'typeorm';

export interface Geojson {
  type: string;
  geometry: Geometry;
  properties: object;
}
