import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/interfaces/car';
import { Observable } from 'rxjs';

/**
 * @title Stepper horizontal
 */
@Component({
  selector: 'app-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CardComponent,
  ],
})
export class StepperComponent implements OnInit {
  carEssentialInfo = this._formBuilder.group({
    distance: [parseInt(''), Validators.required],
    fuel_type: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    transmission: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
  });
  car: Car = {
    distance: parseInt(''),
    fuel_type: '',
    make: '',
    model: '',
    transmission: '',
    year: new Date().getFullYear(),
  };
  isLinear = true;
  cars: Car[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private carsService: CarsService
  ) {}

  ngOnInit() {
    this.getCars();
    this.mapFormValuesToCar();
  }

  mapFormValuesToCar() {
    this.carEssentialInfo.valueChanges.subscribe((value) => {
      this.car.distance = Number(value.distance) ?? null;
      this.car.fuel_type = value.fuel_type ?? '';
      this.car.make = value.make ?? '';
      this.car.model = value.model ?? '';
      this.car.year = Number(value.year) ?? 0;
      this.car.transmission = value.transmission ?? '';
    });
  }

  sendCar(car: Car) {
    this.carsService.sendCar(car);
  }
  getCars() {
    this.carsService.getCars().subscribe((res) => {
      this.cars = Object.values(res);
      this.setOneCarToInputs();
    });
  }
  patchCarValue(lastCar: Car) {
    if (lastCar) {
      this.carEssentialInfo.patchValue({
        distance: lastCar.distance,
        fuel_type: lastCar.fuel_type,
        make: lastCar.make,
        model: lastCar.model,
        transmission: lastCar.transmission,
        year: lastCar.year,
      });
    }
  }
  setOneCarToInputs() {
    const lastCar = this.cars[this.cars.length - 1];
    this.patchCarValue(lastCar);
  }
}
