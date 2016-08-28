/**
 * Modules definition
 * 
 * @author Ludovic FRIN<Ludovic@frin.fr>
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { XHRBackend } from '@angular/http';

import {MdButtonModule} from '@angular2-material/button/button';
import {MdCardModule} from '@angular2-material/card/card';
import {MdIconModule} from '@angular2-material/icon/icon';
import {MdListModule} from '@angular2-material/list/list';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';

import { AppComponent } from './component/app.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		MdCardModule,
		MdButtonModule,
		MdIconModule,
        MdListModule,
		MdToolbarModule,
		MdSidenavModule,
	],
	declarations: [ 
        AppComponent
	],
	providers: [
	],	 
	bootstrap: [ AppComponent ]
})
export class AppModule { }