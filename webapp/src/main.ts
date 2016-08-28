/**
 * Boostrap program
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment, AppModule} from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);