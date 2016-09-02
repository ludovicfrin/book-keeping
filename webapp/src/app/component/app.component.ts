import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router  } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Logger } from "angular2-logger/core";

import { Subscription } from 'rxjs/Subscription';

import { ToolbarService } from '../service/toolbar.service';
/**
 * App template component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Component({
  moduleId: module.id,
  selector: 'bk-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  viewProviders: [Title],
  providers: [Logger, ToolbarService]
})

export class AppComponent implements OnInit {
    title: string = '';
    childView: boolean = false;
    display = { "delete": false };
    
    private _routerSubscription: Subscription;
    private _route: ActivatedRouteSnapshot;
    
    /**
     * Constructor
     * 
     * @param _logger Logger manager
     * @param _titleService Service to inject title in the head section
     * @param _activatedRoute Route informations
     * @param _router Navigation manager
     * @param _toolbarService Service to communicate between toolbar and components
     */
    public constructor(
        private _logger: Logger, 
        private _titleService: Title, 
        private _activatedRoute: ActivatedRoute, 
        private _router: Router, 
        private _toolbarService : ToolbarService) { }
    
    /**
     * Component initialization
     * Subscription to the routing events
     * Substription to the events associated to the toolbar
     * Change the title regarding the current route
     */
    public ngOnInit(): void {
        this._logger.debug("[AppComponent] Initialization");
        
        this._routerSubscription = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._route = this._activatedRoute.snapshot;
                
                while (this._route.firstChild) {
                    this._route = this._route.firstChild;
                }
                this.setTitle(this._route.data['title']);
                this.childView = !this._route.data['root'];
            }
        });
    
        this._toolbarService.displayAnnounced.subscribe(display => {
            this.display[display.element] = display.status; 
        });    
    }    
    
    /**
     * Title setter
     * Change title in the head section and in the toolbar
     * 
     * @param title Title
     */
    public setTitle(title: string): void {
        this._logger.debug("[AppComponent] Set title to : " + title);
        
        this._titleService.setTitle( "Book-keeping - " + title );
        this.title = title;
    }
    
    /**
     * Back to the previous page
     */
    public goBack(): void {
        this._logger.debug("[AppComponent] Go to previous route");
        
        this._router.navigate([this._route.parent.url[0].path]);
    }
    
    /**
     * Ask for an action to the toolbar service
     * 
     * @param action Action to execute
     * @param params Additionnals parameters
     */
    public do(action: string, params: any): void {
        this._logger.debug("[AppComponent] Fire action " + action + " with params " + params);
        
        this._toolbarService.do(this._route.parent.url[0].path, action, params);
    }
    
    /**
     * Component desctruction
     * Unsubscribe to the differents observable events
     */
    public ngOnDestroy(): void {
        this._routerSubscription.unsubscribe();
    }
}
