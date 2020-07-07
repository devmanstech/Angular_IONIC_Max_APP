import { Injectable, Pipe, PipeTransform } from '@angular/core';


declare var Date:any;
/*
  Generated class for the Pipe pipe.
*/
@Pipe({
  name: 'keys'
})
@Injectable()
export class KeysPipe implements PipeTransform{
  transform(value, args?:string[]): any{
    // current time
    let now = new Date().getTime();
    let time = new Date(value.replace(/\s/, 'T')).getTime();

    // time since message was sent in seconds
    let seconds = Math.floor((now - time) / 1000);

    //let interval = Math.floor(seconds / 31536000);

        // format string
    if (seconds < 60) {
      return 'just now';
    } else if (seconds < 120) { // sent in last minute
      return Math.floor(seconds / 60) + ' minute ago';
    } else if (seconds < 3600) { // sent in last minute
      return Math.floor(seconds / 60) + ' minutes ago';
    } else if (seconds < 7200) { // sent in last hour
      return Math.floor(seconds / 3600) + ' hour ago';
    } else if (seconds < 86400) { // sent in last hour
      return Math.floor(seconds / 3600) + ' hours ago';
    } else if (seconds < 172800) { // sent more than one day ago
      return Math.floor(seconds / 86400) + ' day ago';
    } else if (seconds < 2592000) { // sent more than one day ago
      return Math.floor(seconds / 86400) + ' days ago';
    } else if (seconds < 5184000) { // sent more than one day ago
      return Math.floor(seconds / 2592000) + ' month ago';
    } else if (seconds < 31104000) { // sent more than one day ago
      return Math.floor(seconds / 2592000) + ' months ago';
    } else if (seconds < 62208000) { // sent more than one day ago
      return Math.floor(seconds / 31104000) + ' year ago';
    } else return Math.floor(seconds / 31104000) + ' years ago';

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
  }
}  
