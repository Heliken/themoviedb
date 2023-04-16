import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-rating-dropdown',
  templateUrl: './detailed-page-hero-rating-dropdown.component.html',
  styleUrls: ['./detailed-page-hero-rating-dropdown.component.scss'],
})
export class DetailedPageHeroRatingDropdownComponent {
  @Output() public toggleDropdown = new EventEmitter();
}
