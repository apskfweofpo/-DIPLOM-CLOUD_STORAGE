export const GeojsonExamples = {
  point: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [54.186, 26.5111],
    },
    properties: {},
  },

  lineString: {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [27.604005, 53.914889],
        [27.609426, 53.910393],
      ],
    },
    properties: {},
  },

  multiPolygon: {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [54.18607706157252, 26.511108271707087],
          [53.51576895841902, 26.511108271707087],
          [53.51576895841902, 29.081289986434484],
          [54.18607706157252, 29.081289986434484],
          [54.18607706157252, 26.511108271707087],
        ],
      ],
    },
  },
} as const;
