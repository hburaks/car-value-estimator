import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperComponent } from './body/stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './body/stepper/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CarsService } from './services/cars.service';
import { CardEstimatedComponent } from './body/stepper/card-estimated/card-estimated.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BodyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    StepperComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    CardComponent,
    CardEstimatedComponent,    
    HttpClientModule,
  ],
  providers: [CarsService],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
