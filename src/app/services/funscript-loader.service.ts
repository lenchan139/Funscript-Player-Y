import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FunscriptUtils from 'funscript-utils'
import { map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FunscriptLoaderService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  private currentFunObject: FunscriptUtils.FunTypes.Funscript | undefined
  get funObject() {
    return this.currentFunObject;
  }
  loadFunscript() {
    const filepath = '/assets/錬精術士コレットのHな搾精物語 第四話.funscript'
    this.currentFunObject = undefined;
    const x = this.httpClient.get(filepath, { responseType: 'text' })
      .pipe(
        map(data => {
          console.log(data)
          const funObject = FunscriptUtils.FunConverter.getFunscriptFromString(data)
          this.currentFunObject = funObject;
          return funObject;
        })
      )
    return x;
  }
  renderHeatmap(canvas: HTMLCanvasElement) {
    if (canvas && this.currentFunObject) {
      FunscriptUtils.FunMapper.renderHeatmap(canvas, this.currentFunObject)
    }
  }
}
