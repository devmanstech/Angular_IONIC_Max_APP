webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_radio_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// declare var $;
var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, apiServices, radioService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.apiServices = apiServices;
        this.radioService = radioService;
        this.schedules = {};
        this.schedulesLoaded = false;
        this.showSlider = -1;
        this.currentDay = new Date().getDay();
        this.scheduleData = [];
        this.schedulesLoaded = false;
        this.apiServices.getScheduleData().subscribe(function (data) {
            if (!data._body) {
                return;
            }
            var sch = JSON.parse(data._body);
            console.log("getScheduleData", sch, (data instanceof Array));
            sch.forEach(function (value) {
                if (value.day_of_show instanceof Array) {
                    value.day_of_show.forEach(function (day) {
                        var scheduleData = {};
                        scheduleData.start_time = value.start_time;
                        scheduleData.end_time = value.end_time;
                        scheduleData.title = value.title.rendered;
                        scheduleData.presenter_image = value.presenter_image_medium.guid;
                        scheduleData.presenters_name = value.presenters_name;
                        scheduleData.about_show = value.about_show;
                        scheduleData.songUrl = value.podcast_listen;
                        scheduleData.day = day;
                        if (_this.schedules.hasOwnProperty(day)) {
                            _this.schedules[day].push(scheduleData);
                        }
                        else {
                            var dataArray = [];
                            dataArray.push(scheduleData);
                            _this.schedules[day] = dataArray;
                            //this.schedules.push(scheduleData)
                        }
                    });
                }
                else {
                    var scheduleData = {};
                    scheduleData.start_time = value.start_time;
                    scheduleData.end_time = value.end_time;
                    scheduleData.title = value.title.rendered;
                    scheduleData.presenter_image = value.presenter_image_medium.guid;
                    scheduleData.presenters_name = value.presenters_name;
                    scheduleData.about_show = value.about_show;
                    scheduleData.songUrl = value.podcast_listen;
                    scheduleData.day = value.day_of_show;
                    if (_this.schedules.hasOwnProperty(value.day_of_show)) {
                        _this.schedules[value.day_of_show].push(scheduleData);
                    }
                    else {
                        var dataArray = [];
                        dataArray.push(scheduleData);
                        _this.schedules[value.day_of_show] = dataArray;
                        //this.schedules.push(scheduleData)
                    }
                }
            });
            Object.keys(_this.schedules).map(function (key, index) {
                var schedule = _this.schedules[key];
                var sortedArray = schedule.sort(function (a, b) {
                    var start1 = +a.start_time.split(':')[0];
                    var start2 = +b.start_time.split(':')[0];
                    return start1 - start2;
                });
                _this.schedules[key] = sortedArray;
            });
            _this.schedulesLoaded = true;
            setTimeout(function () {
                _this.openSlide();
            }, 300);
            console.log("AboutPage schedules", _this.schedules);
        });
    }
    AboutPage.prototype.openSlide = function () {
        var currentDate = new Date().getDate();
        for (var i in this.scheduleData) {
            var date = this.scheduleData[i].date;
            date = date.toString();
            date = date.replace('th', '');
            date = date.replace('nd', '');
            date = date.replace('st', '');
            date = date.replace('rd', '');
            if (date == currentDate) {
                this.showHideSlide(i);
                var element = document.getElementById(i);
                var rect = element.getBoundingClientRect();
                // console.log(rect.top, rect.right, rect.bottom, rect.left);
                this.content.scrollTo(0, rect.top);
            }
        }
    };
    AboutPage.prototype.ionViewDidEnter = function () {
    };
    AboutPage.prototype.ionViewDidLoad = function () {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var week = this.getWeek(new Date());
        this.scheduleData = [];
        for (var i = 0; i < week.length; i++) {
            var day = '';
            if (i == 0) {
                day = 'Sunday';
            }
            else if (i == 1) {
                day = 'Monday';
            }
            else if (i == 2) {
                day = 'Tuesday';
            }
            else if (i == 3) {
                day = 'Wednesday';
            }
            else if (i == 4) {
                day = 'Thursday';
            }
            else if (i == 5) {
                day = 'Friday';
            }
            else {
                day = 'Saturday';
            }
            var dayLastNumber = week[i].getDate().toLocaleString().slice(-1);
            var currentDate = week[i].getDate().toLocaleString();
            if (dayLastNumber == "1") {
                if (currentDate == "11") {
                    currentDate += 'th';
                }
                else {
                    currentDate += 'st';
                }
            }
            else if (dayLastNumber == "2") {
                if (currentDate == "12") {
                    currentDate += 'th';
                }
                else {
                    currentDate += 'nd';
                }
            }
            else if (dayLastNumber == "3") {
                if (currentDate == "13") {
                    currentDate += 'th';
                }
                else {
                    currentDate += 'rd';
                }
            }
            else {
                currentDate += 'th';
            }
            var obj = { day: day, date: currentDate, dayOfWeek: i, month: months[week[i].getMonth()], year: week[i].getFullYear() };
            this.scheduleData.push(obj);
        }
    };
    AboutPage.prototype.getWeek = function (fromDate) {
        var sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay())), result = [new Date(sunday)];
        while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
            result.push(new Date(sunday));
        }
        return result;
    };
    AboutPage.prototype.showHideSlide = function (id) {
        if (id == this.showSlider) {
            this.showSlider = -1;
        }
        else {
            this.showSlider = id;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], AboutPage.prototype, "content", void 0);
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="color: white">SCHEDULE & LISTEN AGAIN</ion-title>\n    <ion-buttons end>\n      <ion-spinner class="center" *ngIf="!schedulesLoaded" name="bubbles" color="light"></ion-spinner>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="schedulesLoaded">\n      \n    <div *ngFor="let data of scheduleData;let i=index">\n      <div class="accordion" id="{{i}}">\n        <div class="accordion-section">\n          <a [ngClass]=" i < currentDay?\'accordion-section-title setTextColor1\':i==currentDay?\'accordion-section-title today setTextColor2\':\'accordion-section-title nextDay setTextColor2\'"\n            (click)="showHideSlide(i)">\n            <span [ngClass]="i < currentDay ? \'setColor1\' : \'setColor2\'">{{data.date}} {{data.month}}, {{data.year}} - {{data.day}}</span>\n          </a>\n          \n          <ion-slides *ngIf="i == showSlider" loop="true" speed="1500" autoplay="5000" >\n            <ion-slide *ngFor="let item of schedules[data.day]">\n              <div class="max-schedule-listing" *ngIf="schedules[data.day]">\n                <ul class="content-slider">\n                  <li [ngStyle]="{\'background-image\': \'url(\'+item.presenter_image+\')\'}">\n                    <span class="content-slider-overlay">\n                      <span class="content-slider-title-date">{{item.start_time | dateConvertor : \'time\'}} - {{item.end_time | dateConvertor : \'time\'}}</span>\n                      <span class="content-slider-title"><span [innerHtml]="item.title + \'<br>\' + item.about_show"></span>\n                      <button style="margin-top: 0px;height: 25px" *ngIf="item.songUrl" class="lisAgain"\n                      (click)="radioService.playSchedule(item.songUrl,item.start_time,item.end_time,item.title)">Listen Again</button></span>\n                    </span>\n                  </li>\n                </ul>\n              </div>\n            </ion-slide>\n            <ion-slide *ngIf="!schedules[data.day]">\n              <div class="max-schedule-listing">\n                <ul class="content-slider">\n                  <li>\n                    <img class="schedule-img" [src]="\'assets/imgs/logo.png\'">\n                  </li>\n                </ul>\n              </div>\n            </ion-slide>\n          </ion-slides>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <div style="margin-bottom: 70px"></div>\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_3__services_radio_service__["a" /* RadioService */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_radio_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__news_news__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_animations__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(http, navCtrl, radioService, apiServices, _sanitizer, service, modalCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.radioService = radioService;
        this.apiServices = apiServices;
        this._sanitizer = _sanitizer;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.schedules = [];
        this.apiServices.getFeturedPhoto();
        // this.getSliderPhoto();
    }
    HomePage.prototype.setMyStyles = function () {
        var styles = {};
        if (this.radioService.radioOptions.region == 'Lagos') {
            styles = {
                background: '#fb3336',
            };
        }
        else {
            styles = {
                background: '#222',
            };
        }
        return styles;
    };
    HomePage.prototype.getPlayingData = function () {
        if (this.radioService.radioOptions.region == 'Lagos') {
        }
        else {
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        // this.radioService.getAlbumArt('');
        this.apiServices.getPostData();
        if (this.radioService.isLivePlaying) {
            this.radioService.applyCSS();
        }
    };
    HomePage.prototype.getImageUrl = function (url_) {
        if (url_) {
            //console.log(url_);
            var ret = this._sanitizer.bypassSecurityTrustStyle("url(" + url_ + ")");
            // console.log(ret);
            return ret;
        }
    };
    HomePage.prototype.getSliderPhoto = function () {
        var _this = this;
        this.service.getSlider().then(function (results) {
            var data = results;
            var e = [];
            var i = 0;
            var flag = true;
            data.posts.forEach(function (a) {
                if (flag) {
                    a.attachments.forEach(function (b) {
                        e.push({ url: b.url, title: b.title, content: a.content });
                    });
                    i++;
                }
                if (i == 5) {
                    flag = false;
                    return;
                }
            });
            console.log(e);
            _this.sliderPhoto = e;
            console.log(results);
        });
    };
    HomePage.prototype.openFeatured = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__news_news__["a" /* NewsPage */], { items: "home" });
    };
    HomePage.prototype.openModelPost = function (post, item) {
        console.log(item);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__news_news__["b" /* ShowModelPage */], { post: post, item: item });
        // let customModal = this.modalCtrl.create(ShowModelPage, {post: post,item:item});
        // customModal.present();
    };
    HomePage.prototype.changeRegion = function (value) {
        this.radioService.setRegion(value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], HomePage.prototype, "nav", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home', animations: [
                Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["j" /* trigger */])('enterAnimation', [
                    Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["g" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["i" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["h" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["e" /* animate */])('500ms')
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["i" /* transition */])(':leave', Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["e" /* animate */])(600, Object(__WEBPACK_IMPORTED_MODULE_8__angular_animations__["h" /* style */])({ opacity: 0 })))
                ])
            ],template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="color: white">MAX FM</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="max-video" id="logo-image" style="background-image:url(\'assets/img/static-background.png\')">\n    \n      <div *ngIf="radioService.isPlaying && radioService.coverArtAnimation" class="max-video-overlay" [@enterAnimation] [style.backgroundImage]="getImageUrl(radioService?.radioOptions?.albumArt)">\n        <span class="max-status">Recently Played</span>\n        <span class="max-video-change-regionbtn" (click)="changeRegion()" [ngStyle]="setMyStyles()">Change Region</span>\n      </div>\n\n      <div *ngIf="radioService.isPlaying && radioService.coverArtAnimation" class="max-detail">\n        <h2 [innerHtml]="\'<span>\'+radioService.radioOptions.song+\'</span>\'"></h2>\n        <span [innerHtml]="\'<span>\'+radioService.radioOptions.name+\'</span>\'"></span>\n      </div>\n\n      <div *ngIf="!radioService.isPlaying || !radioService.coverArtAnimation" [@enterAnimation] class="max-video-overlay" [style.backgroundImage]="getImageUrl(apiServices.scheduleData[0]?.presenter_image)">\n        <span class="max-status">Live: <span class="max-region" [innerHtml]="radioService?.radioOptions?.region"></span></span> \n        <span class="max-video-change-regionbtn" (click)="changeRegion()" [ngStyle]="setMyStyles()">Change Region</span>\n      </div>\n\n      <div *ngIf="!radioService.isPlaying || !radioService.coverArtAnimation" class="max-detail">\n        <span> <button style="background-color: red;color: white">ON AIR NOW</button></span><br>\n        \n        <span *ngIf="apiServices.scheduleData[0]" [innerHtml]="apiServices.scheduleData[0]?.title + \'<br> With \' + apiServices.scheduleData[0]?.presenters_name"></span>\n        <span *ngIf="apiServices.scheduleData[0]" style="width: 120px">{{apiServices.scheduleData[0]?.start_time | dateConvertor : \'time\'}} - {{apiServices.scheduleData[0]?.end_time | dateConvertor : \'time\'}}</span>\n      </div>\n\n    <div class="max-equalizer">\n      <div id="levels">\n        <div class="level level1"></div>\n        <div class="level level2"></div>\n        <div class="level level3"></div>\n        <div class="level level4"></div>\n        <div class="level level5"></div>\n      </div>\n    </div>\n  </div>\n\n  <div class="max-video-upcomming">\n    <span class="max-video-upcomming-nextbtn" *ngIf="apiServices.scheduleData[1]">next</span>\n    <div class="max-video-upcomming-list-wrapper" *ngIf="apiServices.scheduleData[1]">\n      <div class="max-video-upcomming-list">\n        <img-loader class="max-video-upcomming-list-img" *ngIf="apiServices.scheduleData[1]?.presenter_image != false"\n        src="{{apiServices.scheduleData[1]?.presenter_image}}" useImg></img-loader>\n        <div class="max-video-upcomming-list-detail">\n          <h2 [innerHtml]="\'<span>\'+apiServices.scheduleData[1]?.title+\'</span>\'"></h2>\n          <span style="border-bottom:0px!important;" [innerHtml]="apiServices.scheduleData[1]?.presenters_name"></span>\n          <span style="border-bottom:0px!important;">{{apiServices.scheduleData[1]?.start_time | dateConvertor : \'time\'}} - {{apiServices.scheduleData[1]?.end_time | dateConvertor : \'time\'}}</span>\n        </div>\n      </div>\n    </div>\n    <div class="max-video-upcomming-list-wrapper" *ngIf="apiServices.scheduleData[2]">\n\n      <div class="max-video-upcomming-list">\n        <div class="max-video-upcomming-list-img"><img-loader *ngIf="apiServices.scheduleData[2]?.presenter_image != false" src="{{apiServices.scheduleData[2]?.presenter_image}}" useImg></img-loader></div>\n        <div class="max-video-upcomming-list-detail">\n          <h2 [innerHtml]="\'<span>\'+apiServices.scheduleData[2]?.title+\'</span>\'"></h2>\n          <span style="border-bottom:0px!important;" [innerHtml]="apiServices.scheduleData[2]?.presenters_name"></span>\n          <span style="border-bottom:0px!important;">{{apiServices.scheduleData[2]?.start_time | dateConvertor : \'time\'}} - {{apiServices.scheduleData[2]?.end_time | dateConvertor : \'time\'}}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--<div *ngIf="apiServices.feturedPhoto">\n    <ion-slides style="height: 300px " pager="true" paginationType="bullets" loop="true">\n      <ion-slide *ngFor="let item of apiServices.feturedPhoto">\n        <img-loader src="{{item.image}}" height="300" useImg (click)="openModelPost(null, item)"></img-loader>\n        <p\n          style="margin-left: 25px;text-align:center; position: absolute; top:60%; color: #fff; font-family: \'Roboto\', sans-serif; font-size: 20px;"\n          (click)="openModelPost(null, item)" [innerHtml]="\'<span>\'+item.title+\'</span>\'">\n        </p>\n      </ion-slide>\n    </ion-slides>\n  </div>-->\n  \n  \n  \n <!-- <div class="max-story featured-gallery" *ngIf="sliderPhoto">\n    <div class="max-story-title">\n        <h2>FEATURED GALLERIES</h2>\n    </div>\n    \n    <ion-slides *ngIf="sliderPhoto && sliderPhoto.length" style="height: 270px " pager="true" paginationType="bullets" loop="true">\n      <ion-slide style="text-align: center" *ngFor="let item of sliderPhoto">\n        <img-loader src="{{item.url}}" height="230" (click)="openModelPost(null, item)" useImg></img-loader>\n        <p\n          style="margin-left: 25px;text-align:center; position: absolute; color: #fff;font-family: \'Roboto\', sans-serif;font-size: 25px;"\n          (click)="openModelPost(null, item)" [innerHtml]="\'<span>\'+item.title+\'</span>\'">\n          <span style="font-size: 12px">{{item.date}}</span><br>\n        </p>\n      </ion-slide>\n    </ion-slides>\n  </div>-->\n\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_radio_service__["a" /* RadioService */],
            __WEBPACK_IMPORTED_MODULE_3__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_6__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capitalstation_capitalstation__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__competition_competition__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__privacy_privacy__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__premiumrate_premiumrate__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__thirdparty_thirdparty__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__terms_terms__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__contactPR_contactPR__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providefeedback_providefeedback__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_radio_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, radioService, storage, oneSignal, inAppBrowser) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.radioService = radioService;
        this.storage = storage;
        this.oneSignal = oneSignal;
        this.inAppBrowser = inAppBrowser;
        this.pushSubscribed = false;
        storage.get(SettingsPage_1.IS_PUSH_ENABLED).then(function (val) {
            console.log('push value is', val);
            _this.pushSubscribed = val;
        });
    }
    SettingsPage_1 = SettingsPage;
    SettingsPage.prototype.changePushNotification = function (value) {
        console.log("SettingsPage::changePushNotification", this.pushSubscribed, value);
        this.oneSignal.setSubscription(this.pushSubscribed);
        console.log(this.pushSubscribed);
        this.storage.set(SettingsPage_1.IS_PUSH_ENABLED, this.pushSubscribed);
    };
    SettingsPage.prototype.openCompetitionPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__competition_competition__["a" /* CompetitionPage */]);
    };
    SettingsPage.prototype.openPrivacyPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__privacy_privacy__["a" /* PrivacyPage */]);
    };
    SettingsPage.prototype.openPremiumratePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__premiumrate_premiumrate__["a" /* PremiumRatePage */]);
    };
    SettingsPage.prototype.openThirdPartyPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__thirdparty_thirdparty__["a" /* ThirdPartyPage */]);
    };
    SettingsPage.prototype.openTermsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__terms_terms__["a" /* TermsPage */]);
    };
    SettingsPage.prototype.openProvideFeedbackPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__providefeedback_providefeedback__["a" /* ProvideFeedbackPage */]);
    };
    SettingsPage.prototype.openContactPRPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__contactPR_contactPR__["a" /* ContactPRPage */]);
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.openSettingStationPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__capitalstation_capitalstation__["a" /* CapitalstationPage */]);
    };
    // openChangeBrandUrl(){
    //   const browser = this.inAppBrowser.create("http://maxfm.thrilliant.com.ng/changebrand", '_blank', 'location=no,toolbar=no');
    //     browser.show()
    // }
    // openPrideFeedBackUrl(){
    //   const browser = this.inAppBrowser.create("http://maxfm.thrilliant.com.ng/feedback",'_blank', 'location=no,toolbar=no');
    //     browser.show()
    // }
    SettingsPage.prototype.openWebView = function (url) {
        console.log("url is :" + url);
        var browser = this.inAppBrowser.create(url, '_blank', 'location=yes,toolbar=yes');
        browser.show();
    };
    SettingsPage.IS_PUSH_ENABLED = "is-push-enabled";
    SettingsPage = SettingsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\settings\settings.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="color: white">Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding="top:5px">\n  <ion-card padding style="background-color: #870a04;" >\n    <ion-item style="background: transparent;" >\n      <ion-label color="light">Activate Push Notifications</ion-label>\n      <ion-toggle class="center" [(ngModel)]="pushSubscribed" (ionChange)="changePushNotification($event)" color="danger"></ion-toggle>\n    </ion-item>\n\n    <!-- \n      (click)="openSettingStationPage()"\n    <img style="width: 25px;height:30px;padding-right: 2px;float: left" src="assets/img/mic.png">\n    <p style="font-size: 18px;padding-left: 50px;padding-top: 5px;float: left;margin-top:-33px;color: white">\n      Change MAX-FM Station\n    </p> -->\n  </ion-card>\n\n  <ion-card style="background-color: #000000" padding (click)="openContactPRPage()">\n    <img style="width: 25px;height:30px;padding-right: 2px;float: left" src="assets/img/location.png">\n    <p style="font-size: 18px;padding-left: 50px;padding-top: 5px;float: left;margin-top:-33px;color: white">\n      Contact PR/Marketing\n    </p>\n  </ion-card>\n\n  <ion-card style="background-color: #000000"padding (click)="openProvideFeedbackPage()">\n   <!-- <a href="#" onclick="window.open(\'http://maxfm.thrilliant.com.ng/feedback\', \'_system\', \'location=yes\'); return false;">\n    </a>-->\n    <img style="width: 25px;padding-right: 2px;float: left" src="assets/img/comment.png">\n    <p style="font-size: 18px;padding-left: 50px;padding-top: 5px;float: left;margin-top:-33px;color: white">\n      Provide Feedback\n    </p>\n  </ion-card>\n\n\n  <ion-list class="links" no-lines padding>\n    <ion-item (click)="openTermsPage()">Terms Of Use<ion-icon item-end name="arrow-forward"></ion-icon></ion-item>\n    <ion-item (click)="openCompetitionPage()">Competition Terms<ion-icon item-end name="arrow-forward"></ion-icon></ion-item>\n    <ion-item (click)="openPrivacyPage()">Privacy Policy<ion-icon item-end name="arrow-forward"></ion-icon></ion-item>\n    <ion-item (click)="openThirdPartyPage()">3rd Party License Agreement<ion-icon item-end name="arrow-forward"></ion-icon></ion-item>\n    <ion-item>\n      <h2>MAX FM</h2>\n      <p>All Rights Reserved</p>\n    </ion-item>\n\n\n\n<!-- \n    <div style="height: 50px;padding-top: 20px;padding-left: 10px"><span>Push Notifications</span>\n      <div style="float: right"><ion-toggle [(ngModel)]="pepperoni"></ion-toggle></div>\n    </div>\n  \n\n  \n  <div style="padding-top: 15px;padding-left: 10px" (click)="openTermsPage()">Terms Of Use</div>\n    <div style="float: right;;margin-top: -20px"> <ion-icon name="arrow-forward"></ion-icon></div>\n  </ion-list>\n \n    \n   <ion-list style="padding-top: 0px;height: 50px;background-color: whitesmoke">\n      <div  style="padding-top: 15px;padding-left: 10px"  (click) = "openCompetitionPage()">Competition Terms</div>\n      <div style="float: right;margin-top: -20px"> <ion-icon name="arrow-forward"></ion-icon></div>\n   </ion-list>\n  \n  \n    <ion-list style="padding-top: 2px;height: 50px;background-color: whitesmoke">\n      <div  style="padding-top: 15px;padding-left: 10px"  (click) = "openPrivacyPage()">Privacy Policy</div>\n      <div style="float: right;margin-top: -20px"> <ion-icon name="arrow-forward" ></ion-icon></div>\n    </ion-list>\n\n    <ion-list style="padding-top: 2px;height: 50px;background-color: whitesmoke">\n      <div  style="padding-top: 15px;padding-left: 10px"  (click) = "openPremiumratePage()"> Premium rate phone and text</div>\n      <div style="float: right;margin-top: -20px"> <ion-icon name="arrow-forward"></ion-icon></div>\n    </ion-list>\n    \n    <ion-list style="padding-top: 2px;height: 50px;background-color: whitesmoke">\n      <div  style="padding-top: 15px;padding-left: 10px"  (click) = "openThirdPartyPage()">3rd Party License Agreement</div>\n      <div style="float: right;margin-top: -20px"> <ion-icon name="arrow-forward"></ion-icon></div>\n    </ion-list>\n    <ion-list style="padding-top: 2px;height: 100px;background-color: whitesmoke">\n    <div style="padding-left: 10px">MAX FM <br>\n      All Rights Reserved <br>\n    </div> -->\n  </ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_13__services_radio_service__["a" /* RadioService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], SettingsPage);
    return SettingsPage;
    var SettingsPage_1;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalstationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_radio_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api_services__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { MyApp } from '../../app/app.component';
/**
 * Generated class for the CapitalstationPage page.
 */
var CapitalstationPage = /** @class */ (function () {
    function CapitalstationPage(navCtrl, navParams, service, radioService, apiService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.radioService = radioService;
        this.apiService = apiService;
        this.flag = false;
        this.title = 'Change MAX FM Station';
        this.getRegion();
    }
    CapitalstationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CapitalstationPage');
    };
    CapitalstationPage.prototype.getRegion = function () {
        var _this = this;
        this.service.getRegionData().then(function (results) {
            //let data = results;
            _this.data = results;
            console.log(results);
        });
    };
    CapitalstationPage.prototype.changeRegion = function (regionData) {
        var json_url = regionData.json_url;
        var lastSlash = json_url.lastIndexOf('/');
        var region_strem_link = '';
        var region_standard_stream_link = '';
        if (lastSlash == json_url.length - 1) {
            json_url = regionData.json_url.substr(0, lastSlash);
        }
        var audioUrl = regionData.region_stream_link.split('/');
        if (audioUrl[audioUrl.length - 1] == 'stream') {
            region_strem_link = regionData.region_stream_link.substr(0, regionData.region_stream_link.lastIndexOf('/') + 1);
        }
        // let lofiUrl = regionData.region_standard_stream_link.split('/');  
        if (audioUrl[audioUrl.length - 1] == 'stream') {
            region_standard_stream_link = regionData.region_standard_stream_link.substr(0, regionData.region_standard_stream_link.lastIndexOf('/') + 1);
        }
        console.log("region link : " + region_strem_link);
        console.log("json_url : " + json_url);
        this.apiService.url = json_url;
        this.apiService.changeJsonUrl(json_url);
        this.service.url = json_url;
        this.radioService.url = region_strem_link;
        this.radioService.lowFiUrl = region_standard_stream_link;
        this.radioService.radioOptions.region = regionData.region_name;
        if (this.radioService.isPlaying) {
            this.radioService.stopAudio();
            if (this.radioService.radioOptions.dataSaver) {
                this.radioService.file.src = region_standard_stream_link + "stream";
            }
            else {
                this.radioService.file.src = region_strem_link + "stream";
            }
            this.radioService.playAudio(true);
        }
        else {
            if (this.radioService.radioOptions.dataSaver) {
                this.radioService.file.src = region_standard_stream_link + "stream";
            }
            else {
                this.radioService.file.src = region_strem_link + "stream";
            }
        }
        this.radioService.getStreamInfo(region_strem_link);
    };
    CapitalstationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-capitalstation',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\capitalstation\capitalstation.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon  name="arrow-back" ></ion-icon>\n    </button>\n    <ion-title style="text-align: center" style="color: white">{{title}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n<ion-list style="background-color: whitesmoke;height: 35%" >\n  <div style="padding-top: 18%;padding-left: 40%">\n  <img style="height: 70px; width:40px; alignment: center" src="assets/img/RED_location.png">\n  </div>\n  <p style="color: black;padding-top: 2%;padding-left: 25%;font-size: 20px">\n    Choose your region\n  </p>\n </ion-list>\n  <div radio-group [(ngModel)]="relationship">\n  <ion-list style="background-color: whitesmoke;height: 10%;padding-top: 5%" *ngFor="let a of data; index as i" >\n    <div style="padding-left: 10px;font-size: 20px">{{a.region_name}}</div>\n      <div style="float: right;margin-top: -6%;padding-right: 10%">\n        <ion-radio (ionSelect) = "changeRegion(a)" value="{{a.region_name}}"> </ion-radio>\n      </div>\n\n  </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\capitalstation\capitalstation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_3__services_radio_service__["a" /* RadioService */],
            __WEBPACK_IMPORTED_MODULE_4__services_api_services__["a" /* ApiService */]])
    ], CapitalstationPage);
    return CapitalstationPage;
}());

