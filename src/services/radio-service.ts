import {Injectable, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {MusicControls, MusicControlsOptions} from "@ionic-native/music-controls";
import {Platform} from "ionic-angular";
import {ApiService} from "./api-services";

import { BackgroundMode } from '@ionic-native/background-mode';
import { NetworkProvider, ConnectionStatus } from '../providers/network/network';

/**
 * Created by ankittater on 26/03/18.
 */

declare var $;

@Injectable()
export class RadioService {

  private lastFMKey = 'ab68e9a71c1bb15efaa9c706b646dee4';
  private lastFM = 'http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&limit=1&api_key=' + this.lastFMKey + '&track=';  
  public url = "http://maxfm1023.thrilliant.com.ng:9193/"
  public itune = "https://itunes.apple.com/search?limit=10&media=music&entity=album&term=";
  public isLivePlaying: boolean = false
  public isPlaying: boolean = false
  public coverArtAnimation: boolean = false
  public schedulePlaying: boolean = false
  public interval:any;
  public coverArtInterval:any;
  public lowFiUrl = "http://maxfmdatasaver.thrilliant.com.ng:9193/";
  public lowFiUrls = [
  {
    region_name: "Lagos",
    region_strem_link: "http://maxfmdatasaver.thrilliant.com.ng:9193/stream/2/"
  },
  {
    region_name: "Abuja",
    region_strem_link: "http://maxfmdatasaver.thrilliant.com.ng:8703/stream/2/"
  }]
  

  radioOptions: any = {song: "", name: "", albumArt: '', region: 'Lagos', datasaver: false}
  currentPlaying: any = {song: "", name: "", schedule: "", albumArt: ''}
  file: any = new Audio(this.url + "stream")
  public showData: any = {startTime: '', endTime: '', title: ''};
  lastSong: string;
  playerCreated: boolean = false;

  public onRegionChange:EventEmitter<void>


  constructor(public http: Http, private musicControls: MusicControls, private platform: Platform, 
    private backgroundMode: BackgroundMode, public networkStatus: NetworkProvider, public apiServices: ApiService) {
    this.onRegionChange = new EventEmitter();
    this.getStreamInfo(this.url);
    this.file.addEventListener('error', this.handleMediaError.bind(this));
  }

  setRegion(region:any){
    this.onRegionChange.emit();
  }

  playLive() {
    console.log('RadioService::playLive', this.url)
    this.file = new Audio(this.url + "stream")
    this.file.play()
    this.isPlaying = true
    this.isLivePlaying = true
    this.schedulePlaying = false
  }

  pauseLive() {
    console.log('RadioService::pauseLive')
    this.file.pause()
    this.isPlaying = false
    this.isLivePlaying = false
    this.schedulePlaying = false
  }

  playSchedule(songUrl, startTime, endTime, title) {
    console.log('RadioService::playSchedule')
    this.showData.startTime = startTime;
    this.showData.endTime = endTime;
    this.showData.title = title
    this.file.src = songUrl
    this.schedulePlaying = true
    this.playAudio(false)
  }

  applyCSS() {
    $('.max-video-upcomming-list').addClass("red");
    $('.max-equalizer').toggleClass("show");
    $('.max-play-btn').toggleClass("hide");
    $('img.playBtn').toggleClass("hide");
    let button = $('img.playStop');
    if (button.hasClass("show")) {
      $('img.playStop').toggleClass("show");
    } else {
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
  }

  isNetworkError:boolean = false;
  playResume() {
    console.log('playResume ==> ', this.isNetworkError);
    // if (this.isNetworkError) {
      this.stopAudio();
      this.isNetworkError = false;
      this.playAudio(true);
    // }
  }


  playAudio(value) {
    console.log('RadioService::playAudio', value)
    // this.musicControls.updateIsPlaying(true);
    // $('#logo-image').css('background-image',"url('')");
    this.applyCSS()
    this.backgroundMode.enable();
    this.file.play();
    this.isPlaying = true;
    this.coverArtAnimation = true;
    this.coverArtInterval = setInterval(() => {
      this.coverArtAnimation = !this.coverArtAnimation;
    }, 7000);
    if (value == true) {
      this.schedulePlaying = false;
      this.isLivePlaying = true
    } else {
      this.schedulePlaying = true;
      this.isLivePlaying = false
    }
  }

  stopAudio() {
    // console.log('RadioService::stopAudio')
    if (this.playerCreated) {
      this.musicControls.updateIsPlaying(false);
    }
    this.applyCSS()
    this.file.pause()
    this.file = null
    this.file = new Audio(this.url + "stream")
    this.backgroundMode.disable();
    this.isPlaying = false
    if (!this.schedulePlaying) {
      this.isLivePlaying = false
    }
    this.coverArtAnimation = false;
    if(this.coverArtInterval != undefined){
      clearInterval(this.coverArtInterval);
      $('#logo-image').css('background-image',"url('assets/img/static-background.png')");
    }
  }

  parseStreamResponse(response) {
    // console.log('RadioService::parseStreamResponse')
    let data: any = response
    var regex = data._body.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im)[1];
    var parts = regex.split(',');
    if (parts.length == 7) {
      return parts[6];
    }
    return null;
  }

  getAlbumArt(songTitle){
    // console.log('RadioService::getAlbumArt', songTitle)
    if (!songTitle) {
      return
    }
    let newtitle = songTitle.split(' ').join('+'); 
    console.log("url is " + this.itune + newtitle);
    
    // This is call to itune first
    
    this.http.get(this.itune + newtitle).subscribe(data => {
      let d: any = data;
      let response: any = {}
      if (d._body) {
        response = JSON.parse(d._body)
      }
      // console.log('RadioService::getAlbumArt', response)
      // here we are checking the resultCount of the response whether it has any response or not if yes then it will enter in this block and
      //set the image for displaying
      if(response.resultCount > 0){
        // Itune response with data
        if(response.results[0].artworkUrl100 != undefined){

          let lastSlash = response.results[0].artworkUrl100.lastIndexOf('/');
          response.results[0].artworkUrl100 = response.results[0].artworkUrl100.substr(0, lastSlash);
          this.radioOptions.albumArt = response.results[0].artworkUrl100 + '/600x600bb.jpg';
          console.log('RadioService::getAlbumArt', this.radioOptions.albumArt);
          let splitSong = songTitle.split('-')
          console.log('RadioService::getAlbumArt', splitSong)

          if (splitSong.length > 1) {
            this.radioOptions.song = splitSong[1]
            this.radioOptions.name = splitSong[0]
          } else {
            this.radioOptions.song = songTitle
          }
        }else{
          this.getAlbumArtFromFM(songTitle);
        }
      }else{
        // If we got 0 response then we call Last FM 
        
        this.getAlbumArtFromFM(songTitle)
      }
    }, err => {
      console.log('RadioService::getAlbumArt', err);
    })
  }

  getAlbumArtFromFM(songTitle) {
    console.log("song title is : "+songTitle);
    //here we call the LastFM Api to get the response
    this.http.get(this.lastFM + encodeURIComponent(songTitle)).subscribe(data => {
      let d: any = data;
      let response: any = {}
      if (d._body) {
        response = JSON.parse(d._body)
      }
      console.log("Last FM")
      // console.log('RadioService::getAlbumArtFromFM', response);
      if (response.error) {
        // console.log('RadioService::getAlbumArtFromFM', songTitle)
        // console.log("album title called")
        let splitSong = songTitle.split('-')
        // console.log('RadioService::getAlbumArtFromFM', splitSong)
        if (splitSong.length > 1) {
          this.radioOptions.song = splitSong[1]
          this.radioOptions.name = splitSong[0]
        } else {
          this.radioOptions.name = songTitle
        }
      } else {
        if (response.results) {
          if (response.results.trackmatches != "\n") {
            if (response.results.trackmatches.track[0] && response.results.trackmatches.track[0].image !== undefined) {
              this.radioOptions.albumArt = response.results.trackmatches.track[0].image[3]['#text'];
              // console.log('RadioService::getAlbumArtFromFM', songTitle)
              // console.log("album title called")
              let splitSong = songTitle.split('-')
              console.log(splitSong)
              if (splitSong.length > 1) {
                this.radioOptions.song = splitSong[1]
                this.radioOptions.name = splitSong[0]
              } else {
                this.radioOptions.song = songTitle
              }

            } else {
              console.log(songTitle)
              console.log("album title called")
              let splitSong = songTitle.split('-')
              console.log(splitSong)
              if (splitSong.length > 1) {
                this.radioOptions.song = splitSong[1]
                this.radioOptions.name = splitSong[0]
              } else {
                this.radioOptions.song = songTitle
              }
            }
          } else {
            console.log(songTitle)
            console.log("album title called")
            let splitSong = songTitle.split('-')
            console.log(splitSong)
            if (splitSong.length > 1) {
              this.radioOptions.song = splitSong[1]
              this.radioOptions.name = splitSong[0]
            } else {
              this.radioOptions.song = songTitle
            }
          }
        }
      }
      this.toggleMusicPlayer();
    });
  }

  getStreamInfo(url) {
    // console.log('RadioService::getStreamInfo', url);
    this.radioOptions.song = "";
    this.radioOptions.name = "";
    this.radioOptions.albumArt = "";
    
    if(this.interval != undefined){
      clearInterval(this.interval);
    }
    this.getInfo(url);
    this.interval = setInterval(() => {
      this.getInfo(url)
    }, 5000);
  }


  getInfo(url) {
    // console.log('RadioService::getInfo', url);
    let streamingDataUrl = url + '7.html';
    this.http.get(streamingDataUrl).subscribe((data: any) => {
      this.networkStatus.setStatus(ConnectionStatus.Online);
      // console.log("RadioService::getInfo success", data);
      let song = this.parseStreamResponse(data);
      // console.log("RadioService::getInfo success", song);
      if (song === '') {
      } else {
        if (this.lastSong != song) {
          console.log("does not matched", song)
          this.lastSong = song;
          this.radioOptions.albumArt = "";
          this.getAlbumArt(song)
        }
      }
    }, err => {
      this.networkStatus.setStatus(ConnectionStatus.Offline);
      console.log('RadioService::getInfo error', err);
    });
  }


  toggleMusicPlayer() {
    console.log('RadioService::toggleMusicPlayer');

    if (this.platform.is("cordova")) {
      if (!this.playerCreated) {
        this.musicControls.create(this.getMusicPlayerOption()).then(data => {
          this.playerCreated = true
          console.log('RadioService::toggleMusicPlayer success', data);
        }, err => {
          this.playerCreated = false
          console.log('RadioService::toggleMusicPlayer error', err)
        });
        this.setupMusicPlayer()
      } else {
        this.musicControls.destroy().then(data => {
          this.musicControls.create(this.getMusicPlayerOption()).then(data => {
            this.playerCreated = true
            console.log('RadioService::toggleMusicPlayer success', data);
          }, err => {
            this.playerCreated = false
            console.log('RadioService::toggleMusicPlayer error', err);
          });
        }, err => {
          console.log('RadioService::toggleMusicPlayer error', err);
        })
      }
    }
  }


  getMusicPlayerOption(): MusicControlsOptions {
    console.log('RadioService::getMusicPlayerOption');
    let musicPlayerOption = <MusicControlsOptions>{};
    musicPlayerOption.track = decodeURI(this.radioOptions.name + " - " + this.radioOptions.song)
    musicPlayerOption.artist = ""
    musicPlayerOption.cover = this.radioOptions.albumArt
    musicPlayerOption.isPlaying = this.isPlaying
    musicPlayerOption.dismissable = false
    musicPlayerOption.hasPrev = false
    musicPlayerOption.hasNext = false
    musicPlayerOption.hasClose = false
    musicPlayerOption.album = ""
    musicPlayerOption.hasSkipForward = false
    musicPlayerOption.hasSkipBackward = false
    musicPlayerOption.ticker = ""
    musicPlayerOption.playIcon = 'media_play'
    musicPlayerOption.pauseIcon = 'media_pause'
    musicPlayerOption.prevIcon = 'media_prev'
    musicPlayerOption.nextIcon = 'media_next'
    musicPlayerOption.closeIcon = 'media_close'
    musicPlayerOption.notificationIcon = 'notification'
    console.log("song change");
    return musicPlayerOption
  }

  handleMediaError(e) {
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
          console.log('You aborted the media playback.'); break;
      case e.target.error.MEDIA_ERR_NETWORK:
        this.isNetworkError = true;
          console.log('A network error caused the media download to fail.'); break;
      case e.target.error.MEDIA_ERR_DECODE:
          console.log('The media playback was aborted due to a corruption problem or because the media used features your browser did not support.'); break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          console.log('The media could not be loaded, either because the server or network failed or because the format is not supported.'); break;
      default:
          console.log('An unknown media error occurred.');
    }
  }



  setupMusicPlayer() {
    console.log('RadioService::setupMusicPlayer');
    this.musicControls.subscribe().subscribe(action => {
      console.log('RadioService::setupMusicPlayer', action)
      let a = JSON.parse(action);
      let message = a.message
      console.log(message)
      console.log(message)
      switch (message) {
        case 'music-controls-next':
          // Do something
          break;
        case 'music-controls-previous':
          // Do something
          break;
        case 'music-controls-pause':
          console.log("music pause button called")
          this.stopAudio()

          // Do something
          break;
        case 'music-controls-play':
          console.log("music play button called")
          this.playAudio(true)
          // Do something
          break;
        case 'music-controls-destroy':
          // Do something
          break;

        // External controls (iOS only)
        case 'music-controls-toggle-play-pause' :
          // Do something
          break;
        case 'music-controls-seek-to':
          const seekToInSeconds = JSON.parse(action).position;
          this.musicControls.updateElapsed({
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
        case 'music-controls-media-button' :
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
    })

    this.musicControls.listen(); // activates the observable above
  }
}
