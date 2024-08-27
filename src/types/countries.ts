// Define the type for the location object
interface Location {
    geoname_id: number | null;
    capital: string | null;
    languages: string[] | null;
    country_flag: string | null;
    country_flag_emoji: string | null;
    country_flag_emoji_unicode: string | null;
    calling_code: string | null;
    is_eu: boolean | null;
  }
  
  // Define the type for the country object
  interface Country {
    ip: string;
    type: string;
    continent_code: string | null;
    continent_name: string | null;
    country_code: string | null;
    country_name: string | null;
    region_code: string | null;
    region_name: string | null;
    city: string | null;
    zip: string | null;
    latitude: number;
    longitude: number;
    msa: string | null;
    dma: string | null;
    radius: number | null;
    ip_routing_type: string | null;
    connection_type: string | null;
    location: Location;
  }
  
  // Define the type for the API response
  interface ApiResponse {
    country: Country;
  }
  