//# sourceMappingURL=capitalstation.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popover1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_radio_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Popover1Page = /** @class */ (function () {
    function Popover1Page(navCtrl, navParams, viewCtrl, service, radioService, apiService, events, radio) {
        // this.region = this.navParams.get('region');
        // console.log(this.region);
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.service = service;
        this.radioService = radioService;
        this.apiService = apiService;
        this.events = events;
        this.radio = radio;
        this.flag_changeRegion = this.radioService.radioOptions.region;
        // this.flag_lagos = true;
    }
    Popover1Page.prototype.getRegion = function () {
        var _this = this;
        this.service.getRegionData().then(function (results) {
            //let data = results;
            _this.data = results;
            console.log(results);
        });
    };
    Popover1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Popover1Page');
    };
    Popover1Page.prototype.ionViewWillEnter = function () {
        //this.getRegion();
    };
    Popover1Page.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    Popover1Page.prototype.changeRegion = function () {
        console.log(this.flag_changeRegion);
        this.radioService.setRegion(this.flag_changeRegion);
        this.viewCtrl.dismiss();
    };
    Popover1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popover1',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\popover1\popover1.html"*/'<ion-content style="background-color: #870a04; width: 100%">\n  <ion-list no-lines radio-group [(ngModel)]="flag_changeRegion">\n    <ion-item style="background: transparent;">\n      <ion-label style=" color: #fff; font-size: 2rem; font-weight: bold">Lagos</ion-label>\n      <ion-radio value="Lagos" (ionSelect)="changeRegion()"></ion-radio>\n    </ion-item>\n    <ion-item style="background: transparent;">\n      <ion-label style=" color: #fff; font-size: 2rem; font-weight: bold">Abuja</ion-label>\n      <ion-radio value="Abuja" (ionSelect)="changeRegion()"></ion-radio>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\popover1\popover1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__services_radio_service__["a" /* RadioService */], __WEBPACK_IMPORTED_MODULE_3__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__services_radio_service__["a" /* RadioService */]])
    ], Popover1Page);
    return Popover1Page;
}());

