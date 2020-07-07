import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { ApiService } from "../../services/api-services";
import { RadioService } from "../../services/radio-service";

// declare var $;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Content) content: Content;
  schedules: any = {}
  schedulesLoaded:boolean = false
  showSlider: number = -1;
  currentDay: number = new Date().getDay();
  scheduleData: any = [];
  

  constructor(public navCtrl: NavController, public apiServices: ApiService, public radioService: RadioService) {
    this.schedulesLoaded = false
    this.apiServices.getScheduleData().subscribe((data:any) => {
      if (!data._body) {
        return;
      }

      let sch = JSON.parse(data._body);
      console.log("getScheduleData", sch, (data instanceof Array));
      sch.forEach(value => {
        if (value.day_of_show instanceof Array) {

          value.day_of_show.forEach(day => {
            let scheduleData: any = {};
            scheduleData.start_time = value.start_time;
            scheduleData.end_time = value.end_time;
            scheduleData.title = value.title.rendered;
            scheduleData.presenter_image = value.presenter_image_medium.guid;
            scheduleData.presenters_name = value.presenters_name
            scheduleData.about_show = value.about_show
            scheduleData.songUrl = value.podcast_listen
            scheduleData.day = day;
            
            if (this.schedules.hasOwnProperty(day)) {
              this.schedules[day].push(scheduleData)
            } else {
              let dataArray = []
              dataArray.push(scheduleData)
              this.schedules[day] = dataArray
              //this.schedules.push(scheduleData)
            }
          });

        }else{

          let scheduleData: any = {};
          scheduleData.start_time = value.start_time;
          scheduleData.end_time = value.end_time;
          scheduleData.title = value.title.rendered;
          scheduleData.presenter_image = value.presenter_image_medium.guid;
          scheduleData.presenters_name = value.presenters_name
          scheduleData.about_show = value.about_show
          scheduleData.songUrl = value.podcast_listen
          scheduleData.day = value.day_of_show;

          if (this.schedules.hasOwnProperty(value.day_of_show)) {
            this.schedules[value.day_of_show].push(scheduleData)
          } else {
            let dataArray = []
            dataArray.push(scheduleData)
            this.schedules[value.day_of_show] = dataArray
            //this.schedules.push(scheduleData)
          }
        }
      });


      Object.keys(this.schedules).map((key, index) => {
        let schedule = this.schedules[key];
        let sortedArray = schedule.sort((a, b) => {
          let start1 = +a.start_time.split(':')[0]; 
          let start2 = +b.start_time.split(':')[0]; 
          return start1 - start2;
        })
        this.schedules[key] = sortedArray;
      })

      this.schedulesLoaded = true
      setTimeout(()=>{ 
        this.openSlide();
      }, 300);

      console.log("AboutPage schedules", this.schedules);

    });
    
  }

  openSlide(){
    let currentDate = new Date().getDate();
    for(let i in this.scheduleData){
      let date = this.scheduleData[i].date;
      date = date.toString();
      date = date.replace('th','');
      date = date.replace('nd','');
      date = date.replace('st','');
      date = date.replace('rd','');
      if(date == currentDate){
        this.showHideSlide(i);
        let element = document.getElementById(i);
        let rect = element.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        this.content.scrollTo(0, rect.top)
      }
    }
  }

  ionViewDidEnter(){
   
  }

  ionViewDidLoad() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let week = this.getWeek(new Date());
    this.scheduleData = []
    for (let i = 0; i < week.length; i++) {
      let day = ''
      if (i == 0) {
        day = 'Sunday'
      } else if (i == 1) {
        day = 'Monday'
      }
      else if (i == 2) {
        day = 'Tuesday'
      }
      else if (i == 3) {
        day = 'Wednesday'
      }
      else if (i == 4) {
        day = 'Thursday'
      }
      else if (i == 5) {
        day = 'Friday'
      }
      else {
        day = 'Saturday'
      }

      let dayLastNumber = week[i].getDate().toLocaleString().slice(-1);
      let currentDate = week[i].getDate().toLocaleString();
      
      if (dayLastNumber == "1"){
        if(currentDate=="11"){
          currentDate+='th'
        }else {
          currentDate +='st';
        }
      } else if (dayLastNumber == "2"){
        if(currentDate=="12"){
          currentDate+='th'
        }else {
          currentDate +='nd';
        }
      } else if (dayLastNumber == "3"){
        if(currentDate=="13"){
          currentDate+='th'
        }else {
          currentDate +='rd';
        }
      } else {
        currentDate +='th';
      }

      let obj = {day: day, date: currentDate, dayOfWeek: i, month: months[week[i].getMonth()], year: week[i].getFullYear() }
      this.scheduleData.push(obj)
    }
  }

  getWeek(fromDate) {
    let sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
      , result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday));
    }
    return result;
  }


  showHideSlide(id) {
    if (id == this.showSlider) {
      this.showSlider = -1
    } else {
      this.showSlider = id
    }
  }
}
