import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';
import { XHRBackend } from '@angular/http';



import {MdButtonModule} from '@angular2-material/button/button';
import {MdCardModule} from '@angular2-material/card/card';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
import {MdIconModule} from '@angular2-material/icon/icon';
import {MdInputModule} from '@angular2-material/input/input';
import {MdGridListModule} from '@angular2-material/grid-list/grid-list';
import {MdListModule} from '@angular2-material/list/list';
import {MdRadioModule} from '@angular2-material/radio/radio';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';

import { Logger, LOG_LOGGER_PROVIDERS } from "angular2-logger/core";

import { APP_ROUTING }	from './app.routing';

import { AppComponent } from './component/app.component';
import { CategoryComponent } from './component/category/';
import { PageNotFoundComponent } from './component/page-not-found/';

import { SearchPipe } from './pipe/search.pipe';

/**
 * Modules configuration
 * 
 * @author Ludovic FRIN<Ludovic@frin.fr>
 */
@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
        FormsModule,
		MdCheckboxModule,
		MdCardModule,
		MdButtonModule,
		MdIconModule,
		MdInputModule,
		MdGridListModule,
        MdListModule,
        MdRadioModule,
		MdToolbarModule,
		MdSidenavModule,
		APP_ROUTING
	],
	declarations: [ 
        AppComponent,
        CategoryComponent,
        PageNotFoundComponent,
        SearchPipe
	],
	providers: [
		LOG_LOGGER_PROVIDERS
	],	 
	bootstrap: [ AppComponent ]
})
export class AppModule { }