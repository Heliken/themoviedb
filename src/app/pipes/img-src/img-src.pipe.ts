import { Pipe, PipeTransform } from '@angular/core';
import { ApiConfigurationService } from 'src/app/services/api-configuration-service';

@Pipe({
  name: 'imgSrc',
})
export class ImgSrcPipe implements PipeTransform {
  constructor(private apiConfigService: ApiConfigurationService) {}

  private apiConfig = this.apiConfigService.getConfig();
  private defaultImgSize = 'w185';

  /* todo: find a solution how to accept different size[] from apiConfig
  depending on what image type passed into pipe */
  transform(imgPath: string, size = this.defaultImgSize): string {
    if (this.apiConfig) {
      const baseurl = this.apiConfig.images.base_url;
      return `${baseurl}${size}${imgPath}`;
    }

    return imgPath;
  }
}
