import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Car } from 'src/app/interfaces/car';
import { MatListModule } from '@angular/material/list';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CarsService } from 'src/app/services/cars.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

/**
 * @title Card with footer
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
})
export class CardComponent {
  @Input() carChild!: Car;

  constructor() {}

  expectedValue: number = parseInt('');
  expectedValueVisible: boolean = true;

  sendCarWithExpected(sendCarWithExpected: any) {
    this.emitExpectedCarValue.emit(parseInt(sendCarWithExpected));
    this.expectedValue = parseInt(sendCarWithExpected);
    this.expectedValueVisible = false;
  }

  @Output() emitExpectedCarValue = new EventEmitter<number>();
}
