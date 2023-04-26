import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() public selectChange = new EventEmitter<string>();

  public selectOption(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.selectChange.emit(selectedValue);
    }
  }
}
