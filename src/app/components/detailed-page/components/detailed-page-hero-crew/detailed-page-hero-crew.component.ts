import { Component, Input } from '@angular/core';
import { Cast } from 'src/app/types/credits';
import { SortFunc } from 'src/app/pipes/sort/sort.pipe';
import { CastWithJobs } from 'src/app/pipes/group-cast-by-name/group-cast-by-name.pipe';

@Component({
  selector: 'mdb-detailed-page-hero-crew',
  templateUrl: './detailed-page-hero-crew.component.html',
  styleUrls: ['./detailed-page-hero-crew.component.scss'],
})
export class DetailedPageHeroCrewComponent {
  @Input() public title = 'Crew:';
  @Input() public crew?: Cast[];

  public castSortFunc: SortFunc<CastWithJobs> = (a, b) => {
    return b.jobs.length - a.jobs.length;
  };
}
