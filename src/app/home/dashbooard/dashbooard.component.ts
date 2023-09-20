import { Component, OnInit, OnDestroy, } from '@angular/core';
import { OtpService } from '../otp.service';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashbooard',
  templateUrl: './dashbooard.component.html',
  styleUrls: ['./dashbooard.component.css']
})
export class DashbooardComponent implements OnInit, OnDestroy {

  generatedOTP: string = '------'; 
  isButtonDisabled: boolean = false; // Initialize to false
  private timer: any;
  countdown: number = 10;

  mqttSubscriptions: Subscription[] = [];

  constructor(private mqttService: MqttService, private otpService: OtpService) { }

  ngOnInit() {
    this.mqttSubscriptions.push(
      this.mqttService.onConnect.subscribe((connectionStatus) => {
        console.log('Connected to broker:', connectionStatus);
      })
    );
  }

  generateRandomOTP() {
    this.generatedOTP = this.otpService.generateOTP(6);
    this.isButtonDisabled = true;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.timer); // Stop the timer when countdown reaches 0
        this.isButtonDisabled = false;
        this.countdown = 10; // Reset countdown to 10
      }
    }, 1000); // Update countdown every second

    const topic = 'otp/sense/SLOTP001'; // Replace this with your desired topic
    const otpData = { otp: this.generatedOTP }; // Create an object with the OTP
    
    try {
      // Convert the object to JSON format before publishing
      const payload = JSON.stringify(otpData);

      this.mqttService.publish(topic, payload).subscribe({
        next: () => {
          console.log('OTP sent to the Device:', payload);
        },
        error: (error) => {
          console.error("Error occurred while publishing:", error);
        }
      });
    } catch (error) {
      console.error("Error occurred while publishing:", error);
    }
  }


  ngOnDestroy() {
    // Clear the timer when the component is destroyed to prevent memory leaks
    clearTimeout(this.timer);
    this.mqttSubscriptions.forEach((sub) => sub.unsubscribe());
    this.mqttService.disconnect();
  }
}
