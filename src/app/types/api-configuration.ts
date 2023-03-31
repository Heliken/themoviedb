export interface ConfigurationResponse {
  images: ConfigurationImages;
  change_keys: string[];
}

export interface ConfigurationImages {
  base_url: string;
  secure_baseurl: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}
