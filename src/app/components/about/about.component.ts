import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  RendererFactory2,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    const revealUpElements = document.querySelectorAll('.revealUp');
    const renderer = this.rendererFactory.createRenderer(null, null);
    revealUpElements.forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 90%',
        end: 'bottom 30%',
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        },
        onLeave: () => {
          gsap.fromTo(
            elem,
            { y: 0, autoAlpha: 1 },
            {
              duration: 1.25,
              y: 100,
              autoAlpha: 0,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            elem,
            { y: 0, autoAlpha: 1 },
            {
              duration: 1.25,
              y: 100,
              autoAlpha: 0,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        },
      });
    });
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  constructor(private rendererFactory: RendererFactory2) {}
}
