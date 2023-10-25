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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Car } from 'src/app/interfaces/car';

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
    distance: [0, Validators.required],
    fuel_type: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    transmission: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
  });
  car: Car = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    distance: 0,
    transmission: '',
    fuel_type: '',
  };

  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    carsService: CarsService,
    private http: HttpClient
  ) {
    // this.cars = carsService.getCars();
  }

  cars: Array<Car> = [];
  ngOnInit() {
    this.carEssentialInfo.valueChanges.subscribe((value) => {
      console.log('carEssentialInfo form value:', value);
      this.car.make = value.make ?? '';
      this.car.model = value.model ?? '';
      this.car.year = Number(value.year) ?? 0;
      this.car.distance = Number(value.distance) ?? 0;
      this.car.transmission = value.transmission ?? '';
      this.car.fuel_type = value.fuel_type ?? '';
    });
    this.getCars();
  }

  sendCar(car: Car) {
    const headers = new HttpHeaders({ dev: 'hbDev' });
    this.http
      .post(
        'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json',
        car,
        { headers: headers }
      )
      .subscribe((res) => console.log(res));
  }
  getCars() {
    this.http
      .get<Car[]>(
        'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json'
      )
      .subscribe((res) => {
        this.cars = Object.values(res);
        console.log(res)
        console.log("+++")
        console.log(this.cars)
        this.cars.map((t) => console.log(JSON.stringify(t)));
      });
  }
  setOneCarToInputs(){
    const lastCar = this.cars[this.cars.length - 1];
    this.carEssentialInfo.patchValue({
      distance: lastCar.distance,
      fuel_type: lastCar.fuel_type,
      make: lastCar.make,
      model: lastCar.model,
      transmission: lastCar.transmission,
      year: lastCar.year
    });
  }
}
