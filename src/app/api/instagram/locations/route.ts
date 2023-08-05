import DataPhotos from "@/data/data-photos-insta.json";
import { InstaData } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

function getLocations(data: InstaData[]) {
  const locations = data.map((item) =>
    JSON.stringify({
      lat: item.location?.lat,
      lng: item.location?.lng,
      mediaCount: item.carousel_media_count,
    })
  );
  const uniqueLocations = [...new Set(locations)];
  return uniqueLocations
    .map((item) => JSON.parse(item))
    .filter((item) => item.lat && item.mediaCount);
}

export async function GET(request: NextRequest) {
  const locations = getLocations(DataPhotos);
  return NextResponse.json({ locations });
}