//# sourceMappingURL=popover1.js.map

/***/ }),

/***/ 204:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 204;

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 248;

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompetitionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CompetitionPage = /** @class */ (function () {
    function CompetitionPage(sanitize) {
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/competition-terms");
        this.itsLoading = true;
    }
    CompetitionPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    CompetitionPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    CompetitionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-competition',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\competition\competition.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Competition Terms</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="competition-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\competition\competition.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], CompetitionPage);
    return CompetitionPage;
}());

//# sourceMappingURL=competition.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(sanitize) {
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("https://max1023.fm/privacy-policy");
        this.itsLoading = true;
    }
    PrivacyPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    PrivacyPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-privacy',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\privacy\privacy.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Privacy Policy</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="privacy-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\privacy\privacy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremiumRatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PremiumRatePage = /** @class */ (function () {
    function PremiumRatePage(sanitize) {
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/premium-rate");
        this.itsLoading = true;
    }
    PremiumRatePage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    PremiumRatePage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    PremiumRatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-premiumrate',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\premiumrate\premiumrate.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Premium rate phone and text</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="premiumrate-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n    \n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\premiumrate\premiumrate.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], PremiumRatePage);
    return PremiumRatePage;
}());

//# sourceMappingURL=premiumrate.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThirdPartyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ThirdPartyPage = /** @class */ (function () {
    function ThirdPartyPage(sanitize) {
        this.sanitize = sanitize;
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/third-party​");
        this.itsLoading = true;
    }
    ThirdPartyPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    ThirdPartyPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    ThirdPartyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-thirdparty',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\thirdparty\thirdparty.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">3rd Party License Agreement</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="thirdparty-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n    \n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\thirdparty\thirdparty.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ThirdPartyPage);
    return ThirdPartyPage;
}());

//# sourceMappingURL=thirdparty.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TermsPage = /** @class */ (function () {
    function TermsPage(sanitize) {
        this.itsLoading = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/terms-of-use");
        this.itsLoading = true;
    }
    TermsPage.prototype.setFrameLoaded = function () {
        console.log("setFrameLoaded");
        this.itsLoading = false;
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terms',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\terms\terms.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Terms Of Use</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="terms-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n    \n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\terms\terms.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPRPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPRPage = /** @class */ (function () {
    function ContactPRPage(sanitize) {
        this.sanitize = sanitize;
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/contact/");
        this.itsLoading = true;
    }
    ContactPRPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    ContactPRPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    ContactPRPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contactPRPage',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\contactPR\contactPR.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Contact PR/Marketing</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="contactPR-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\contactPR\contactPR.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ContactPRPage);
    return ContactPRPage;
}());

//# sourceMappingURL=contactPR.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvideFeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProvideFeedbackPage = /** @class */ (function () {
    function ProvideFeedbackPage(sanitize) {
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/feedback/");
        this.itsLoading = true;
    }
    ProvideFeedbackPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    ProvideFeedbackPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    ProvideFeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-providefeedback',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\providefeedback\providefeedback.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Provide Feedback</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="providefeedback-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n    \n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\providefeedback\providefeedback.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ProvideFeedbackPage);
    return ProvideFeedbackPage;
}());

//# sourceMappingURL=providefeedback.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpinionAbujaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OpinionAbujaPage = /** @class */ (function () {
    function OpinionAbujaPage(sanitize) {
        this.sanitize = sanitize;
        this.itsLoading = false;
        this.isViewLoaded = false;
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/abuja");
        this.itsLoading = true;
    }
    OpinionAbujaPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    OpinionAbujaPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    OpinionAbujaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-opinions',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\opinionAbuja\opinionAbuja.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Comment on the Show</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="opinionabuja-page">\n\n    <iframe (load)="setFrameLoaded()" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n    \n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\opinionAbuja\opinionAbuja.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], OpinionAbujaPage);
    return OpinionAbujaPage;
}());

//# sourceMappingURL=opinionAbuja.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpinionLagosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OpinionLagosPage = /** @class */ (function () {
    function OpinionLagosPage(sanitize) {
        this.sanitize = sanitize;
        this.itsLoading = true;
        this.isViewLoaded = false;
        this.url = this.sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/lagos");
    }
    OpinionLagosPage.prototype.ionViewDidLoad = function () {
        this.isViewLoaded = true;
    };
    OpinionLagosPage.prototype.setFrameLoaded = function (event) {
        if (this.isViewLoaded) {
            this.itsLoading = false;
        }
    };
    OpinionLagosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-opinionLagos',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\opinionLagos\opinionLagos.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title style = "padding-right:48px;">Comment on the Show</ion-title>\n\n      <ion-buttons end>\n\n        <ion-spinner class="center" *ngIf="itsLoading" name="bubbles" color="light"></ion-spinner>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="opinionlagos-page">\n\n    <iframe (load)="setFrameLoaded($event)" [hidden]="itsLoading" height="100%" width="100%" [src]="url"></iframe>\n\n  </ion-content>\n\n  '/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\opinionLagos\opinionLagos.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], OpinionLagosPage);
    return OpinionLagosPage;
}());

//# sourceMappingURL=opinionLagos.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_network_network__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the NetworkErrorPage page.
 */
var NetworkErrorPage = /** @class */ (function () {
    function NetworkErrorPage(platform, viewCtrl, networkStatus) {
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.networkStatus = networkStatus;
        this.unsubscribeNetworkStatus = this.networkStatus.getNetworkStatus().subscribe(this.currentNetworkStatus.bind(this));
    }
    NetworkErrorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NetworkErrorPage');
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function () {
            // do nothing
        });
    };
    NetworkErrorPage.prototype.currentNetworkStatus = function (status) {
        console.log('network status ==> ', (status == __WEBPACK_IMPORTED_MODULE_2__providers_network_network__["a" /* ConnectionStatus */].Offline));
        if (status == __WEBPACK_IMPORTED_MODULE_2__providers_network_network__["a" /* ConnectionStatus */].Online) {
            this.retry();
        }
    };
    NetworkErrorPage.prototype.retry = function () {
        if (this.networkStatus.isConnected()) {
            if (this.unregisterBackButtonAction) {
                this.unregisterBackButtonAction();
            }
            if (this.unsubscribeNetworkStatus) {
                this.unsubscribeNetworkStatus.unsubscribe(this.currentNetworkStatus);
            }
            this.viewCtrl.dismiss();
        }
    };
    NetworkErrorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-network-error',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\network-error\network-error.html"*/'<!-- \n<ion-header>\n\n  <ion-navbar>\n    <ion-title>network-error</ion-title>\n  </ion-navbar>\n\n</ion-header>\n -->\n<ion-content padding>\n	<ion-card>\n		<ion-card-header text-center color="danger">Internet Connection Error!</ion-card-header>\n		<ion-card-content text-center>\n			<div class="refresh" (click)="retry()">\n				<ion-icon name="md-refresh-circle" color="danger"></ion-icon>\n			</div>\nSorry, we are optimizing your network to keep you connected. <br>Tap to retry.\n		</ion-card-content>\n</ion-card>\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\network-error\network-error.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_network_network__["b" /* NetworkProvider */]])
    ], NetworkErrorPage);
    return NetworkErrorPage;
}());

