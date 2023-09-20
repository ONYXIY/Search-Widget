import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  public minDate = new Date();
  public minReturnDate: Date | null = new Date();
  public needReturnData: boolean = false;
  
  public dateControl: FormControl;
  public returnDateControl: FormControl;

  constructor() {
    this.dateControl = new FormControl('', [Validators.required]);
    this.returnDateControl = new FormControl('', [Validators.required]);
  }

  updateMinReturnDate(event: MatDatepickerInputEvent<Date>) {
    if (!this.needReturnData) {
      this.minReturnDate = event.value;
    }
  }
}