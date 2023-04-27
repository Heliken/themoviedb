import { FormControl } from '@angular/forms';

export interface DaterangeForm {
  min: FormControl<string | null>;
  max: FormControl<string | null>;
}

export interface DaterangeValue {
  min: string | null;
  max: string | null;
}
