import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-date',
  templateUrl: './detailed-page-hero-date.component.html',
  styleUrls: ['./detailed-page-hero-date.component.scss'],
})
export class DetailedPageHeroDateComponent {
  @Input() public title = 'Release date:';
  @Input() public date?: string | null;
}
