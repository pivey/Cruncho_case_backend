/* eslint-disable camelcase */
export interface NearbyPlacesObj {
  business_status: string;
  geometry: {
        location: {
          lat: number,
          lng: number
        },
        viewport: {
          northeast: {
            lat: number,
            lng: number
          },
          southwest: {
            lat: number,
            lng: number
          }
        }
      },
  icon: string;
  name: string;
  opening_hours: {
        'open_now': boolean;
      },
  photos: [
        {
          height: number,
          html_attributions: string[],
          photo_reference: string,
          width: number
        }
      ],
  place_id: string;
    plus_code: {
    compound_code: string,
    global_code: string
  },
  price_level: number;
  rating: number;
  reference: string,
  scope: string,
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}
