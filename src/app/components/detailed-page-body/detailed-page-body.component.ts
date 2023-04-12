import { Component, Input } from '@angular/core';
import { DetailedBody } from 'src/app/types/ui-types/detailed-body';

@Component({
  selector: 'mdb-detailed-page-body',
  templateUrl: './detailed-page-body.component.html',
  styleUrls: ['./detailed-page-body.component.scss'],
})
export class DetailedPageBodyComponent {
  @Input() public data?: DetailedBody;
}