//# sourceMappingURL=network-error.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_network_network__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RadioService = /** @class */ (function () {
    function RadioService(http, musicControls, platform, backgroundMode, networkStatus, apiServices) {
        this.http = http;
        this.musicControls = musicControls;
        this.platform = platform;
        this.backgroundMode = backgroundMode;
        this.networkStatus = networkStatus;
        this.apiServices = apiServices;
        this.lastFMKey = 'ab68e9a71c1bb15efaa9c706b646dee4';
        this.lastFM = 'http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&limit=1&api_key=' + this.lastFMKey + '&track=';
        this.url = "http://maxfm1023.thrilliant.com.ng:9193/";
        this.itune = "https://itunes.apple.com/search?limit=10&media=music&entity=album&term=";
        this.isLivePlaying = false;
        this.isPlaying = false;
        this.coverArtAnimation = false;
        this.schedulePlaying = false;
        this.lowFiUrl = "http://maxfmdatasaver.thrilliant.com.ng:9193/";
        this.lowFiUrls = [
            {
                region_name: "Lagos",
                region_strem_link: "http://maxfmdatasaver.thrilliant.com.ng:9193/stream/2/"
            },
            {
                region_name: "Abuja",
                region_strem_link: "http://maxfmdatasaver.thrilliant.com.ng:8703/stream/2/"
            }
        ];
        this.radioOptions = { song: "", name: "", albumArt: '', region: 'Lagos', datasaver: false };
        this.currentPlaying = { song: "", name: "", schedule: "", albumArt: '' };
        this.file = new Audio(this.url + "stream");
        this.showData = { startTime: '', endTime: '', title: '' };
        this.playerCreated = false;
        this.isNetworkError = false;
        this.onRegionChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.getStreamInfo(this.url);
        this.file.addEventListener('error', this.handleMediaError.bind(this));
    }
    RadioService.prototype.setRegion = function (region) {
        this.onRegionChange.emit();
    };
    RadioService.prototype.playLive = function () {
        console.log('RadioService::playLive', this.url);
        this.file = new Audio(this.url + "stream");
        this.file.play();
        this.isPlaying = true;
        this.isLivePlaying = true;
        this.schedulePlaying = false;
    };
    RadioService.prototype.pauseLive = function () {
        console.log('RadioService::pauseLive');
        this.file.pause();
        this.isPlaying = false;
        this.isLivePlaying = false;
        this.schedulePlaying = false;
    };
    RadioService.prototype.playSchedule = function (songUrl, startTime, endTime, title) {
        console.log('RadioService::playSchedule');
        this.showData.startTime = startTime;
        this.showData.endTime = endTime;
        this.showData.title = title;
        this.file.src = songUrl;
        this.schedulePlaying = true;
        this.playAudio(false);
    };
    RadioService.prototype.applyCSS = function () {
        $('.max-video-upcomming-list').addClass("red");
        $('.max-equalizer').toggleClass("show");
        $('.max-play-btn').toggleClass("hide");
        $('img.playBtn').toggleClass("hide");
        var button = $('img.playStop');
        if (button.hasClass("show")) {
            $('img.playStop').toggleClass("show");
        }
        else {
            window.setTimeout(function () {
                $('img.playStop').toggleClass("show");
            }, 500);
        }
        setTimeout(function () {
            $('.max-video-upcomming-list.audio i').fadeOut(350);
            setTimeout(function () {
                $('.max-video-upcomming-list').removeClass("red");
                $('.max-video-upcomming-list i').show();
            }, 400);
        }, 500);
    };
    RadioService.prototype.playResume = function () {
        console.log('playResume ==> ', this.isNetworkError);
        // if (this.isNetworkError) {
        this.stopAudio();
        this.isNetworkError = false;
        this.playAudio(true);
        // }
    };
    RadioService.prototype.playAudio = function (value) {
        var _this = this;
        console.log('RadioService::playAudio', value);
        // this.musicControls.updateIsPlaying(true);
        // $('#logo-image').css('background-image',"url('')");
        this.applyCSS();
        this.backgroundMode.enable();
        this.file.play();
        this.isPlaying = true;
        this.coverArtAnimation = true;
        this.coverArtInterval = setInterval(function () {
            _this.coverArtAnimation = !_this.coverArtAnimation;
        }, 7000);
        if (value == true) {
            this.schedulePlaying = false;
            this.isLivePlaying = true;
        }
        else {
            this.schedulePlaying = true;
            this.isLivePlaying = false;
        }
    };
    RadioService.prototype.stopAudio = function () {
        // console.log('RadioService::stopAudio')
        if (this.playerCreated) {
            this.musicControls.updateIsPlaying(false);
        }
        this.applyCSS();
        this.file.pause();
        this.file = null;
        this.file = new Audio(this.url + "stream");
        this.backgroundMode.disable();
        this.isPlaying = false;
        if (!this.schedulePlaying) {
            this.isLivePlaying = false;
        }
        this.coverArtAnimation = false;
        if (this.coverArtInterval != undefined) {
            clearInterval(this.coverArtInterval);
            $('#logo-image').css('background-image', "url('assets/img/static-background.png')");
        }
    };
    RadioService.prototype.parseStreamResponse = function (response) {
        // console.log('RadioService::parseStreamResponse')
        var data = response;
        var regex = data._body.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im)[1];
        var parts = regex.split(',');
        if (parts.length == 7) {
            return parts[6];
        }
        return null;
    };
    RadioService.prototype.getAlbumArt = function (songTitle) {
        var _this = this;
        // console.log('RadioService::getAlbumArt', songTitle)
        if (!songTitle) {
            return;
        }
        var newtitle = songTitle.split(' ').join('+');
        console.log("url is " + this.itune + newtitle);
        // This is call to itune first
        this.http.get(this.itune + newtitle).subscribe(function (data) {
            var d = data;
            var response = {};
            if (d._body) {
                response = JSON.parse(d._body);
            }
            // console.log('RadioService::getAlbumArt', response)
            // here we are checking the resultCount of the response whether it has any response or not if yes then it will enter in this block and
            //set the image for displaying
            if (response.resultCount > 0) {
                // Itune response with data
                if (response.results[0].artworkUrl100 != undefined) {
                    var lastSlash = response.results[0].artworkUrl100.lastIndexOf('/');
                    response.results[0].artworkUrl100 = response.results[0].artworkUrl100.substr(0, lastSlash);
                    _this.radioOptions.albumArt = response.results[0].artworkUrl100 + '/600x600bb.jpg';
                    console.log('RadioService::getAlbumArt', _this.radioOptions.albumArt);
                    var splitSong = songTitle.split('-');
                    console.log('RadioService::getAlbumArt', splitSong);
                    if (splitSong.length > 1) {
                        _this.radioOptions.song = splitSong[1];
                        _this.radioOptions.name = splitSong[0];
                    }
                    else {
                        _this.radioOptions.song = songTitle;
                    }
                }
                else {
                    _this.getAlbumArtFromFM(songTitle);
                }
            }
            else {
                // If we got 0 response then we call Last FM 
                _this.getAlbumArtFromFM(songTitle);
            }
        }, function (err) {
            console.log('RadioService::getAlbumArt', err);
        });
    };
    RadioService.prototype.getAlbumArtFromFM = function (songTitle) {
        var _this = this;
        console.log("song title is : " + songTitle);
        //here we call the LastFM Api to get the response
        this.http.get(this.lastFM + encodeURIComponent(songTitle)).subscribe(function (data) {
            var d = data;
            var response = {};
            if (d._body) {
                response = JSON.parse(d._body);
            }
            console.log("Last FM");
            // console.log('RadioService::getAlbumArtFromFM', response);
            if (response.error) {
                // console.log('RadioService::getAlbumArtFromFM', songTitle)
                // console.log("album title called")
                var splitSong = songTitle.split('-');
                // console.log('RadioService::getAlbumArtFromFM', splitSong)
                if (splitSong.length > 1) {
                    _this.radioOptions.song = splitSong[1];
                    _this.radioOptions.name = splitSong[0];
                }
                else {
                    _this.radioOptions.name = songTitle;
                }
            }
            else {
                if (response.results) {
                    if (response.results.trackmatches != "\n") {
                        if (response.results.trackmatches.track[0] && response.results.trackmatches.track[0].image !== undefined) {
                            _this.radioOptions.albumArt = response.results.trackmatches.track[0].image[3]['#text'];
                            // console.log('RadioService::getAlbumArtFromFM', songTitle)
                            // console.log("album title called")
                            var splitSong = songTitle.split('-');
                            console.log(splitSong);
                            if (splitSong.length > 1) {
                                _this.radioOptions.song = splitSong[1];
                                _this.radioOptions.name = splitSong[0];
                            }
                            else {
                                _this.radioOptions.song = songTitle;
                            }
                        }
                        else {
                            console.log(songTitle);
                            console.log("album title called");
                            var splitSong = songTitle.split('-');
                            console.log(splitSong);
                            if (splitSong.length > 1) {
                                _this.radioOptions.song = splitSong[1];
                                _this.radioOptions.name = splitSong[0];
                            }
                            else {
                                _this.radioOptions.song = songTitle;
                            }
                        }
                    }
                    else {
                        console.log(songTitle);
                        console.log("album title called");
                        var splitSong = songTitle.split('-');
                        console.log(splitSong);
                        if (splitSong.length > 1) {
                            _this.radioOptions.song = splitSong[1];
                            _this.radioOptions.name = splitSong[0];
                        }
                        else {
                            _this.radioOptions.song = songTitle;
                        }
                    }
                }
            }
            _this.toggleMusicPlayer();
        });
    };
    RadioService.prototype.getStreamInfo = function (url) {
        var _this = this;
        // console.log('RadioService::getStreamInfo', url);
        this.radioOptions.song = "";
        this.radioOptions.name = "";
        this.radioOptions.albumArt = "";
        if (this.interval != undefined) {
            clearInterval(this.interval);
        }
        this.getInfo(url);
        this.interval = setInterval(function () {
            _this.getInfo(url);
        }, 5000);
    };
    RadioService.prototype.getInfo = function (url) {
        var _this = this;
        // console.log('RadioService::getInfo', url);
        var streamingDataUrl = url + '7.html';
        this.http.get(streamingDataUrl).subscribe(function (data) {
            _this.networkStatus.setStatus(__WEBPACK_IMPORTED_MODULE_6__providers_network_network__["a" /* ConnectionStatus */].Online);
            // console.log("RadioService::getInfo success", data);
            var song = _this.parseStreamResponse(data);
            // console.log("RadioService::getInfo success", song);
            if (song === '') {
            }
            else {
                if (_this.lastSong != song) {
                    console.log("does not matched", song);
                    _this.lastSong = song;
                    _this.radioOptions.albumArt = "";
                    _this.getAlbumArt(song);
                }
            }
        }, function (err) {
            _this.networkStatus.setStatus(__WEBPACK_IMPORTED_MODULE_6__providers_network_network__["a" /* ConnectionStatus */].Offline);
            console.log('RadioService::getInfo error', err);
        });
    };
    RadioService.prototype.toggleMusicPlayer = function () {
        var _this = this;
        console.log('RadioService::toggleMusicPlayer');
        if (this.platform.is("cordova")) {
            if (!this.playerCreated) {
                this.musicControls.create(this.getMusicPlayerOption()).then(function (data) {
                    _this.playerCreated = true;
                    console.log('RadioService::toggleMusicPlayer success', data);
                }, function (err) {
                    _this.playerCreated = false;
                    console.log('RadioService::toggleMusicPlayer error', err);
                });
                this.setupMusicPlayer();
            }
            else {
                this.musicControls.destroy().then(function (data) {
                    _this.musicControls.create(_this.getMusicPlayerOption()).then(function (data) {
                        _this.playerCreated = true;
                        console.log('RadioService::toggleMusicPlayer success', data);
                    }, function (err) {
                        _this.playerCreated = false;
                        console.log('RadioService::toggleMusicPlayer error', err);
                    });
                }, function (err) {
                    console.log('RadioService::toggleMusicPlayer error', err);
                });
            }
        }
    };
    RadioService.prototype.getMusicPlayerOption = function () {
        console.log('RadioService::getMusicPlayerOption');
        var musicPlayerOption = {};
        musicPlayerOption.track = decodeURI(this.radioOptions.name + " - " + this.radioOptions.song);
        musicPlayerOption.artist = "";
        musicPlayerOption.cover = this.radioOptions.albumArt;
        musicPlayerOption.isPlaying = this.isPlaying;
        musicPlayerOption.dismissable = false;
        musicPlayerOption.hasPrev = false;
        musicPlayerOption.hasNext = false;
        musicPlayerOption.hasClose = false;
        musicPlayerOption.album = "";
        musicPlayerOption.hasSkipForward = false;
        musicPlayerOption.hasSkipBackward = false;
        musicPlayerOption.ticker = "";
        musicPlayerOption.playIcon = 'media_play';
        musicPlayerOption.pauseIcon = 'media_pause';
        musicPlayerOption.prevIcon = 'media_prev';
        musicPlayerOption.nextIcon = 'media_next';
        musicPlayerOption.closeIcon = 'media_close';
        musicPlayerOption.notificationIcon = 'notification';
        console.log("song change");
        return musicPlayerOption;
    };
    RadioService.prototype.handleMediaError = function (e) {
        switch (e.target.error.code) {
            case e.target.error.MEDIA_ERR_ABORTED:
                console.log('You aborted the media playback.');
                break;
            case e.target.error.MEDIA_ERR_NETWORK:
                this.isNetworkError = true;
                console.log('A network error caused the media download to fail.');
                break;
            case e.target.error.MEDIA_ERR_DECODE:
                console.log('The media playback was aborted due to a corruption problem or because the media used features your browser did not support.');
                break;
            case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                console.log('The media could not be loaded, either because the server or network failed or because the format is not supported.');
                break;
            default:
                console.log('An unknown media error occurred.');
        }
    };
    RadioService.prototype.setupMusicPlayer = function () {
        var _this = this;
        console.log('RadioService::setupMusicPlayer');
        this.musicControls.subscribe().subscribe(function (action) {
            console.log('RadioService::setupMusicPlayer', action);
            var a = JSON.parse(action);
            var message = a.message;
            console.log(message);
            console.log(message);
            switch (message) {
                case 'music-controls-next':
                    // Do something
                    break;
                case 'music-controls-previous':
                    // Do something
                    break;
                case 'music-controls-pause':
                    console.log("music pause button called");
                    _this.stopAudio();
                    // Do something
                    break;
                case 'music-controls-play':
                    console.log("music play button called");
                    _this.playAudio(true);
                    // Do something
                    break;
                case 'music-controls-destroy':
                    // Do something
                    break;
                // External controls (iOS only)
                case 'music-controls-toggle-play-pause':
                    // Do something
                    break;
                case 'music-controls-seek-to':
                    var seekToInSeconds = JSON.parse(action).position;
                    _this.musicControls.updateElapsed({
                        elapsed: seekToInSeconds,
                        isPlaying: true
                    });
                    // Do something
                    break;
                case 'music-controls-skip-forward':
                    // Do something
                    break;
                case 'music-controls-skip-backward':
                    // Do something
                    break;
                // Headset events (Android only)
                // All media button events are listed below
                case 'music-controls-media-button':
                    // Do something
                    break;
                case 'music-controls-headset-unplugged':
                    // Do something
                    break;
                case 'music-controls-headset-plugged':
                    // Do something
                    break;
                default:
                    break;
            }
        });
        this.musicControls.listen(); // activates the observable above
    };
    RadioService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__["a" /* MusicControls */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_6__providers_network_network__["b" /* NetworkProvider */], __WEBPACK_IMPORTED_MODULE_4__api_services__["a" /* ApiService */]])
    ], RadioService);
    return RadioService;
}());

