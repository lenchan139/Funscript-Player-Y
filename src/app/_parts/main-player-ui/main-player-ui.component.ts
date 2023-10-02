import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs, { VideoJsPlayer } from 'video.js';

@Component({
  selector: 'app-main-player-ui',
  templateUrl: './main-player-ui.component.html',
  styleUrls: ['./main-player-ui.component.less']
})
export class MainPlayerUiComponent {
  @ViewChild('targetPlayer', { static: true }) targetPlayer: ElementRef | undefined;

  // See options: https://videojs.com/guides/options
  @Input() options: videojs.PlayerOptions = {
    fluid: false,
    // aspectRatio:null,
    autoplay: true,
    controls: true,

  };


  player: VideoJsPlayer | undefined;

  constructor(
    private elementRef: ElementRef,
  ) { }

  // readydPlayer :MainPlayerUiComponent|undefined
  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.targetPlayer?.nativeElement, this.options, this.onPlayerReady.bind(this));
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onPlayerReady() {
    console.log('onPlayerReady', this);
    // this.player.seek 
    if (this.player) {
      this.getSeekbar()

    }
  }
  getSeekbar() {
    // const seekbar = new videojs.app(this.player)
    const controlBar = this.player?.getChild('ControlBar')
    if (controlBar) {
      console.log('controlBar', controlBar)
      const progress = controlBar.getChild('ProgressControl')
      if (progress) {
        console.log('progress', progress)
        const seekbar = progress.getChild('SeekBar')
        if (seekbar) {
          console.log('seekbar', seekbar)

          /* background-color: rgba(65,118,188,.1); */
          // background-color: black !important;
          // background-image: url(/assets/test_heatmap.png) !important;
          // background-repeat: no-repeat !important;
          // background-size: contain !important;
          // background-position-y: bottom !important;
          const seekbarDiv = <HTMLDivElement><any>seekbar.el()
          console.log('seekbardiv',seekbarDiv)
          seekbarDiv.style.backgroundImage = "url('/assets/test_heatmap.png')"
          seekbarDiv.style.backgroundColor = 'black'
          seekbarDiv.style.backgroundRepeat = 'no-repeat'
          seekbarDiv.style.backgroundSize = 'contain'
          seekbarDiv.style.backgroundPositionY = 'bottom'
        }
      }
    }

  }
}
