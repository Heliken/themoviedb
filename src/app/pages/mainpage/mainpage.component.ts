import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/types/media-item';
import { MainpageRequestsService } from './mainpage-api.service';

interface MainpageSection {
  title: string,
  list$: Observable<MediaItem[]>,
}

@Component({
  selector: 'mdb-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {
  constructor(
    private readonly api: MainpageRequestsService,
  ) {} 

  public sections: MainpageSection[] = [
    {
      title: "Trending",
      list$: this.api.requestTrending(),
    },
    {
      title: "Popular",
      list$: this.api.requestPopular(),
    },
    {
      title: "Upcoming",
      list$: this.api.requestUpcoming(),
    },
  ];
}
