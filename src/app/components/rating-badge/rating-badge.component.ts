import { Component, Input, OnInit } from '@angular/core';
import { getBgColor } from './helpers/rating-color';
@Component({
  selector: 'mdb-rating-badge',
  templateUrl: './rating-badge.component.html',
  styleUrls: ['./rating-badge.component.scss'],
})
export class RatingBadgeComponent implements OnInit {
  @Input() public value!: number;

  public bgColor = 'rgb(0,0,0)';

  public ngOnInit(): void {
    this.bgColor = getBgColor(this.value);
  }
}
