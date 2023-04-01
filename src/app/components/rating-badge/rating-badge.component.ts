import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mdb-rating-badge',
  templateUrl: './rating-badge.component.html',
  styleUrls: ['./rating-badge.component.scss'],
})
export class RatingBadgeComponent implements OnInit {
  @Input() public value!: number;

  public bgColor = 'rgb(0,0,0)';

  private redColor = [196, 69, 94];
  private yellowColor = [255, 206, 92];
  private greenColor = [74, 203, 42];
  private redBorderPoint = 4;
  private yellowBorderPoint = 6;

  public ngOnInit(): void {
    this.bgColor = this.getBgColor();
  }

  private getBgColor(): string {
    let red, green, blue;

    if (this.value <= this.redBorderPoint) {
      // Use the red color
      red = this.redColor[0];
      green = this.redColor[1];
      blue = this.redColor[2];
    } else if (this.value <= this.yellowBorderPoint) {
      // Interpolate between red and yellow
      const ratio =
        (this.value - this.redBorderPoint) /
        (this.yellowBorderPoint - this.redBorderPoint);
      red = Math.round(
        (1 - ratio) * this.redColor[0] + ratio * this.yellowColor[0]
      );
      green = Math.round(
        (1 - ratio) * this.redColor[1] + ratio * this.yellowColor[1]
      );
      blue = Math.round(
        (1 - ratio) * this.redColor[2] + ratio * this.yellowColor[2]
      );
    } else {
      // Interpolate between yellow and green
      const ratio =
        (this.value - this.yellowBorderPoint) / (10 - this.yellowBorderPoint);
      red = Math.round(
        (1 - ratio) * this.yellowColor[0] + ratio * this.greenColor[0]
      );
      green = Math.round(
        (1 - ratio) * this.yellowColor[1] + ratio * this.greenColor[1]
      );
      blue = Math.round(
        (1 - ratio) * this.yellowColor[2] + ratio * this.greenColor[2]
      );
    }

    return `rgb(${red}, ${green}, ${blue})`;
  }
}
