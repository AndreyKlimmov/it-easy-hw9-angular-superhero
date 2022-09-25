import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonHeaderComponent} from "./core/components/button-header/button-header.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'authentication-app';

  public user: any;
  durationInSeconds = 5;

  // some fields to store our state so we can display it in the UI
  idleState = "NOT_STARTED";
  countdown?: number;
  //lastPing?: Date;

  // add parameters for Idle and Keepalive (if using) so Angular will inject them from the module

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    cd: ChangeDetectorRef
  ) {
    // set idle parameters
    idle.setIdle(3600); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(180); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = "IDLE";
      this.openSnackBar('session is about to time out')
      //alert(`IDLE_STATE: ${this.idleState}, COUNTDOWN: ${this.countdown}`)
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = "NOT_IDLE";
      console.log(`${this.idleState} ${new Date()}`)
      this.closeSnackBar()
      this.countdown = 0;
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = "TIMED_OUT"
      this.closeSession()
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe(seconds => this.countdown = seconds);

    // set keepalive parameters, omit if not using keepalive
    // keepalive.interval(15); // will ping at this interval while not idle, in seconds
    // keepalive.onPing.subscribe(() => this.lastPing = new Date()); // do something when it pings

  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = "NOT_IDLE";
    this.countdown = 0;
    //this.lastPing = 0;
  }

  ngOnInit(): void {
    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }
    // right when the component initializes, start reset state and start watching
    this.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,'',  {
      //duration: this.durationInSeconds,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'end',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }
  closeSnackBar() {
    this._snackBar.dismiss();
  }

  closeSession() {
    if (localStorage.getItem('session')) {
      localStorage.removeItem('session')
      this.router.navigate(['/login'])
    }
  }

}

