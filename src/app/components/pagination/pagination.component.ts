import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() total?: number;
  @Input() current?: number;

  @Output() pageSelect = new EventEmitter<number>();
}
