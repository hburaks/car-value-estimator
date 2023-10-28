import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Car } from 'src/app/interfaces/car';
import { MatListModule } from '@angular/material/list';

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
  ],
})
export class CardComponent {
  @Input() carChild!: Car;
}
