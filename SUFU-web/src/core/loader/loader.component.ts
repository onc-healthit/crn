import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  show = false;

  private subscription: Subscription;
  private requestCount = 0;

  constructor(private loaderService: LoaderService) { 
    this.requestCount = 0;
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      let self = this;
      setTimeout(() => {
        if(state.show) {
          self.show = state.show;
          this.requestCount++;
        } else {
          self.requestCount--;
          if(self.requestCount <= 0) {
            self.show = state.show;
          }
        }
      }, 0);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
