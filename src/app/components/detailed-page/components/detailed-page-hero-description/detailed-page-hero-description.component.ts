import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-description',
  templateUrl: './detailed-page-hero-description.component.html',
})
export class DetailedPageHeroDescriptionComponent {
  @Input() public title = 'Overview:';
  @Input() public text?: string;
}
