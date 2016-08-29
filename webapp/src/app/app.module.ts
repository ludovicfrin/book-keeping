import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { XHRBackend } from '@angular/http';

import {MdButtonModule} from '@angular2-material/button/button';
import {MdCardModule} from '@angular2-material/card/card';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
import {MdIconModule} from '@angular2-material/icon/icon';
import {MdGridListModule} from '@angular2-material/grid-list/grid-list';
import {MdListModule} from '@angular2-material/list/list';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';

import { APP_ROUTING }	from './app.routing';
import { AppComponent } from './component/app.component';
import { CategoryComponent } from './component/category/category.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

/**
 * Modules configuration
 * 
 * @author Ludovic FRIN<Ludovic@frin.fr>
 */
@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		MdCheckboxModule,
		MdCardModule,
		MdButtonModule,
		MdIconModule,
		MdGridListModule,
        MdListModule,
		MdToolbarModule,
		MdSidenavModule,
		APP_ROUTING
	],
	declarations: [ 
        AppComponent,
        CategoryComponent,
        PageNotFoundComponent
        
	],
	providers: [
	],	 
	bootstrap: [ AppComponent ]
})
export class AppModule { }