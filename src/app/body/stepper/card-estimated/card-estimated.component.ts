import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Car } from 'src/app/interfaces/car';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * @title Card with footer
 */
@Component({
  selector: 'app-card-estimated',
  templateUrl: './card-estimated.component.html',
  styleUrls: ['./card-estimated.component.css'],
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
  ],
})
export class CardEstimatedComponent {
  @Input() carChild!: Car;

  constructor() {}

  expectedValue: number = parseInt('');

  sendCarWithExpected(sendCarWithExpected: any) {
    this.emitExpectedCarValue.emit(parseInt(sendCarWithExpected));
  }

  @Output() emitExpectedCarValue = new EventEmitter<number>();
}
