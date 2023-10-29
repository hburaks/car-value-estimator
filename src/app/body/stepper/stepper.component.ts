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
import { CommonModule } from '@angular/common';
import { CardEstimatedComponent } from './card-estimated/card-estimated.component';
import { MatTableModule } from '@angular/material/table';

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
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    CardComponent,
    CardEstimatedComponent,
    CommonModule,
  ],
})
export class StepperComponent implements OnInit {
  carEssentialInfo = this._formBuilder.group({
    distance: [
      parseInt(''),
      [Validators.required, Validators.min(0), Validators.max(999999)],
    ],
    fuel_type: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    transmission: ['', Validators.required],
    year: [
      new Date().getFullYear(),
      [
        Validators.required,
        Validators.min(1960),
        Validators.max(new Date().getFullYear()),
      ],
    ],
  });
  car: Car = {
    distance: parseInt(''),
    estimatedValue: parseInt(''),
    expectedValue: 0,
    fuel_type: '',
    make: '',
    model: '',
    transmission: '',
    year: new Date().getFullYear(),
  };
  isLinear = true;
  cars: Car[] = [];
  currentYear: number = new Date().getFullYear();
  displayedColumns: string[] = [
    'make',
    'model',
    'year',
    'transmission',
    'distance',
    'fuel_type',
    'expectedValue',
    'estimatedValue',
  ];
  dataSource = this.cars;

  constructor(
    private _formBuilder: FormBuilder,
    private carsService: CarsService
  ) {}

  ngOnInit() {
    this.mapFormValuesToCar();
    this.getCar();
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

  getCar() {
    this.carsService.getCars().subscribe((res) => {
      if (Object.values(res)) {
        this.cars = Object.values(res);
        this.dataSource = this.cars;
      }
    });
  }
  sendCar() {
    this.car.estimatedValue = 100000;
    this.carsService.sendCar(this.car).subscribe((res) => {
      this.getCar();
    });
  }

  setOneCarToInputs() {
    const lastCar = this.cars[this.cars.length - 1];
    this.patchCarValue(lastCar);
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

  clearInputs() {
    this.carEssentialInfo.value.distance = parseInt('');
    this.carEssentialInfo.value.fuel_type = '';
    this.carEssentialInfo.value.make = '';
    this.carEssentialInfo.value.model = '';
    this.carEssentialInfo.value.transmission = '';
    this.carEssentialInfo.value.year = parseInt('');
  }
  clearThisCar() {
    this.car.distance = parseInt('');
    this.car.estimatedValue = parseInt('');
    this.car.expectedValue = 0;
    this.car.fuel_type = '';
    this.car.make = '';
    this.car.model = '';
    this.car.transmission = '';
    this.car.year = new Date().getFullYear();
  }

  addExpectedValue(expectedValue: number) {
    this.car.expectedValue = expectedValue;
  }
}
