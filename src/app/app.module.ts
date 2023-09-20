import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbooardComponent } from './home/dashbooard/dashbooard.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

import { HashLocationStrategy,LocationStrategy } from '@angular/common';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'a148u5sq3d9wyr-ats.iot.ap-south-1.amazonaws.com',
  port: 443,
  protocol: 'wss',
  path: '/',
};


@NgModule({
  declarations: [
    AppComponent,
    DashbooardComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [{provide : LocationStrategy , useClass : HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
