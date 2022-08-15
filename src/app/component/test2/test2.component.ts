import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  weatherData: any;
  // url = "https://api.openweathermap.org/data/2.5/weather?lat=3.11714255&lon=101.63503923035668&appid=768357fecaa0b2f655d1ade597c19ab1"
  url = "";
  lat = 0;
  lng = 0;
  temperature: any;
  temperatureDefault: any;
  temperatureFeels: any;


  constructor() { }

  ngOnInit(): void {
  }

  getLocation() {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);


      // navigator.geolocation.getCurrentPosition((position) => {
      //   let x = document.getElementById("demo");
      //   x!.innerHTML = "Latitude: " + position.coords.latitude +
      //     "<br>Longitude: " + position.coords.longitude;

      //   this.lat = position.coords.latitude;
      //   this.lng = position.coords.longitude;

      //   this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lng + "&appid=768357fecaa0b2f655d1ade597c19ab1";

      //   this.getWeatherData();

      // }, this.showError);
    }
  }

  // showPosition(position: any) {
  //   let x = document.getElementById("demo");
  //   x!.innerHTML = "Latitude: " + position.coords.latitude +
  //     "<br>Longitude: " + position.coords.longitude;

  //   this.lat = position.coords.latitude;
  //   this.lng = position.coords.longitude;
  // }

  showError(error: any) {
    let x = document.getElementById("demo");
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x!.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x!.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x!.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x!.innerHTML = "An unknown error occurred."
        break;
    }
  }

  async getWeatherData() {
    let weather = document.getElementById("weather");

    try {
      let res = await fetch(this.url, { method: "GET" });
      let data = await res.json();
      this.weatherData = data;
      this.temperatureDefault = data.main.temp;
      this.temperatureFeels = data.main.feels_like;

      this.temperature = ((parseFloat(data.main.temp) - 273.15).toFixed(2));
      this.temperatureFeels = (parseFloat(this.temperatureFeels) - 273.15).toFixed(2);
    } catch {
      console.error("error")
    }
  }
}
