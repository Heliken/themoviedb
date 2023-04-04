import { Pipe, PipeTransform } from '@angular/core';
import { ApiConfigurationService } from 'src/app/services/api-configuration.service';
import {
  ConfigurationImages,
  ImageTypeSize,
} from 'src/app/types/api-configuration';

@Pipe({
  name: 'imgSrc',
})
export class ImgSrcPipe implements PipeTransform {
  constructor(private apiConfigService: ApiConfigurationService) {}

  private apiConfig = this.apiConfigService.getConfig();
  private defaultImgSize = 'w185';
  private fallbackImgSize = 'original';

  private getImageSizeArray(
    {
      poster_sizes,
      backdrop_sizes,
      logo_sizes,
      profile_sizes,
      still_sizes,
    }: ConfigurationImages,
    sizeType: ImageTypeSize
  ): string[] {
    const sizeArrays = {
      [ImageTypeSize.poster]: poster_sizes,
      [ImageTypeSize.backdrop]: backdrop_sizes,
      [ImageTypeSize.logo]: logo_sizes,
      [ImageTypeSize.profile]: profile_sizes,
      [ImageTypeSize.still]: still_sizes,
    };

    return sizeArrays[sizeType];
  }

  private replaceImgSizeIfMissing(
    size: string,
    type: ImageTypeSize,
    configImages: ConfigurationImages
  ): string {
    return this.getImageSizeArray(configImages, type).includes(size)
      ? size
      : this.fallbackImgSize;
  }

  transform(
    imgPath: string,
    type: ImageTypeSize = ImageTypeSize.poster,
    size = this.defaultImgSize
  ): string {
    if (this.apiConfig) {
      const imgSize = this.replaceImgSizeIfMissing(
        size,
        type,
        this.apiConfig.images
      );
      const baseurl = this.apiConfig.images.base_url;
      return `${baseurl}${imgSize}${imgPath}`;
    }

    return imgPath;
  }
}
