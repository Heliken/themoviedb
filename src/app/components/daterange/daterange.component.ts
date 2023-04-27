import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaterangeForm, DaterangeValue } from '../../types/ui-types/daterange';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'mdb-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss'],
})
export class DaterangeComponent implements OnInit, OnDestroy {
  @Input() public dateFormGroup?: FormGroup<DaterangeForm>;
  @Output() public dateChanged = new EventEmitter<DaterangeValue>();

  public formGroupSubscription?: Subscription;
  public inputDebounceTime = 400;

  public ngOnInit(): void {
    if (this.dateFormGroup) {
      this.formGroupSubscription = this.dateFormGroup.valueChanges
        .pipe(debounceTime(this.inputDebounceTime))
        .subscribe(val => this.dateChanged.emit(val as DaterangeValue));
    }
  }

  public ngOnDestroy(): void {
    if (this.formGroupSubscription) {
      this.formGroupSubscription.unsubscribe();
    }
  }

  public clearDates(): void {
    this.dateFormGroup?.patchValue({ min: null, max: null });
  }
}
