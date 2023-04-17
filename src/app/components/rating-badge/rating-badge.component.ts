import { Component, Input } from '@angular/core';
import { getBgColor } from './helpers/rating-color';
@Component({
  selector: 'mdb-rating-badge',
  templateUrl: './rating-badge.component.html',
  styleUrls: ['./rating-badge.component.scss'],
})
export class RatingBadgeComponent {
  private _value = 0;
  public bgColor = 'rgb(0,0,0)';

  @Input() public title?: string;
  @Input() public set value(value: number) {
    this._value = value;
    this.bgColor = getBgColor(value);
  }

  public get value() {
    return this._value;
  }
}
