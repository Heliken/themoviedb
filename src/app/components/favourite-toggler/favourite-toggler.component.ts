import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-favourite-toggler',
  templateUrl: './favourite-toggler.component.html',
  styleUrls: ['./favourite-toggler.component.scss'],
})
export class FavouriteTogglerComponent {
  @Input() public isActive = false;
}
