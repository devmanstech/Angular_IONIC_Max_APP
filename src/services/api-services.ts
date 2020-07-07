import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Subject} from "rxjs";

import {ServicesProvider} from "../providers/services/services";

@Injectable()
export class ApiService {
  public url = "https://max1023.fm";
  private categoryUrl = this.url+"/wp-json/wp/v2/posts?categories=1"
  private scheduleUrl = this.url+"/wp-json/wp/v2/schedule?_embed&per_page=100"
  private postUrl = this.url+"/api/core/get_recent_posts/?page=1"
  scheduleData: any = [];
  scheduleDataCache: any = {};
  postData: any = {}
  day: string
  feturedPhoto: any;

  public changeBGImage = new Subject<any[]>();
  public emitChange(data: any){
    this.changeBGImage.next(data)
  }

  constructor(public service: ServicesProvider, private http: Http) {
    let date = new Date()
    date.setMinutes(date.getTimezoneOffset()+date.getMinutes() + 60); // convert to UTC+1
    this.day = this.getToday(date.getDay())
    this.getCurrentSchedule();
  }
  getAppVersion()
  {
    return this.http.get("https://tvcdashboard.com/app/getappversion.php?appname=maxfm");
  }

  changeJsonUrl(url){
    this.url = url;
    this.categoryUrl = this.url+"/wp-json/wp/v2/posts?categories=1"
    this.scheduleUrl = this.url+"/wp-json/wp/v2/schedule?_embed&per_page=100"
    this.postUrl = this.url+"/api/core/get_recent_posts/?page=1"
    this.getCurrentSchedule();
  }

  getCategoryData() {
    return this.http.get(this.categoryUrl);
  }

  getScheduleData() {
    return this.http.get(this.scheduleUrl);
  }

  getPostData() {
    this.postData = {}
    this.http.get(this.postUrl).subscribe(data => {
      this.postData = data.json()
    });
  }


  getCurrentSchedule() {
    this.scheduleData = []
    // console.log("old schedule", this.scheduleUrl, this.scheduleDataCache[this.scheduleUrl]);
    let ago = new Date();
    ago.setHours(ago.getHours() - 1)
    if (this.scheduleDataCache[this.scheduleUrl] && this.scheduleDataCache[this.scheduleUrl].stored > ago)  {
      this.processScheduleData(this.scheduleDataCache[this.scheduleUrl].data);
    }else{
      this.getScheduleData().subscribe((data:any) => {
        let schedule = JSON.parse(data._body);
        this.scheduleDataCache[this.scheduleUrl] = {data: schedule, stored: (new Date())}
        this.processScheduleData(schedule);
      })
    }
  }

  processScheduleData(sch:any){
    console.log("Schedule Data", this.day, sch)
      if (!(sch instanceof Array)) {
        return
      }
      sch.forEach(value => {
        if (value.day_of_show instanceof Array) {
          value.day_of_show.forEach(day => {
            if (this.day == day) {
              var scheduleData: any = {};
              scheduleData.start_time = value.start_time;
              scheduleData.end_time = value.end_time;
              scheduleData.title = value.title.rendered;
              scheduleData.presenter_image = value.presenter_image.guid;
              scheduleData.presenters_name = value.presenters_name
              scheduleData.about_show = value.about_show
              scheduleData.songUrl = value.podcast_listen
              scheduleData.day = day
              this.scheduleData.push(scheduleData)
            }
          })
        } else {
          if (this.day == value.day_of_show) {
            var scheduleData: any = {};
            scheduleData.start_time = value.start_time;
            scheduleData.end_time = value.end_time;
            scheduleData.title = value.title.rendered;
            scheduleData.presenter_image = value.presenter_image.guid;
            scheduleData.presenters_name = value.presenters_name
            scheduleData.about_show = value.about_show
            scheduleData.songUrl = value.podcast_listen
            scheduleData.day = value.day_of_show
            this.scheduleData.push(scheduleData)
          }
        }
      });
      this.scheduleData = this.scheduleData.sort(this.compare)
      console.log("Schedule Data ", this.scheduleData)
      this.currentRunningSchedule()
      this.emitChange({
        onAirNow: 'ON AIR NOW',
        img: this.scheduleData[0].presenter_image,
        name: this.scheduleData[0].presenters_name,
        song: this.scheduleData[0].title
      });
  }

  getFeturedPhoto() {
    this.feturedPhoto = undefined
    this.service.getFetured().then((results: any) => {
      let data = results;
      let d = [];
      let i = 0;
      var flag = true;
      var b_flag = true;

      data.posts.forEach(a => {
      if(flag){
          b_flag = true;
          a.attachments.forEach(b => {
            if(b_flag){
              d.push({date: a.date, image: b.url, url: a.url, title: a.title, content:a.content})            
              b_flag = false;
              return;
            }
          })
          i++;          
        }
        if(i == 5) {
          flag = false;
          return;
        }
      })
      
      this.feturedPhoto = d;
      console.log('getFeturedPhoto', results);

    });
  }

  compare(a, b) {
    if (a.start_time < b.start_time)
      return -1;
    if (a.start_time > b.start_time)
      return 1;
    return 0;
  }


  getToday(i) {
    var day = ""
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
    return day
  }

  currentRunningSchedule() {
    var date = new Date();
    date.setMinutes(date.getTimezoneOffset()+date.getMinutes() + 60); // convert to UTC+1
    // console.log("currentRunningSchedule", date, this.scheduleData, date.getHours());
    var hour = date.getHours()
    var count = 0;
    let notFound = true;
    this.scheduleData.forEach(value => {
      var time1 = parseInt(value.start_time.split(":")[0])
      var time2 = parseInt(value.end_time.split(":")[0])
      if (time1 <= hour && time2 > hour) {
        // console.log("Current Date", value)
        notFound = true;
        this.rotateCalendar(count)
      }
      count++;
    })

    if (notFound && this.scheduleData) {
      let len = this.scheduleData.length;
      // check if current hour programm is started yesterday
      var endTime = parseInt(this.scheduleData[0].end_time.split(":")[0])
      if (hour < endTime) {
        this.rotateCalendar(0);
      }else if(len > 1){
        // check if current hour programm will end tomorrow 
        var startTime = parseInt(this.scheduleData[len-1].start_time.split(":")[0])
        if (hour >= startTime) {
          this.rotateCalendar(len-1);
        }
      }
    }
  }

  rotateCalendar(position) {
    //console.log(position)
    this.scheduleData = this.scheduleData.concat(this.scheduleData.splice(0, position));
    //console.log(this.scheduleData);   return cal;
    if(this.scheduleData[0].hasOwnProperty('presenter_image')){
      this.emitChange({
        onAirNow: 'ON AIR NOW',
        img: this.scheduleData[0].presenter_image,
        name: this.scheduleData[0].presenters_name,
        song: this.scheduleData[0].title
      })
    }

    return
  }

}
