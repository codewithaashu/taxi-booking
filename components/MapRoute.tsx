import { Source, Layer } from "react-map-gl";
function MapRoute(props: any) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinates },
        properties: null,
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#1967D2", "line-width": 5 }}
      />
    </Source>
  );
}

export default MapRoute;
