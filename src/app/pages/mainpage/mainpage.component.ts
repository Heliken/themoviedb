import { Component } from '@angular/core';
import { MainpageRequestsService } from './mainpage-api.service';
import { MainpageSection } from './types/mainpage-section';
@Component({
  selector: 'mdb-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent {
  constructor(private readonly api: MainpageRequestsService) {}

  public sections: MainpageSection[] = [
    {
      title: 'Trending',
      list$: this.api.requestTrending(),
    },
    {
      title: 'Popular',
      list$: this.api.requestPopular(),
    },
    {
      title: 'Upcoming',
      list$: this.api.requestUpcoming(),
    },
  ];
}
