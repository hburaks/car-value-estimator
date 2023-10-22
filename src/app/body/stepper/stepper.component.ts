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
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    distance: ['0', Validators.required],
    color: ['', Validators.required],
    transmission: ['', Validators.required],
    drivetrain: ['', Validators.required],
    door: ['', Validators.required],
    engine: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    carsService: CarsService,
    private http: HttpClient
  ) {
    this.cars = carsService.getCars();
    console.log(this.cars);
  }

  cars: Array<any> = [];
  ngOnInit() {
    // const makeValue2 = this.carEssentialInfo.get('')
    // const makeValue = this.carEssentialInfo?.get('make');
    // if (makeValue) {
    //   makeValue.valueChanges.subscribe(selectedMake => {
    //     console.log('Selected make:', selectedMake);
    //   });
    // }
    // console.log(this.cars);

    // this.carEssentialInfo.statusChanges.subscribe(status => {
    //   console.log('carEssentialInfo form status:', status);
    // });

    // this.carEssentialInfo.valueChanges.subscribe(value => {
    //   console.log('carEssentialInfo form value:', value);
    // });
    this.getCars();
  }

  sendCar(cars: any) {
    console.log(this.carEssentialInfo.value);
    const headers = new HttpHeaders({ dev: 'hbDev' });
    this.http
      .post(
        'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json',
        cars,
        { headers: headers }
      )
      .subscribe((res) => console.log(res));
  }
  getCars() {
    this.http
      .get(
        'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json'
      )
      .subscribe((res) => console.log(res));
    console.log(this.carEssentialInfo.value.make);
    console.log(this.carEssentialInfo.value.year || 'empty');
  }
}
