import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

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
    MatSelectModule
  ],
})
export class StepperComponent implements OnInit {
  carEssentialInfo = this._formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    distance: ['0', Validators.required],
    color:['', Validators.required],
    transmission:['', Validators.required],
    drivetrain:['', Validators.required],
    door:['', Validators.required],
    engine:['', Validators.required]

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit() {
    const makeValue = this.carEssentialInfo?.get('make');
    if (makeValue) {
      makeValue.valueChanges.subscribe(selectedMake => {
        console.log('Selected make:', selectedMake);
      });
    }

    this.carEssentialInfo.statusChanges.subscribe(status => {
      console.log('carEssentialInfo form status:', status);
    });

    this.carEssentialInfo.valueChanges.subscribe(value => {
      console.log('carEssentialInfo form value:', value);
    });
  }
}
