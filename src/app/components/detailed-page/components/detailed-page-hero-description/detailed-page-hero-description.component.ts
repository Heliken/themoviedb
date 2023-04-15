import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-description',
  templateUrl: './detailed-page-hero-description.component.html',
  styleUrls: ['./detailed-page-hero-description.component.scss'],
})
export class DetailedPageHeroDescriptionComponent {
  @Input() public title = 'Overview:';
  @Input() public text?: string;
}
