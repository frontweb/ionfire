import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

/*
  Render iFrame for a Youtube/Facebook/Vimeo video
*/
@Component({
  selector: 'feed-video',
  templateUrl: 'feed-video.html'
})
export class FeedVideo implements OnInit {
  @Input() videoUrl;

  platform: string = null;
  videoId: string = null;
  iFrameUrlSafe: SafeResourceUrl = null;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.initIdAndIframeUrl();
  }

  extractVideoPlatform(): string {
    if (this.videoUrl.indexOf('vimeo.com') != -1) return 'vimeo';
    else if (this.videoUrl.indexOf('youtube.com') != -1 || this.videoUrl.indexOf('youtu.be') !== -1) return 'youtube';
    else if (this.videoUrl.indexOf('facebook.com') != -1) return 'facebook';

    return null;
  }

  initIdAndIframeUrl() {
    this.platform = this.extractVideoPlatform();
    let iFrameUrl = null;

    if (this.platform == 'vimeo') {
      // https://vimeo.com/15190913
      this.videoId = this.videoUrl.replace('https://vimeo.com/', '');
      iFrameUrl = 'https://player.vimeo.com/video/'+this.videoId+'?api=1&badge=0&byline=0&title=0&portrait=0&player_id=vimeoPlayer'+this.videoId;
    }
    else if (this.platform == 'youtube') {
      if (this.videoUrl.indexOf('youtube.com') !== -1) { // https://www.youtube.com/watch?v=kxHY6lbERmQ
        this.videoId = this.videoUrl.match(/v=([a-zA-Z0-9-]+)/)[1];
      }
      else { // http://youtu.be/Y6ryNp5qpsU
        this.videoId = this.videoUrl.replace('http://youtu.be/', '');
      }

      iFrameUrl = 'https://www.youtube.com/embed/'+this.videoId+'?rel=0&amp;showinfo=0';
    }
    else if (this.platform == 'facebook') {
      // https://www.facebook.com/MobiPromoPlatform/videos/724120664371735/
      this.videoId = this.videoUrl.match(/videos\/([0-9]+)/)[1];
      iFrameUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(this.videoUrl)}`;
    }

    if (iFrameUrl) {
      this.iFrameUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(iFrameUrl);
    }
  }
}