//# sourceMappingURL=radio-service.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiService = /** @class */ (function () {
    function ApiService(service, http) {
        this.service = service;
        this.http = http;
        this.url = "https://max1023.fm";
        this.categoryUrl = this.url + "/wp-json/wp/v2/posts?categories=1";
        this.scheduleUrl = this.url + "/wp-json/wp/v2/schedule?_embed&per_page=100";
        this.postUrl = this.url + "/api/core/get_recent_posts/?page=1";
        this.scheduleData = [];
        this.scheduleDataCache = {};
        this.postData = {};
        this.changeBGImage = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        var date = new Date();
        date.setMinutes(date.getTimezoneOffset() + date.getMinutes() + 60); // convert to UTC+1
        this.day = this.getToday(date.getDay());
        this.getCurrentSchedule();
    }
    ApiService.prototype.emitChange = function (data) {
        this.changeBGImage.next(data);
    };
    ApiService.prototype.getAppVersion = function () {
        return this.http.get("https://tvcdashboard.com/app/getappversion.php?appname=maxfm");
    };
    ApiService.prototype.changeJsonUrl = function (url) {
        this.url = url;
        this.categoryUrl = this.url + "/wp-json/wp/v2/posts?categories=1";
        this.scheduleUrl = this.url + "/wp-json/wp/v2/schedule?_embed&per_page=100";
        this.postUrl = this.url + "/api/core/get_recent_posts/?page=1";
        this.getCurrentSchedule();
    };
    ApiService.prototype.getCategoryData = function () {
        return this.http.get(this.categoryUrl);
    };
    ApiService.prototype.getScheduleData = function () {
        return this.http.get(this.scheduleUrl);
    };
    ApiService.prototype.getPostData = function () {
        var _this = this;
        this.postData = {};
        this.http.get(this.postUrl).subscribe(function (data) {
            _this.postData = data.json();
        });
    };
    ApiService.prototype.getCurrentSchedule = function () {
        var _this = this;
        this.scheduleData = [];
        // console.log("old schedule", this.scheduleUrl, this.scheduleDataCache[this.scheduleUrl]);
        var ago = new Date();
        ago.setHours(ago.getHours() - 1);
        if (this.scheduleDataCache[this.scheduleUrl] && this.scheduleDataCache[this.scheduleUrl].stored > ago) {
            this.processScheduleData(this.scheduleDataCache[this.scheduleUrl].data);
        }
        else {
            this.getScheduleData().subscribe(function (data) {
                var schedule = JSON.parse(data._body);
                _this.scheduleDataCache[_this.scheduleUrl] = { data: schedule, stored: (new Date()) };
                _this.processScheduleData(schedule);
            });
        }
    };
    ApiService.prototype.processScheduleData = function (sch) {
        var _this = this;
        console.log("Schedule Data", this.day, sch);
        if (!(sch instanceof Array)) {
            return;
        }
        sch.forEach(function (value) {
            if (value.day_of_show instanceof Array) {
                value.day_of_show.forEach(function (day) {
                    if (_this.day == day) {
                        var scheduleData = {};
                        scheduleData.start_time = value.start_time;
                        scheduleData.end_time = value.end_time;
                        scheduleData.title = value.title.rendered;
                        scheduleData.presenter_image = value.presenter_image.guid;
                        scheduleData.presenters_name = value.presenters_name;
                        scheduleData.about_show = value.about_show;
                        scheduleData.songUrl = value.podcast_listen;
                        scheduleData.day = day;
                        _this.scheduleData.push(scheduleData);
                    }
                });
            }
            else {
                if (_this.day == value.day_of_show) {
                    var scheduleData = {};
                    scheduleData.start_time = value.start_time;
                    scheduleData.end_time = value.end_time;
                    scheduleData.title = value.title.rendered;
                    scheduleData.presenter_image = value.presenter_image.guid;
                    scheduleData.presenters_name = value.presenters_name;
                    scheduleData.about_show = value.about_show;
                    scheduleData.songUrl = value.podcast_listen;
                    scheduleData.day = value.day_of_show;
                    _this.scheduleData.push(scheduleData);
                }
            }
        });
        this.scheduleData = this.scheduleData.sort(this.compare);
        console.log("Schedule Data ", this.scheduleData);
        this.currentRunningSchedule();
        this.emitChange({
            onAirNow: 'ON AIR NOW',
            img: this.scheduleData[0].presenter_image,
            name: this.scheduleData[0].presenters_name,
            song: this.scheduleData[0].title
        });
    };
    ApiService.prototype.getFeturedPhoto = function () {
        var _this = this;
        this.feturedPhoto = undefined;
        this.service.getFetured().then(function (results) {
            var data = results;
            var d = [];
            var i = 0;
            var flag = true;
            var b_flag = true;
            data.posts.forEach(function (a) {
                if (flag) {
                    b_flag = true;
                    a.attachments.forEach(function (b) {
                        if (b_flag) {
                            d.push({ date: a.date, image: b.url, url: a.url, title: a.title, content: a.content });
                            b_flag = false;
                            return;
                        }
                    });
                    i++;
                }
                if (i == 5) {
                    flag = false;
                    return;
                }
            });
            _this.feturedPhoto = d;
            console.log('getFeturedPhoto', results);
        });
    };
    ApiService.prototype.compare = function (a, b) {
        if (a.start_time < b.start_time)
            return -1;
        if (a.start_time > b.start_time)
            return 1;
        return 0;
    };
    ApiService.prototype.getToday = function (i) {
        var day = "";
        if (i == 0) {
            day = 'Sunday';
        }
        else if (i == 1) {
            day = 'Monday';
        }
        else if (i == 2) {
            day = 'Tuesday';
        }
        else if (i == 3) {
            day = 'Wednesday';
        }
        else if (i == 4) {
            day = 'Thursday';
        }
        else if (i == 5) {
            day = 'Friday';
        }
        else {
            day = 'Saturday';
        }
        return day;
    };
    ApiService.prototype.currentRunningSchedule = function () {
        var _this = this;
        var date = new Date();
        date.setMinutes(date.getTimezoneOffset() + date.getMinutes() + 60); // convert to UTC+1
        // console.log("currentRunningSchedule", date, this.scheduleData, date.getHours());
        var hour = date.getHours();
        var count = 0;
        var notFound = true;
        this.scheduleData.forEach(function (value) {
            var time1 = parseInt(value.start_time.split(":")[0]);
            var time2 = parseInt(value.end_time.split(":")[0]);
            if (time1 <= hour && time2 > hour) {
                // console.log("Current Date", value)
                notFound = true;
                _this.rotateCalendar(count);
            }
            count++;
        });
        if (notFound && this.scheduleData) {
            var len = this.scheduleData.length;
            // check if current hour programm is started yesterday
            var endTime = parseInt(this.scheduleData[0].end_time.split(":")[0]);
            if (hour < endTime) {
                this.rotateCalendar(0);
            }
            else if (len > 1) {
                // check if current hour programm will end tomorrow 
                var startTime = parseInt(this.scheduleData[len - 1].start_time.split(":")[0]);
                if (hour >= startTime) {
                    this.rotateCalendar(len - 1);
                }
            }
        }
    };
    ApiService.prototype.rotateCalendar = function (position) {
        //console.log(position)
        this.scheduleData = this.scheduleData.concat(this.scheduleData.splice(0, position));
        //console.log(this.scheduleData);   return cal;
        if (this.scheduleData[0].hasOwnProperty('presenter_image')) {
            this.emitChange({
                onAirNow: 'ON AIR NOW',
                img: this.scheduleData[0].presenter_image,
                name: this.scheduleData[0].presenters_name,
                song: this.scheduleData[0].title
            });
        }
        return;
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=api-services.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(450);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_news_news__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_media__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_radio_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_pipes_module__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_music_controls__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_capitalstation_capitalstation__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_popover1_popover1__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_popover_popover__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_competition_competition__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_contactPR_contactPR__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_premiumrate_premiumrate__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_privacy_privacy__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_providefeedback_providefeedback__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_thirdparty_thirdparty__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_terms_terms__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_opinionLagos_opinionLagos__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_opinionAbuja_opinionAbuja__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_network_error_network_error__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ionic_image_loader__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_network_network__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_market__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_app_version__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_deeplinks__ = __webpack_require__(408);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























// import { Services } from "@angular/core/src/view";






















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["b" /* ShowInfoPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_news_news__["b" /* ShowModelPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_capitalstation_capitalstation__["a" /* CapitalstationPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_popover_popover__["a" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_popover1_popover1__["a" /* Popover1Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_competition_competition__["a" /* CompetitionPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_contactPR_contactPR__["a" /* ContactPRPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_premiumrate_premiumrate__["a" /* PremiumRatePage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_providefeedback_providefeedback__["a" /* ProvideFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_thirdparty_thirdparty__["a" /* ThirdPartyPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_opinionLagos_opinionLagos__["a" /* OpinionLagosPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_opinionAbuja_opinionAbuja__["a" /* OpinionAbujaPage */], __WEBPACK_IMPORTED_MODULE_40__pages_network_error_network_error__["a" /* NetworkErrorPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_21__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_19__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_41_ionic_image_loader__["b" /* IonicImageLoader */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_3__app_component__["b" /* ShowInfoPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_news_news__["b" /* ShowModelPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_capitalstation_capitalstation__["a" /* CapitalstationPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_popover1_popover1__["a" /* Popover1Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_competition_competition__["a" /* CompetitionPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_contactPR_contactPR__["a" /* ContactPRPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_premiumrate_premiumrate__["a" /* PremiumRatePage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_providefeedback_providefeedback__["a" /* ProvideFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_thirdparty_thirdparty__["a" /* ThirdPartyPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_opinionLagos_opinionLagos__["a" /* OpinionLagosPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_opinionAbuja_opinionAbuja__["a" /* OpinionAbujaPage */], __WEBPACK_IMPORTED_MODULE_40__pages_network_error_network_error__["a" /* NetworkErrorPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_market__["a" /* Market */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_deeplinks__["a" /* Deeplinks */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_12__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_18__services_radio_service__["a" /* RadioService */], __WEBPACK_IMPORTED_MODULE_20__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_23__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_24__ionic_native_music_controls__["a" /* MusicControls */], __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_42__providers_network_network__["b" /* NetworkProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_music_controls__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';




/*import {media} from "@ionic-native/media";*/

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServicesProvider = /** @class */ (function () {
    function ServicesProvider(http, musicControls) {
        this.http = http;
        this.musicControls = musicControls;
        this.url = '';
        this.url = 'https://max1023.fm';
        console.log('Hello ServicesProvider Provider');
    }
    ServicesProvider.prototype.getCategoryPost = function (id, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_category_posts/?' + 'id=' + id + '&page=' + page)
                .subscribe(function (data) {
                _this.categoryPost = data;
                resolve(_this.categoryPost);
            });
        });
    };
    ServicesProvider.prototype.getRecentPosts = function (page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_recent_posts/?' + 'page=' + page + '&count=20').map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.businessPost = data;
                resolve(_this.businessPost);
            });
        });
    };
    ServicesProvider.prototype.getTopPosts = function (page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_tag_posts/?' + 'page=' + page + '&slug=top-story&count=20').map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.topStories = data;
                resolve(_this.topStories);
            });
        });
    };
    ServicesProvider.prototype.getRelatedPosts = function (id, page) {
        var _this = this;
        var pageStr = (page) ? '&page=' + page : "";
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_category_posts/?' + 'id=' + id + pageStr).map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.relatedPosts = data;
                resolve(_this.relatedPosts);
            });
        });
    };
    ServicesProvider.prototype.getCategory = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_category_index/').map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getFetured = function () {
        var _this = this;
        console.log("getFetured");
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/?json=get_tag_posts&tag_slug=featured').map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getPosts = function (slug) {
        var _this = this;
        console.log(slug);
        console.log("************************************************************************");
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_category_posts/?1=&slug=' + slug).map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // With pagination
    ServicesProvider.prototype.getPaginationPosts = function (slug, page) {
        var _this = this;
        console.log("/api/core/get_category_posts/?page=" + page + "=&slug=" + slug);
        console.log("************************************************************************");
        return new Promise(function (resolve) {
            _this.http.get(_this.url + ("/api/core/get_category_posts/?page=" + page + "=&slug=" + slug)).map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getSlider = function () {
        var _this = this;
        console.log("getSlider");
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/?json=get_tag_posts&tag_slug=photos').map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getPost = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_post/?' + 'id=' + id).map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getModelPost = function (postID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/api/core/get_post/?id=' + postID).map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider.prototype.getRegionData = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/wp-json/wp/v2/region').map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    ServicesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_music_controls__["a" /* MusicControls */]])
    ], ServicesProvider);
    return ServicesProvider;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ShowInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_news_news__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_about_about__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_radio_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_capitalstation_capitalstation__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_in_app_browser__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_popover1_popover1__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_opinionAbuja_opinionAbuja__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_opinionLagos_opinionLagos__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_network_error_network_error__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_market__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_version__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic_image_loader__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_network_network__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_deeplinks__ = __webpack_require__(408);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















// Proverders




