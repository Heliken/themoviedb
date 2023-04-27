import { FormControl } from '@angular/forms';

export type GenresQueryParam = number[] | null;
export type GenresFormControl = FormControl<GenresQueryParam>;
