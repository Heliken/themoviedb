import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-section',
  templateUrl: './detailed-page-hero-section.component.html',
  styleUrls: ['./detailed-page-hero-section.component.scss'],
})
export class DetailedPageHeroSectionComponent {
  @Input() public title?: string;
}