var MyApp = /** @class */ (function () {
    function MyApp(deeplinks, alertCtrl, market, appVersion, platform, statusBar, splashScreen, imageLoaderConfig, service, oneSignal, networkStatus, push, inApp, menuCtrl, radioService, popoverCtrl, apiService, modalCtrl, apiServices) {
        var _this = this;
        this.deeplinks = deeplinks;
        this.alertCtrl = alertCtrl;
        this.market = market;
        this.appVersion = appVersion;
        this.platform = platform;
        this.service = service;
        this.oneSignal = oneSignal;
        this.networkStatus = networkStatus;
        this.push = push;
        this.inApp = inApp;
        this.menuCtrl = menuCtrl;
        this.radioService = radioService;
        this.popoverCtrl = popoverCtrl;
        this.apiService = apiService;
        this.modalCtrl = modalCtrl;
        this.apiServices = apiServices;
        this.contactpage = __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.homePage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.newspage = __WEBPACK_IMPORTED_MODULE_6__pages_news_news__["a" /* NewsPage */];
        this.aboutpage = __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */];
        this.settingspage = __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */];
        this.capitalstation = __WEBPACK_IMPORTED_MODULE_13__pages_capitalstation_capitalstation__["a" /* CapitalstationPage */];
        this.buttonColor = '#122851';
        this.pageName = 'HomePage';
        this.regions = [];
        this.lo_fi = false;
        this.iconMenu = {
            theme: 'ios',
            type: 'hamburger'
        };
        if (platform.is('ios')
            || platform.is('android')
            || platform.is('windows')) {
            // enableProdMode();
        }
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // this.initPush()
            statusBar.styleDefault();
            splashScreen.hide();
            _this.versionapp();
            _this.initializeApp();
            imageLoaderConfig.enableSpinner(true);
            imageLoaderConfig.setFallbackUrl('assets/imgs/placeholder.png');
            // initialize push
            if (platform.is('cordova')) {
                console.log("cdon");
                _this.oneSignal.getTags().then(function (value) {
                    console.log('Tags Received: ' + JSON.stringify(value));
                });
                _this.oneSignal.startInit('fa0b792d-4385-4a7c-87d7-5e3bd27c0942', '420453837526');
                _this.oneSignal.inFocusDisplaying(_this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                _this.oneSignal.handleNotificationReceived().subscribe(function () {
                    // do something when notification is received
                });
                _this.oneSignal.handleNotificationOpened().subscribe(function () {
                    // do something when a notification is opened
                });
                _this.oneSignal.addSubscriptionObserver().subscribe(function (response) {
                    console.log("user subscription", response);
                    // this.storageService.setPushSubscribed(response.to.subscribed);
                });
                _this.oneSignal.endInit();
                _this.oneSignal.getIds().then(function (res) {
                    console.log(res);
                });
            }
            _this.deeplinks.routeWithNavController(_this.nav, {
                '/items/:itemId': __WEBPACK_IMPORTED_MODULE_6__pages_news_news__["b" /* ShowModelPage */]
            }).subscribe(function (match) {
                console.log('Successfully routed', match);
            }, function (nomatch) {
                console.log('Unmatched Route', nomatch);
            });
        });
        this.getRegion();
        radioService.onRegionChange.subscribe(function () {
            _this.changeRegion();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        /* Check networkStatus */
        this.networkStatus.initializeNetworkEvents();
        this.networkStatus.getNetworkStatus().subscribe(function (status) {
            console.log('network status ==> ', (status == __WEBPACK_IMPORTED_MODULE_23__providers_network_network__["a" /* ConnectionStatus */].Offline));
            if (status == __WEBPACK_IMPORTED_MODULE_23__providers_network_network__["a" /* ConnectionStatus */].Offline) {
                var network = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_18__pages_network_error_network_error__["a" /* NetworkErrorPage */], null, { enableBackdropDismiss: false });
                network.present();
            }
            else {
                _this.radioService.playResume();
            }
        });
    };
    MyApp.prototype.presentPopover = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_15__pages_popover1_popover1__["a" /* Popover1Page */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function () {
            // Navigate to new page.  Popover should be gone at this point completely
            //this.viewCtrl.dismiss();
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
            _this.menuCtrl.close();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        this.nav.setRoot(page).then(function () {
            _this.pageName = _this.nav.getActive().name;
        });
    };
    MyApp.prototype.openWebView = function () {
        if (this.radioService.radioOptions.region == 'Lagos') {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_17__pages_opinionLagos_opinionLagos__["a" /* OpinionLagosPage */]);
        }
        else {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_16__pages_opinionAbuja_opinionAbuja__["a" /* OpinionAbujaPage */]);
        }
    };
    MyApp.prototype.initPush = function () {
        // to check if we have permission
        this.push.hasPermission()
            .then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We do not have permission to send push notifications');
            }
        });
        // to initialize push notifications
        var options = {
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) { return console.log('Received a notification', notification); });
        pushObject.on('registration').subscribe(function (registration) { return console.log('Device registered', registration); });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    MyApp.prototype.addEvent = function (id) {
        document.getElementById('1').style.backgroundColor = 'transparent';
        document.getElementById('2').style.backgroundColor = 'transparent';
        document.getElementById('3').style.backgroundColor = 'transparent';
        document.getElementById('4').style.backgroundColor = 'transparent';
        document.getElementById(id).style.backgroundColor = '#fe332d';
    };
    MyApp.prototype.openModel = function () {
        // let customModal = this.modalCtrl.create(ShowInfoPage, {},{showBackdrop: true, enableBackdropDismiss: true});
        // customModal.present();
    };
    MyApp.prototype.changeLowStreaming = function () {
        console.log("MyApp::changeLowStreaming", this.lo_fi);
        if (this.lo_fi) {
            console.log(this.radioService.lowFiUrl + "stream");
            this.radioService.radioOptions.datasaver = true;
            if (this.radioService.isPlaying) {
                this.radioService.stopAudio();
                this.radioService.file.src = this.radioService.lowFiUrl + "stream";
                this.radioService.playAudio(true);
            }
            else {
                this.radioService.file.src = this.radioService.lowFiUrl + "stream";
            }
        }
        else {
            this.radioService.radioOptions.datasaver = false;
            console.log(this.radioService.url + "stream");
            if (this.radioService.isPlaying) {
                this.radioService.stopAudio();
                this.radioService.file.src = this.radioService.url + "stream";
                this.radioService.playAudio(true);
            }
            else {
                this.radioService.file.src = this.radioService.url + "stream";
            }
        }
    };
    MyApp.prototype.getRegion = function () {
        var _this = this;
        this.service.getRegionData().then(function (results) {
            if (results instanceof Array) {
                _this.regions = results;
            }
            console.log("getRegionData", (results instanceof Array), results);
        });
    };
    MyApp.prototype.changeRegion = function () {
        console.log("HomePage::changeRegion", this.radioService.radioOptions.region, this.regions);
        var regionData;
        var datasaver_strem_link = "";
        var region = this.radioService.radioOptions.region;
        for (var i = 0; i < this.regions.length; i++) {
            if (this.regions[i].region_name.toLowerCase() == region.toLowerCase()) {
                if (i == this.regions.length - 1) {
                    regionData = this.regions[0];
                }
                else {
                    regionData = this.regions[i + 1];
                }
            }
        }
        for (var i = 0; i < this.radioService.lowFiUrls.length; i++) {
            if (this.radioService.lowFiUrls[i].region_name.toLowerCase() == region.toLowerCase()) {
                if (i == this.radioService.lowFiUrls.length - 1) {
                    datasaver_strem_link = this.radioService.lowFiUrls[0].region_strem_link;
                }
                else {
                    datasaver_strem_link = this.radioService.lowFiUrls[i + 1].region_strem_link;
                }
            }
        }
        if (!regionData) {
            return;
        }
        var json_url = regionData.json_url;
        var lastSlash = json_url.lastIndexOf('/');
        var region_strem_link = '';
        // let region_standard_stream_link = '';
        if (lastSlash == json_url.length - 1) {
            json_url = regionData.json_url.substr(0, lastSlash);
        }
        var audioUrl = regionData.region_stream_link.split('/');
        if (audioUrl[audioUrl.length - 1] == 'stream') {
            region_strem_link = regionData.region_stream_link.substr(0, regionData.region_stream_link.lastIndexOf('/') + 1);
        }
        // let lofiUrl = 
        // regionData.region_standard_stream_link.split('/');  
        // if(audioUrl[audioUrl.length -1] == 'stream'){
        //   region_standard_stream_link = regionData.region_standard_stream_link.substr(0, regionData.region_standard_stream_link.lastIndexOf('/')+1);
        // } 
        // console.log("region link: ", region_strem_link);
        // console.log("json_url : ", json_url);
        this.apiServices.url = json_url;
        this.service.url = json_url;
        this.apiServices.changeJsonUrl(json_url);
        this.apiServices.getPostData();
        this.apiServices.getFeturedPhoto();
        this.radioService.url = region_strem_link;
        this.radioService.lowFiUrl = datasaver_strem_link;
        this.radioService.radioOptions.region = regionData.region_name;
        console.log("dataSaver is it: ", this.radioService.radioOptions.datasaver);
        if (this.radioService.isPlaying) {
            this.radioService.stopAudio();
            if (this.radioService.radioOptions.datasaver) {
                this.radioService.file.src = datasaver_strem_link + "stream";
            }
            else {
                this.radioService.file.src = region_strem_link + "stream";
            }
            this.radioService.playAudio(true);
        }
        else {
            if (this.radioService.radioOptions.datasaver) {
                this.radioService.file.src = datasaver_strem_link + "stream";
            }
            else {
                this.radioService.file.src = region_strem_link + "stream";
            }
        }
        this.radioService.getStreamInfo(region_strem_link);
    };
    MyApp.prototype.showAlert = function (type) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Update Available',
            message: 'Please upgrade to the latest version to get the best app experience',
            buttons: [
                {
                    text: 'No, thanks',
                    role: 'cancel'
                },
                {
                    text: 'Yes, Update for me',
                    handler: function () {
                        if (type) {
                            _this.market.open("id1421225542");
                        }
                        else {
                            _this.market.open("com.app.thrilliantnigeriamaxfmng");
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.versionapp = function () {
        var _this = this;
        this.apiService.getAppVersion().map(function (res) { return res.json(); }).subscribe(function (res) {
            var dt = res;
            if (_this.platform.is("android")) {
                _this.appVersion.getVersionCode().then(function (version) {
                    if (version != dt["android"]) {
                        _this.showAlert(false);
                    }
                });
            }
            else {
                _this.appVersion.getVersionCode().then(function (version) {
                    if (version != dt["ios"]) {
                        _this.showAlert(true);
                    }
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\app\app.html"*/'<ion-menu type="overlay" [content]="content">\n  <ion-header>\n  \n    <ion-navbar>\n      <button ion-button menuToggle icon-only>\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n      <ion-title style="text-align: center; color: white">MAX FM</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n    <div class="max-menu max-menu-open" style="background-color: #870a04">\n      <div class="overlay"></div>\n      <div *ngIf="radioService.isPlaying" class="bg" [ngStyle]="{\'background-image\': \'url(\'+radioService.radioOptions.albumArt+\')\'}"></div>\n      <div *ngIf="!radioService.isPlaying" class="bg" [ngStyle]="{\'background-image\': \'url(\'+apiService.scheduleData[0]?.presenter_image+\')\'}"></div>\n      <ul>\n        <ion-item menuClose (click)="openPage(homePage)" style="background-color: transparent; color: #e7e7e7 !important;" no-lines>\n           <a>\n            <div class="menu-link" style="color:#f0f2f4">\n              <img src="assets/img/mic.png" class="img1">\n              <span class="text"> Listen Live </span>\n              <small *ngIf="!radioService.schedulePlaying" [innerHtml]="\'<span>\' + this.radioService.radioOptions.song +\'<br>\'+ radioService.radioOptions.name +\'</span>\'"></small>\n                  <small *ngIf="radioService.schedulePlaying" [innerHtml]="\'<span>\' + radioService.showData.title + \'<br>\' + radioService.showData.startTime | dateConvertor : \'time\' + \' \' + radioService.showData.endTime | dateConvertor : \'time\' +\'</span>\'">\n              </small>\n          </div>\n        </a>\n      </ion-item>\n\n      <ion-grid>\n        <ion-row class="regions">\n          <ion-item no-lines (click)="changeRegion()">\n            Change Region: <b>{{radioService.radioOptions.region}}</b>\n          </ion-item>\n          <!-- <ion-col>\n            <ion-item no-lines>\n              <ion-label>Lagos</ion-label>\n              <ion-radio value="Lagos" menuClose [checked]="radioService.radioOptions.region == \'Lagos\'" (ionSelect)="changeRegion(\'Lagos\')"></ion-radio>\n              </ion-item>\n          </ion-col>\n          <ion-col>\n            <ion-item no-lines>\n              <ion-label>Abuja</ion-label>\n              <ion-radio value="Abuja" menuClose [checked]="radioService.radioOptions.region == \'Abuja\'" (ionSelect)="changeRegion(\'Abuja\')"></ion-radio>\n            </ion-item>\n          </ion-col> -->\n        </ion-row>\n      </ion-grid>\n\n\n        <!-- <li (click)="presentPopover()"> <a > <span><img src="assets/img/mic.png"></span>\n                <div class="menu-link">Listen Live</div>\n               <small *ngIf="!radioService.schedulePlaying">{{this.data.song}}<br>{{data.name}}</small>\n                  <small *ngIf="radioService.schedulePlaying">{{radioService.showData.title}}<br>\n                    {{radioService.showData.startTime | dateConvertor : \'time\'}} {{radioService.showData.endTime | dateConvertor : \'time\'}}\n                  </small>\n              </a> </li> -->\n\n        <li menuClose (click)="openPage(aboutpage)" class="{{pageName==\'AboutPage\' ?\'active\':\'no-class\'}}">\n          <a>\n            <span>\n              <img src="assets/img/schedule.png">\n            </span>\n            <div class="menu-link">Schedule & Listen Again</div>\n          </a>\n        </li>\n\n        <li menuClose (click)="openPage(newspage)" class="{{pageName==\'NewsPage\' ?\'active\':\'no-class\'}}">\n          <a>\n            <span>\n              <img src="assets/img/pic.png">\n            </span>\n            <div class="menu-link">News, PIctures + Videos</div>\n          </a>\n        </li>\n\n        <li menuClose (click)="openWebView()">\n          <a>\n            <span class="vote-img">\n              <img src="assets/img/vote.png">\n            </span>\n            <div class="menu-link">Comment on the Show</div>\n          </a>\n        </li>\n\n        <li menuClose (click)="openPage(settingspage)" class="{{pageName==\'SettingsPage\'?\'active\':\'no-class\'}}">\n          <a href="#">\n            <span>\n              <img src="assets/img/setting.png">\n            </span>\n            <div class="menu-link">Settings</div>\n          </a>\n        </li>\n      </ul>\n\n      <ion-grid class="lo-fi-toggle">\n        <ion-row>\n          <ion-item no-lines>\n            <ion-label>Datasaver</ion-label>\n            <ion-toggle [(ngModel)]="lo_fi" (ionChange)="changeLowStreaming()"></ion-toggle>\n          </ion-item>\n\n        </ion-row>\n      </ion-grid>\n\n\n      <!-- <div class="lo-fi-toggle">\n        <div class="lo-fi-toggle-text">Datasaver</div>\n        <span>\n          <ion-toggle [(ngModel)]="lo_fi" (ionChange)="changeLowStreaming()"></ion-toggle>\n        </span>\n      </div> -->\n    </div>\n\n    <!-- <button menuClose ion-item padding (click)="openPage(homePage)"  class="{{pageName==\'home\'?\'active\':\'no-class\'}}" style="background-color: transparent;color: white; font-size: 18px;margin-top: 5%">\n         <img src="assets/img/mic.png" style="width: 30px; float: left"> <p style="float: left; margin-left: 20px">Listen Live</p> <br><p style="margin-bottom: 5%;margin-left: 20px; font-size: 12px;float: left"> Hello- Adele</p></button>\n\n       <button menuClose ion-item padding (click)="openPage(aboutpage)" class="{{pageName==\'schedule\'?\'active\':\'no-class\'}}" style="background-color: transparent;color: white; font-size: 18px;margin-top: 5%">\n         <img src="assets/img/schedule.png" style="width: 30px; float: left">\n         <p style="float: left; margin-left: 20px">Schedule & Listen Again</p></button>\n\n       <button menuClose ion-item padding (click)="openPage(newspage)" class="{{pageName==\'articles\'?\'active\':\'no-class\'}}" style="background-color: transparent;color: white; font-size: 18px;margin-top: 5%">\n         <img src="assets/img/pic.png" style="width: 30px; float: left">\n         <p style="float: left; margin-left: 20px"> News, PIctures + Videos </p> </button>\n <br>\n       <button menuClose ion-item padding class="{{pageName==\'setting\'?\'active\':\'no-class\'}}" style="background-color: transparent;color: white; font-size: 18px">\n         <img src="assets/img/setting.png" style="width: 30px; float: left">\n         <p style="float: left; margin-left: 20px"> Settings </p></button>-->\n\n\n\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<ion-footer style="width:100%">\n  <div class="max-video-upcomming-list audio">\n    <i></i>\n    <a class="max-video-upcomming-playbtn">\n      <img src="assets/img/play-up-btn.png" class="playBtn" style="height: 40px; width: 45px;margin-top: 20px" *ngIf="!radioService.isPlaying" (click)="radioService.playAudio(true)" />\n      <img src="assets/img/stopBtn.jpg" class="playStop" style="height: 40px; width: 45px;margin-top: 20px" *ngIf="radioService.isPlaying" (click)="radioService.stopAudio()" />\n    </a>\n    <div class="max-video-upcomming-list-wrapper" (click)="openModel()">\n      <div class="max-video-upcomming-list-img">\n        <img src="assets/img/mic.png" /> </div>\n      <div class="max-video-upcomming-list-detail">\n        <h2 *ngIf="!radioService.schedulePlaying && radioService.coverArtAnimation" [innerHtml]="radioService.radioOptions.song"></h2>\n        <h2 *ngIf="!radioService.coverArtAnimation" [innerHtml]="apiServices.scheduleData[0]?.title"></h2>\n        <br>\n        <span *ngIf="radioService.coverArtAnimation" [innerHtml]="radioService.radioOptions.name"></span>\n        <span *ngIf="!radioService.coverArtAnimation" [innerHtml]="apiServices.scheduleData[0]?.presenters_name"></span>\n        <h2 *ngIf="radioService.schedulePlaying" [innerHtml]="radioService.showData.title"></h2>\n        <span *ngIf="radioService.schedulePlaying">{{radioService.showData.startTime | dateConvertor : \'time\'}} - {{radioService.showData.endTime | dateConvertor :\n          \'time\'}}</span>\n      </div>\n    </div>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_24__ionic_native_deeplinks__["a" /* Deeplinks */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_19__ionic_native_market__["a" /* Market */], __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_22_ionic_image_loader__["a" /* ImageLoaderConfig */],
            __WEBPACK_IMPORTED_MODULE_21__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_23__providers_network_network__["b" /* NetworkProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_9__services_radio_service__["a" /* RadioService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_10__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__services_api_services__["a" /* ApiService */]])
    ], MyApp);
    return MyApp;
}());

var ShowInfoPage = /** @class */ (function () {
    function ShowInfoPage(viewCtrl, apiServices, radioService) {
        this.viewCtrl = viewCtrl;
        this.apiServices = apiServices;
        this.radioService = radioService;
        this.schedules = [];
        this.showTitle = '';
        this.startTime = '';
        this.endTime = '';
    }
    ShowInfoPage.prototype.ionViewDidLoad = function () {
        console.log(1234);
        // this.schedules=this.apiServices.scheduleData;
        console.log(this.schedules);
    };
    ShowInfoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ShowInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-showInfo',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\app\showInfo.html"*/'<div style="height: 370px;width: 100%;position: absolute;top: calc(100% - 370px);">\n  <ion-header>\n    <ion-navbar>\n      <ion-title>\n        <div class="max-video-upcomming-list audio">\n          <i></i>\n          <a class="max-video-upcomming-playbtn">\n            <img src="assets/img/play-up-btn.png" class="playBtn" *ngIf="!radioService.isPlaying" style="height: 40px; width: 45px;margin-top: -24px" (click)="radioService.playAudio(true)"/>\n            <img src="assets/img/stopBtn.jpg" class="playStop" *ngIf="radioService.isPlaying" style="height: 40px; width: 45px;margin-top: -24px" (click)="radioService.stopAudio()"/>\n          </a>\n          <div class="max-video-upcomming-list-wrapper" (click)="dismiss()" style="margin-top: -24px">\n            <div class="max-video-upcomming-list-img"> <img src="assets/img/mic.png" /> </div>\n            <div class="max-video-upcomming-list-detail">\n              <h2 *ngIf="!radioService.schedulePlaying" [innerHtml]="radioService.radioOptions.song"></h2>\n              <h2 *ngIf="radioService.schedulePlaying" [innerHtml]="radioService.showData.title"></h2>\n              <span *ngIf="radioService.schedulePlaying">{{radioService.showData.startTime | dateConvertor : \'time\'}} {{radioService.showData.endTime | dateConvertor : \'time\'}}</span> </div>\n          </div>\n        </div>\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n    <ion-slides>\n      <ion-slide  *ngFor="let item of schedules | slice:1" [style.backgroundImage]="item.presenter_image ? \'url(\'+ item.presenter_image +\')\' : \'url(assets/img/dummyImage.jpg)\'" style="background-size: 55% 100%;background-position: 100%;background-repeat: no-repeat">\n        <div class="bsSliderCaption"> <span class="bsday">Later Today</span>\n          <h2>{{item.title}}</h2>\n          <span class="bstime">{{item.start_time | dateConvertor : \'time\'}} - {{item.end_time | dateConvertor : \'time\'}}</span>\n        </div>\n        <ion-footer *ngIf="item.songUrl">\n          <button ion-button full (click)="radioService.playSchedule(item.songUrl,item.start_time,item.end_time,item.title)">Listen Again</button>\n        </ion-footer>\n      </ion-slide>\n    </ion-slides>\n  </ion-content>\n\n</div>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\app\showInfo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_10__services_api_services__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_9__services_radio_service__["a" /* RadioService */]])
    ], ShowInfoPage);
    return ShowInfoPage;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home" tabsHideOnSubPages="true"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_convertor_date_convertor__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__date_convertor_calander__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keys__ = __webpack_require__(878);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__date_convertor_date_convertor__["a" /* DateConvertorPipe */], __WEBPACK_IMPORTED_MODULE_2__date_convertor_calander__["a" /* CalanderConvertorPipe */], __WEBPACK_IMPORTED_MODULE_3__keys__["a" /* KeysPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__date_convertor_date_convertor__["a" /* DateConvertorPipe */], __WEBPACK_IMPORTED_MODULE_2__date_convertor_calander__["a" /* CalanderConvertorPipe */], __WEBPACK_IMPORTED_MODULE_3__keys__["a" /* KeysPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateConvertorPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the DateConvertorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var DateConvertorPipe = /** @class */ (function () {
    function DateConvertorPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    DateConvertorPipe.prototype.transform = function (dateTime, args) {
        var value = dateTime.replace(/\s/g, "T") + "Z";
        // console.log("dateConvertor", dateTime);
        if (!args) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_date_fns__["format"])(new Date(value), 'MMM DD,YYYY');
        }
        if (args == "HOURS") {
            var d = new Date();
            var d1 = new Date(Date.parse(value));
            // console.log("date", value, d, d1);
            return this.timeConversion(d - d1);
        }
        if (args == "DAY") {
            return Object(__WEBPACK_IMPORTED_MODULE_1_date_fns__["format"])(new Date(value), 'MMM DD') + " at " + Object(__WEBPACK_IMPORTED_MODULE_1_date_fns__["format"])(new Date(value), 'hh:mm a');
        }
        if (args == 'time') {
            var timeString = value;
            var hourEnd = timeString.indexOf(":");
            var H = +timeString.substr(0, hourEnd);
            var h = H % 12 || 12;
            var ampm = H < 12 ? "AM" : "PM";
            timeString = h + timeString.substr(hourEnd, 3) + ampm;
            return timeString;
        }
    };
    DateConvertorPipe.prototype.timeConversion = function (millisec) {
        if (millisec < 0) {
            millisec = -1 * millisec;
        }
        var seconds = parseInt((millisec / 1000).toFixed(1));
        var minutes = parseInt((millisec / (1000 * 60)).toFixed(1));
        var hours = parseInt((millisec / (1000 * 60 * 60)).toFixed(1));
        var days = parseInt((millisec / (1000 * 60 * 60 * 24)).toFixed(1));
        if (seconds < 60) {
            return seconds + " Sec";
        }
        else if (minutes < 60) {
            return minutes + " Min";
        }
        else if (hours < 24) {
            return hours + " Hrs";
        }
        else {
            return days + " Days";
        }
    };
    DateConvertorPipe.prototype.ordinal_suffix_of = function (i) {
        var j = i % 10, k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    };
    DateConvertorPipe.prototype.getNameOfDay = function (day) {
        switch (day) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
        }
    };
    DateConvertorPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'dateConvertor',
        })
    ], DateConvertorPipe);
    return DateConvertorPipe;
}());

