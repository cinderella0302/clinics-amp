import { MapProvider } from "@/providers/map-provider";
import { MapComponent } from "./Map";

export default function MapLayout() {

  return (
    // @ts-ignore
    <MapProvider>
      <MapComponent/>
    </MapProvider>
  );
}