import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FunscriptLoaderService } from 'src/app/services/funscript-loader.service';
import videojs, { VideoJsPlayer } from 'video.js';

@Component({
  selector: 'app-main-player-ui',
  templateUrl: './main-player-ui.component.html',
  styleUrls: ['./main-player-ui.component.less']
})
export class MainPlayerUiComponent {
  @ViewChild('targetPlayer', { static: true }) targetPlayer: ElementRef | undefined;
  @ViewChild('heatmapCanvas', { static: true }) heatmapCanvas: ElementRef<HTMLCanvasElement> | undefined;

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
    private funscriptLoader: FunscriptLoaderService,
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
      setTimeout(() => {
        
      this.loadFunScript()
      }, 1000);

    }
  }

  loadFunScript() {
    const v = this.funscriptLoader.loadFunscript()
    v.subscribe(data => {
      console.log('load fun result', data)
      if (data) {
        this.updateSeekbar()
      }
    })

  }
  updateSeekbar() {
    // const seekbar = new videojs.app(this.player)
    const controlBar = this.player?.getChild('ControlBar')
    const cs=document.getElementsByClassName('vjs-control')
    if(cs){
    for(let i=0;i<cs.length;i++){
      const c =<HTMLDivElement> cs[i]
      if(c){
        c.style.backgroundColor = 'rgb(0,0,0)'
      }
    }
    }
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
          console.log('seekbardiv', seekbarDiv)
          const loadProgressDiv =<HTMLDivElement> seekbarDiv.querySelector('.vjs-load-progress')
          // seekbarDiv.style.backgroundImage = "url('/assets/test_heatmap.png')"
          seekbarDiv.style.backgroundColor = 'rgb(30,30,30)'
          seekbarDiv.style.backgroundRepeat = 'no-repeat'
          seekbarDiv.style.backgroundSize = 'contain'
          seekbarDiv.style.backgroundPositionY = 'bottom'
          // seekbarDiv.style.border = 'inset solid 10px white'
          seekbarDiv.style.border
          const sildebar = <HTMLDivElement>seekbarDiv.querySelector('div.vjs-play-progress.vjs-slider-bar')
          const newImg = document.createElement('img')
          newImg.classList.add('vjs-heatmap-seekbar')
          if(loadProgressDiv){
            // loadProgressDiv.style.backgroundColor = 'rgba(118,0,0,.1)'
         const last=  <HTMLDivElement> loadProgressDiv.lastChild
         if(last){
          last.style.backgroundColor = 'rgba(50,0,0,.1)'

         }
          }
          // seekbarDiv.appendChild(newImg)
          if (sildebar) {
            // sildebar.style.backgroundColor = 'rgba(0,118,188,.4)'
     }
          if (this.heatmapCanvas?.nativeElement) {
            this.heatmapCanvas.nativeElement.width = seekbarDiv.offsetWidth
            this.heatmapCanvas.nativeElement.height = seekbarDiv.offsetHeight
            this.updateHeatMapToSeekbar(seekbarDiv, newImg)
            // Canvas2Image.saveAsPNG(this.heatmapCanvas, seekbarDiv.offsetWidth,seekbarDiv.offsetHeight)
          }

        }
      }
    }

  }

  updateHeatMapToSeekbar(seekbarDiv: HTMLDivElement, imgObj:HTMLImageElement) {

    if (this.heatmapCanvas?.nativeElement){
console.log('navit',this.heatmapCanvas?.nativeElement)
      this.funscriptLoader.renderHeatmap(this.heatmapCanvas?.nativeElement)
    const dataURL = this.heatmapCanvas?.nativeElement.toDataURL()
    console.log('dataURL', dataURL)
    seekbarDiv.style.backgroundImage = `url('${dataURL}')`
    // imgObj.src = dataURL;
    }
  }
  d(e:Event){
    console.log('event',e)
  }
}