//# sourceMappingURL=date-convertor.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalanderConvertorPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns__);
/**
 * Created by ankittater on 28/03/18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the DateConvertorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var CalanderConvertorPipe = /** @class */ (function () {
    function CalanderConvertorPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    CalanderConvertorPipe.prototype.transform = function (value, args) {
        if (!args) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_date_fns__["format"])(value, 'MMM DD,YYYY');
        }
        if (args == "DAY") {
            return this.getNameOfDay(value.getDay());
        }
        if (args == "DATE") {
            return this.ordinal_suffix_of(value.getDate());
        }
    };
    CalanderConvertorPipe.prototype.ordinal_suffix_of = function (i) {
        var j = i % 10, k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    };
    CalanderConvertorPipe.prototype.getNameOfDay = function (day) {
        switch (day) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
            default:
                return "";
        }
    };
    CalanderConvertorPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'calanderConvertor',
        })
    ], CalanderConvertorPipe);
    return CalanderConvertorPipe;
}());

//# sourceMappingURL=calander.js.map

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
  Generated class for the Pipe pipe.
*/
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        // current time
        var now = new Date().getTime();
        var time = new Date(value.replace(/\s/, 'T')).getTime();
        // time since message was sent in seconds
        var seconds = Math.floor((now - time) / 1000);
        //let interval = Math.floor(seconds / 31536000);
        // format string
        if (seconds < 60) {
            return 'just now';
        }
        else if (seconds < 120) {
            return Math.floor(seconds / 60) + ' minute ago';
        }
        else if (seconds < 3600) {
            return Math.floor(seconds / 60) + ' minutes ago';
        }
        else if (seconds < 7200) {
            return Math.floor(seconds / 3600) + ' hour ago';
        }
        else if (seconds < 86400) {
            return Math.floor(seconds / 3600) + ' hours ago';
        }
        else if (seconds < 172800) {
            return Math.floor(seconds / 86400) + ' day ago';
        }
        else if (seconds < 2592000) {
            return Math.floor(seconds / 86400) + ' days ago';
        }
        else if (seconds < 5184000) {
            return Math.floor(seconds / 2592000) + ' month ago';
        }
        else if (seconds < 31104000) {
            return Math.floor(seconds / 2592000) + ' months ago';
        }
        else if (seconds < 62208000) {
            return Math.floor(seconds / 31104000) + ' year ago';
        }
        else
            return Math.floor(seconds / 31104000) + ' years ago';
        /*if (interval > 1) {
            return interval + " years ago";
        }
    
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return " Now";*/
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'keys'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], KeysPipe);
    return KeysPipe;
}());

//# sourceMappingURL=keys.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__news_news__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_radio_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_api_services__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__popover1_popover1__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl, inApp, events, radioService, apiService, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.inApp = inApp;
        this.events = events;
        this.radioService = radioService;
        this.apiService = apiService;
        this.popoverCtrl = popoverCtrl;
        this.isPlaying = radioService.isPlaying;
        this.region = this.navParams.get('region');
        console.log(this.region);
        this.events.subscribe('change:toggle', function (val) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log("Called..", val);
            _this.close();
        });
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage.prototype.close = function () {
        var val = "POPOVER";
        this.events.publish('change:toggle11', val);
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.openAboutPage = function () {
        var _this = this;
        this.viewCtrl.dismiss().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__about_about__["a" /* AboutPage */]);
        });
    };
    PopoverPage.prototype.openNewsPage = function () {
        var _this = this;
        this.viewCtrl.dismiss().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__news_news__["a" /* NewsPage */]);
        });
    };
    PopoverPage.prototype.openSettingsPage = function () {
        var _this = this;
        this.viewCtrl.dismiss().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */]);
        });
    };
    PopoverPage.prototype.openWebView = function () {
        var _this = this;
        this.viewCtrl.dismiss().then(function () {
            _this.inApp.create("http://maxfm.thrilliant.com.ng/opinion", '_blank', 'location=no,toolbar=no');
        });
    };
    PopoverPage.prototype.changeLowStreaming = function () {
        console.log("DS: " + this.flag_datasaver);
        this.events.publish('toggle', this.flag_datasaver);
    };
    PopoverPage.prototype.presentPopover1 = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__popover1_popover1__["a" /* Popover1Page */], { region: this.region });
        popover.present({ ev: event });
        popover.onDidDismiss(function () {
            // Navigate to new page.  Popover should be gone at this point completely
            _this.viewCtrl.dismiss();
        });
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popover',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\popover\popover.html"*/'<ion-content style="background-color: #870a04; width: 100%">\n        <div class="overlay"></div>\n        <div *ngIf="isPlaying" class="bg" [ngStyle]="{\'background-image\': \'url(\'+radioService.radioOptions.albumArt+\')\'}"></div>\n        <div *ngIf="!isPlaying" class="bg" [ngStyle]="{\'background-image\': \'url(\'+apiService.scheduleData[0]?.presenter_image+\')\'}"></div>\n    <ion-list style="padding-left: 3%" no-lines>\n        <ion-list-header text-center style="background: transparent">\n                <button ion-button icon-only (click)="close()" clear class="img2">\n                        <ion-icon name="md-arrow-round-back" color="light"></ion-icon>\n                      </button>\n            <span class="text1"> MAX FM </span>\n          </ion-list-header>\n        <ion-item (click)="presentPopover1($event)" class="icn" style="background: black">\n            <img src="assets/img/mic.png" class="img1">          \n            <span class="text"> Listen Live </span>     \n        </ion-item>\n        <ion-item (click)="openAboutPage()" class="icn">\n            <img src="assets/img/schedule.png" class="img">          \n                <span class="text" text-wrap> Schedule & Listen Again</span><br>\n        </ion-item>\n        <ion-item (click)="openNewsPage()" class="icn">\n            <img src="assets/img/pic.png" class="img">          \n                <span class="text" text-wrap> News, PIctures + Videos </span>  \n        </ion-item>\n        <ion-item (click)="openWebView()" class="icn">\n            <img src="assets/img/vote.png" class="img">          \n                <span class="text"> Opinions </span>  \n        </ion-item>\n        <ion-item (click)="openSettingsPage()" class="icn">\n            <img src="assets/img/setting.png" class="img">          \n                <span class="text"> Settings </span>  \n        </ion-item>\n        <ion-item style="background: transparent; margin-top: 10%">\n            <ion-label style="color: #fff; font-size: 1.9rem;">Datasaver</ion-label>\n            <ion-toggle [(ngModel)]="flag_datasaver" (ionChange) = "changeLowStreaming()"></ion-toggle>\n          </ion-item>\n    </ion-list>\n</ion-content>\n\n\n\n<!-- <ion-list>\n  <button ion-item (click)="close()">Listen Live</button>\n  <button ion-item (click)="close()">Schedule & Listen Again</button>\n  <button ion-item (click)="close()">News, PIctures + Videos</button>\n  <button ion-item (click)="close()">Opinions</button>\n  <button ion-item (click)="pushSignupPage()">Settings</button>\n  <button ion-item (click)="pushSignupPageNoDismiss()">Datasaver</button>\n</ion-list> -->\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\popover\popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__services_radio_service__["a" /* RadioService */], __WEBPACK_IMPORTED_MODULE_7__services_api_services__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */]])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Online"] = 0] = "Online";
    ConnectionStatus[ConnectionStatus["Offline"] = 1] = "Offline";
})(ConnectionStatus || (ConnectionStatus = {}));
/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NetworkProvider = /** @class */ (function () {
    function NetworkProvider(network, eventCtrl) {
        this.network = network;
        this.eventCtrl = eventCtrl;
        this._status = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        console.log('Hello NetworkProvider Provider');
        this.status = this.isConnected() ? ConnectionStatus.Online : ConnectionStatus.Offline;
    }
    NetworkProvider.prototype.initializeNetworkEvents = function () {
        var _this = this;
        /* OFFLINE */
        this.network.onDisconnect().subscribe(function () {
            if (_this.status === ConnectionStatus.Online) {
                _this.setStatus(ConnectionStatus.Offline);
            }
        });
        /* ONLINE */
        this.network.onConnect().subscribe(function () {
            if (_this.status === ConnectionStatus.Offline) {
                _this.setStatus(ConnectionStatus.Online);
            }
        });
    };
    NetworkProvider.prototype.getNetworkType = function () {
        return this.network.type;
    };
    NetworkProvider.prototype.getNetworkStatus = function () {
        return this._status.asObservable();
    };
    NetworkProvider.prototype.setStatus = function (status) {
        if (status != this.status) {
            this.status = status;
            this._status.next(this.status);
        }
    };
    NetworkProvider.prototype.isConnected = function () {
        var conntype = this.network.type;
        return conntype && conntype !== 'unknown' && conntype !== 'none';
    };
    NetworkProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], NetworkProvider);
    return NetworkProvider;
}());

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ShowModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(389);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {ApiService} from "../../services/api-services";


