import { CoordinatesFilter } from '../types/coordinates-filter.type';

export class CoordinateFormatter {
  public static generateCoordinatesFilter(northwestCoords: string, southeastCoords: string) {
    const northwest: number[] = this.parseCoordinates(northwestCoords);
    const southeast: number[] = this.parseCoordinates(southeastCoords);

    const coordinateFilter: CoordinatesFilter = {
      northwest: {
        latitude: northwest[0],
        longitude: northwest[1],
      },
      southeast: {
        latitude: southeast[0],
        longitude: southeast[1],
      },
    };

    return coordinateFilter;
  }

  private static parseCoordinates(coordsString: string): number[] {
    return coordsString.split(',').map((coord) => Number(coord));
  }
}
