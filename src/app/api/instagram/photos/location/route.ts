import DataPhotos from "@/data/data-photos-insta.json";
import { InstaData } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

function getOrientation(width: number, height: number) {
  if (width > height) return "landscape";
  if (height > width) return "portrait";
  return "square";
}

function getPhotos(data: InstaData[], lat: string, lng: string) {
  const photos = data
    .map((item) => {
      if (item.location?.lat?.toString() != lat) return {};
      if (item.location?.lng?.toString() != lng) return {};
      console.log("🚀 ~ file: route.ts:16 ~ .map ~ item:", item);
      const medias = item.carousel_media?.map((media) => {
        console.log("media: ", media);

        return {
          id: media.id,
          orientation: getOrientation(
            media.original_width,
            media.original_height
          ),
          original_width: media.original_width,
          original_height: media.original_height,
          accessibility_caption: media.accessibility_caption,
          local_url: `http://localhost:3001/images/${media.id}.jpg`,
        };
      });
      console.log("🚀 ~ file: route.ts:27 ~ medias ~ medias:", medias);
      return {
        id: item.id,
        caption: item.caption,
        carousel_media: medias,
      };
    })
    .filter((item) => item.id);
  return photos;
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");
  if (lat && lng) {
    const photos = getPhotos(DataPhotos, lat, lng);
    return NextResponse.json({ photos });
  }
  return NextResponse.json({ photos: [] });
}
