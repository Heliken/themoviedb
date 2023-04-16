import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-date',
  templateUrl: './detailed-page-hero-date.component.html',
})
export class DetailedPageHeroDateComponent {
  @Input() public title = 'Release date:';
  @Input() public date?: string | null;
}
