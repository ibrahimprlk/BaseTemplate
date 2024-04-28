import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class DashboardService{

    constructor(private httpClient:HttpClient){}

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  generateRandomDataForYears(startYear, endYear) {
      const data = [];
  
      for (let year = startYear; year <= endYear; year++) {
          const daysInMonth = [31, 28 + (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          for (let month = 0; month < 12; month++) {
              const days = daysInMonth[month];
              for (let day = 1; day <= days; day++) {
                  const date = new Date(year, month, day);
                  data.push([date.getTime(), this.getRandomInt(0, 100)]);
              }
          }
      }
      return data;
  }
  
  // Örnek kullanım:
  // const startYear = 2003;
  // const endYear = 2023;
  // const randomData = generateRandomDataForYears(startYear, endYear);

    public getChartActualData(){
        return this.generateRandomDataForYears(2022,2024);
    }

    public getChartForecastData(){
        return this.generateRandomDataForYears(2022,2024);
    }

}