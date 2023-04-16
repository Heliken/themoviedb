import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
})
export class RatingPickerComponent {
  @Input() public initial = 5;

  public min = 0;
  public max = 10;
  public step = 1;

  public ratingValue = new FormControl(this.initial);
}
