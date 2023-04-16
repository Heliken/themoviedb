import { Component, Input } from '@angular/core';
import { Cast } from 'src/app/types/credits';

@Component({
  selector: 'mdb-detailed-page-hero-crew',
  templateUrl: './detailed-page-hero-crew.component.html',
  styleUrls: ['./detailed-page-hero-crew.component.scss'],
})
export class DetailedPageHeroCrewComponent {
  @Input() public title = 'Crew:';
  @Input() public crew?: Cast[];
}
