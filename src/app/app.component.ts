import { Component } from '@angular/core';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private showCat = false;

  public showCatPic() {
    this.showCat = true;
  }

  public get shouldShowCat() {
    return this.showCat;
  }
}
