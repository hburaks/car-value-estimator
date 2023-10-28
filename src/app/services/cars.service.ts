import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}

  getCars() {
    return this.http.get<Car[]>(
      'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json'
    );
  }

  sendCar(car: Car) {
    const headers = new HttpHeaders({ dev: 'hbDev' });
    console.log("do i send it")
    this.http.post(
      'https://car-estimator-4fe10-default-rtdb.europe-west1.firebasedatabase.app/cars.json',
      car,
      { headers: headers }
    ).subscribe((res) => {
      console.log(res)
    })
  }
}
