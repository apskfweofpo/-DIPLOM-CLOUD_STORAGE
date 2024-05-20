import { lineString } from '@turf/helpers';
import wellknown from 'wellknown';

export class CoordinateManager {
  static parseCoordinates(input: string) {
    const regexp = new RegExp('-?\\d+\\.\\d+\\s*-?\\d+\\.\\d+', 'g');
    const coordinates = input
      .replace('LINESTRING (', '')
      .replace(')', '')
      .match(regexp)
      .map((pair) => {
        const [x, y] = pair.split(' ').map((coord) => parseFloat(coord));
        return [x, y];
      });

    return coordinates;
  }

  static convertMultilineStringToLineString(multiLineString: string) {
    if (multiLineString?.startsWith('MULTILINESTRING')) {
      const multilineGeometry = wellknown.parse(multiLineString);

      const lineStringGeometry = {
        type: 'LineString',
        coordinates: multilineGeometry.coordinates.flat(),
      };

      multiLineString = wellknown.stringify(lineStringGeometry);
    }
    const lineStringGeom = lineString(this.parseCoordinates(multiLineString));

    return lineStringGeom;
  }
}
