export interface InstaData {
  id: string;
  device_timestamp: number;
  media_type: number;
  code: string;
  location?: Location;
  lat?: number;
  lng?: number;
  carousel_media_count?: number;
  carousel_media?: CarouselMedia[];
  like_count: number;
  caption: Caption;
}

export interface Caption {
  text: string;
}

export interface CarouselMedia {
  id: string;
  media_type: number;
  product_type: string;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  explore_pivot_grid: boolean;
  accessibility_caption?: string;
  pk: string;
  carousel_parent_id: string;
  commerciality_status: string;
  sharing_friction_info: SharingFrictionInfo;
  fb_user_tags?: Tags;
  usertags?: Tags;
}

export interface Tags {
  in: In[];
}

export interface In {
  user: User;
  position: number[];
  start_time_in_video_in_sec: null;
  duration_in_video_in_sec: null;
}

export interface User {
  pk: string;
  pk_id: string;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
  profile_grid_display_type?: string;
}

export interface ImageVersions2 {
  candidates: Candidate[];
}

export interface Candidate {
  width: number;
  height: number;
  url: string;
  scans_profile: string;
}

export interface SharingFrictionInfo {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
  sharing_friction_payload: null;
}

export interface Location {
  pk: string;
  short_name: string;
  facebook_places_id: string;
  external_source: string;
  name: string;
  address: string;
  city: string;
  has_viewer_saved: boolean;
  lng?: number;
  lat?: number;
  is_eligible_for_guides: boolean;
}

export enum ExternalSource {
  FacebookPlaces = "facebook_places",
}
