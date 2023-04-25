import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectOption } from '../../types/ui-types/select-option';

@Component({
  selector: 'mdb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() public title?: string;
  @Input() public options: SelectOption[] = [];
  @Input() public selectControl?: FormControl;
}
