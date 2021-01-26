import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import Popper, { PopperOptions } from 'popper.js';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective implements OnInit, OnDestroy {

  // The popper instance
  private popper: Popper;
  private readonly defaultConfig: PopperOptions = {
    placement: 'top',
    removeOnDestroy: true
  };
  // The hint to display
  @Input() target: HTMLElement;
  // Its positioning (check docs for available options)
  @Input() placement?: string;
  // Optional hint target if you desire using other element than
  // specified one
  @Input() appPopper?: HTMLElement;
  constructor(private readonly el: ElementRef) { }
  ngOnInit(): void {
    // An element to position the hint relative to
    const reference = this.appPopper ? this.appPopper : this.el.nativeElement;
    this.popper = new Popper(reference, this.target, this.defaultConfig);
  }
  ngOnDestroy(): void {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();

  }
}