// import {Observable} from 'rxjs/Observable';





/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewsPage = /** @class */ (function () {
    function NewsPage(http, navCtrl, navParams, loadingCtrl, service, modalCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.getCategoryTitle();
    }
    NewsPage.prototype.ionViewDidLoad = function () {
    };
    NewsPage.prototype.getBusinessPost = function (page, petTitle) {
        var _this = this;
        this.businessPost = undefined;
        this.page = page;
        this.slug = petTitle;
        this.pet = petTitle;
        console.log(this.pet);
        this.service.getPosts(petTitle)
            .then(function (results) {
            _this.businessPost = results.posts;
            if (petTitle == "photos") {
                __WEBPACK_IMPORTED_MODULE_6_jquery___default()('#scrollable').scrollLeft(__WEBPACK_IMPORTED_MODULE_6_jquery___default()('#segment_' + petTitle).position().left);
            }
        });
        console.log(this.businessPost);
    };
    NewsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.page = Number(this.page) + 1;
        console.log(this.page);
        console.log(typeof this.page);
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.service.getPaginationPosts(_this.slug, _this.page)
                    .then(function (results) {
                    _this.businessPost = _this.businessPost.concat(results.posts);
                    console.log(results.posts);
                    console.log(_this.businessPost);
                    resolve();
                }).catch(function (err) {
                    reject(err);
                });
            }, 500);
        });
    };
    NewsPage.prototype.getCategoryTitle = function () {
        var _this = this;
        this.service.getCategory().then(function (results) {
            _this.categoryTitle = results;
            if (results && results.categories) {
                if (_this.navParams.get("items")) {
                    _this.getBusinessPost("1", "photos");
                }
                else {
                    _this.getBusinessPost("1", _this.categoryTitle.categories[0].slug);
                }
            }
            console.log(results);
        });
    };
    NewsPage.prototype.openModelData = function (post) {
        this.navCtrl.push(ShowModelPage, { post: post });
        // let customModal = this.modalCtrl.create(ShowModelPage, {post: post});
        // customModal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], NewsPage.prototype, "nav", void 0);
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\news\news.html"*/'<!--\n  Generated template for the NewsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="color: white">NEWS, PICTURES + VIDEOS</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment class="center" [(ngModel)]="pet" id="scrollable"\n                 style="white-space: nowrap;font-size: 0;overflow: auto;background-color: #870a04;">\n\n      <ion-segment-button style="color:#ffffff;display:\n                          inline-block;min-width:\n                          100px;width: auto;\n                          border:none;\n                          font-size:15px"\n                          id="segment_{{data.slug}}"\n                          [ngStyle]="pet==data.slug?{\'background-color\': \'#534e4e\'}:\'\'"\n                          *ngFor="let data of categoryTitle?.categories"\n                          (click)="getBusinessPost(1, data.slug)" [innerHtml]="data?.title">\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-spinner class="center" *ngIf="!businessPost" name="bubbles" color="primary"></ion-spinner>\n  <div *ngIf="businessPost">\n    <div>\n      <ion-list>\n        <div class="max-wrapper" style="\n        max-width: none;\n    ">\n          <div no-border>\n            <h3 padding class="related-header"></h3>\n          </div>\n          <div class="max-article-wrapper">\n            <div class="max-article-listing" *ngFor="let post of businessPost" style="\n            border-bottom: 1px solid #dedede;\n            padding-bottom: 20px;\n        ">\n              <div *ngIf="post.attachments.length > 0" class="max-news-image" [ngStyle]="{\'background-image\':\'url(\'+post.attachments[0].url+\')\'}" style="background-size: 100% 100%;">\n                <img-loader src="{{post.attachments[0].url}}" style="visibility: hidden;" useImg></img-loader>\n              </div>\n              <div class="max-article-listing-content">\n                <div class="max-article-listing-category">\n                  <span class="category"></span> <span class="date">{{post.date|dateConvertor}}</span>\n                </div>\n                <div>\n                  <h2 class="max-article-title" [innerHtml]="post.title" (click)="openModelData(post)"></h2>\n                </div>\n               \n                <div class="max-article-footer"><span class="time">{{post.date|dateConvertor:\'HOURS\'}} ago</span>\n                  <!-- <ul>\n                    <li><a href="#"><img src="assets/img/heart.png"></a></li>\n                    <li><a href="#"><img src="assets/img/share.png"></a></li>\n                  </ul> -->\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())" >\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading New data..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\news\news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], NewsPage);
    return NewsPage;
}());

var ShowModelPage = /** @class */ (function () {
    function ShowModelPage(_sanitizer, viewCtrl, navParams, http, navCtrl, modalCtrl, service, loadingCtrl, socialSharing) {
        var _this = this;
        this._sanitizer = _sanitizer;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.http = http;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.socialSharing = socialSharing;
        this.content = "";
        console.log(navParams.data);
        var post = this.navParams.get("post");
        var id = navParams.data.id;
        this.item = this.navParams.get("item");
        console.log(this.item);
        this.form = [];
        if (post) {
            this.post = post;
            this.content = this._sanitizer.bypassSecurityTrustHtml(post.content);
            if (this.post.categories && this.post.categories.length == 1) {
                this.getMostPopNews(this.post.categories[0].id, null);
            }
        }
        else if (id) {
            this.id = id;
            this.service.getPost(this.id)
                .then(function (results) { return _this.handlePostResults(results); });
        }
        else if (navParams.data.itemId) {
            this.id = navParams.data.itemId;
            this.service.getPost(this.id)
                .then(function (results) { return _this.handlePostResults(results); });
        }
    }
    ShowModelPage_1 = ShowModelPage;
    ShowModelPage.prototype.ionViewDidLoad = function () {
        console.log("ShowModelPage::ionViewDidLoad", this.navParams.get("post"));
        this.instagramPosts();
    };
    ShowModelPage.prototype.getMostPopNews = function (id, page) {
        var _this = this;
        this.service.getRelatedPosts(id, page)
            .then(function (results) {
            console.log("getMostPopNews", id, page, results);
            _this.relatedPosts = results;
        });
    };
    ShowModelPage.prototype.handlePostResults = function (results) {
        var _this = this;
        console.log("handlePostResults", results);
        this.post = results.post;
        this.content = this._sanitizer.bypassSecurityTrustHtml(results.post.content);
        if (this.post.categories.length) {
            this.getMostPopNews(this.post.categories[0].id, null);
        }
        setTimeout(function () {
            _this.contents.resize();
        }, 3000);
    };
    ShowModelPage.prototype.getPost = function (item, post) {
        console.log("getPost", item, post);
        this.item = [];
        this.item.id = item.id;
        this.item.name = post.categories[0].title;
        this.navCtrl.push(ShowModelPage_1, this.item);
    };
    /*
      getCategoryNews(id,page){
        this.service.getCategoryPost(id,page)
        .then((results) => {
          let categoryData: any = results
          this.categoryPost = JSON.parse(categoryData._body)
        });
      }
    
      getTopStories(page){
        this.service.getTopPosts(page).then((results) => {
          let storiesData: any = results
          this.topStories = JSON.parse(storiesData._body)
          console.log(this.topStories);
        });
      }
    
    */
    ShowModelPage.prototype.shareWithFb = function (post, network, fab) {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        if (post) {
            this.message = post.title; // not supported on some apps (Facebook, Instagram)
            this.image = post.thumbnail; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = post.url;
        }
        else if (this.item) {
            this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
            this.image = this.item.image; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = this.item.url;
        }
        else {
            return;
        }
        // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        var loading = this.loadingCtrl.create({
            content: "Posting to " + network,
            duration: (Math.random() * 1000) + 500
        });
        loading.present();
        loading.onWillDismiss(function () {
            fab.close();
        });
        this.socialSharing.shareViaFacebook(null, null, this.url);
    };
    ShowModelPage.prototype.shareWithTw = function (post, network, fab) {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        if (post) {
            this.message = post.title; // not supported on some apps (Facebook, Instagram)
            this.image = post.thumbnail; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = post.url;
        }
        else if (this.item) {
            this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
            this.image = this.item.image; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = this.item.url;
        }
        else {
            return;
        }
        var loading = this.loadingCtrl.create({
            content: "Posting to " + network,
            duration: (Math.random() * 1000) + 500
        });
        loading.present();
        loading.onWillDismiss(function () {
            fab.close();
        });
        this.socialSharing.shareViaTwitter(this.message, this.image, this.url);
    };
    ShowModelPage.prototype.shareWithGmail = function (post) {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        if (post) {
            this.message = post.title; // not supported on some apps (Facebook, Instagram)
            this.image = post.thumbnail; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = post.url;
        }
        else if (this.item) {
            this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
            this.image = this.item.image; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = this.item.url;
        }
        else {
            return;
        }
        this.socialSharing.shareViaEmail(this.url, this.message, [this.image]);
    };
    ShowModelPage.prototype.shareWithWhatsapp = function (post, network, fab) {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        if (post) {
            this.message = post.title; // not supported on some apps (Facebook, Instagram)
            this.image = post.thumbnail; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = post.url;
        }
        else if (this.item) {
            this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
            this.image = this.item.image; // fi. for email
            // files: ['', ''], // an array of filenames either locally or remotely
            this.url = this.item.url;
        }
        else {
            return;
        }
        var loading = this.loadingCtrl.create({
            content: "Posting to " + network,
            duration: (Math.random() * 1000) + 500
        });
        loading.onWillDismiss(function () {
            fab.close();
        });
        loading.present();
        this.socialSharing.shareViaWhatsApp(null, null, this.url);
    };
    ShowModelPage.prototype.removeScript = function () {
        var fjs = document.getElementsByTagName('script')[0];
        fjs.parentNode.removeChild(document.getElementById('instagram-wjs'));
    };
    ShowModelPage.prototype.instagramPosts = function () {
        this.update(document, "script", "instagram-wjs");
    };
    ShowModelPage.prototype.update = function (d, s, id) {
        var js;
        var fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.setAttribute("onLoad", "window.instgrm.Embeds.process()");
            js.id = id;
            js.src = "https://platform.instagram.com/en_US/embeds.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    };
    ShowModelPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ShowModelPage.prototype.ionViewWillLeave = function () { this.removeScript(); };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ShowModelPage.prototype, "contents", void 0);
    ShowModelPage = ShowModelPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-showModel',template:/*ion-inline-start:"E:\Ionic\Task\maxapp\src\pages\news\showModel.html"*/'<!-- \n<ion-header>\n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="color: white" ></ion-title>\n  </ion-navbar>\n\n</ion-header>\n -->\n<ion-content padding>\n  <div>\n    <ion-spinner class="center" *ngIf="!post && !item" name="bubbles" color="primary"></ion-spinner>\n  </div>\n\n  <ion-fab top left>\n    <button ion-fab (click)="dismiss()"><ion-icon name="arrow-back"></ion-icon></button>\n  </ion-fab>\n  \n  \n  <div *ngIf="post!=null">\n    <div *ngIf="post.attachments.length > 0" class="max-news-image" >\n      <img-loader src="{{post.attachments[0].url}}" useImg></img-loader>\n    </div>\n    <h2 class="max-article-title" [innerHtml]="post.title"></h2>\n    <span class="max-article-detail" [innerHtml]="content"></span>\n  </div>\n  <div *ngIf="item!=null">\n    <div class="max-news-image" [ngStyle]="{\'background-image\':\'url(\'+item.image+\')\'}" style="border-radius: 15px; width: 100%; height: 270px"></div>\n    <h2 class="max-article-title" [innerHtml]="item.title"></h2>\n    <span class="max-article-detail" [innerHtml]="item.content"></span>\n  </div>\n  \n<!-- \n  <div *ngIf="relatedPosts?.posts" class="show-recent">\n    <ion-item no-border>\n      <ion-label class="related-header">Related Stories</ion-label>\n    </ion-item>\n\n    <ion-row class="row unlimited-items">\n      <ion-col *ngFor="let item of relatedPosts.posts" class="col">\n        <ion-card tappable (click)="getPost(item, post)">\n          <ion-card-content>\n              <ion-thumbnail item-left *ngIf="item.thumbnail">\n                <img-loader src="{{item.thumbnail}}" useImg></img-loader>\n              </ion-thumbnail>\n\n              <ion-thumbnail item-left *ngIf="!item.thumbnail && item.thumbnail_images?.medium">\n                <img-loader src="{{item.thumbnail_images.medium.url}}" useImg></img-loader>\n              </ion-thumbnail>\n\n              <ion-thumbnail item-left *ngIf="!item.thumbnail && !item.attachments.length">\n                <img src="assets/img/shop-icon.jpg">\n              </ion-thumbnail>\n          </ion-card-content>\n          <div class="details">\n            <h2 [innerHTML]="item.title" style="margin: 5px 0;"></h2>\n            <h3  style="margin: 10px 0;"><ion-icon name="md-time"></ion-icon>{{item.date | keys}}</h3>\n            <div [innerHTML]="item.content" class="info"></div>\n          </div>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </div>\n -->\n\n  <ion-fab bottom right #fab>\n    <button ion-fab class="share"><ion-icon name="md-share"></ion-icon></button>\n    <ion-fab-list side="top">\n      <button ion-fab style="color: #FF5722" (click)="shareWithGmail(post, \'Instagram\', fab)"><ion-icon name="ios-mail"></ion-icon></button>\n      <button ion-fab style="color: #34af23" name="logo-whatsapp" (click)="shareWithWhatsapp(post, \'Whatsapp\', fab)"><ion-icon name="logo-whatsapp"></ion-icon></button>\n      <button ion-fab style="color: #00aced" (click)="shareWithTw(post, \'Twitter\', fab)"><ion-icon name="logo-twitter"></ion-icon></button>\n      <button ion-fab style="color: #3b5998" (click)="shareWithFb(post, \'Facebook\', fab)"><ion-icon name="logo-facebook"></ion-icon></button>\n    </ion-fab-list>\n  </ion-fab>\n\n\n</ion-content>\n'/*ion-inline-end:"E:\Ionic\Task\maxapp\src\pages\news\showModel.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], ShowModelPage);
    return ShowModelPage;
    var ShowModelPage_1;
}());

//# sourceMappingURL=news.js.map

/***/ })

},[445]);
//# sourceMappingURL=main.js.map