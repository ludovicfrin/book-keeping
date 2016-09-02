import { Injectable } from '@angular/core';

import { Logger } from "angular2-logger/core";

import { Subject }    from 'rxjs/Subject';

/**
 * Service to share actions emit/receive by the toolbar
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Injectable()
export class ToolbarService {
    private _displayAnnouncedSource = new Subject<any>();
    private _doAnnouncedSource = new Subject<any>();
 
    displayAnnounced = this._displayAnnouncedSource.asObservable();
    doAnnounced = this._doAnnouncedSource.asObservable();
    
    /**
     * Constructor
     * 
     * @param _logger Logger manager
     */
    constructor(private _logger: Logger) { }    
    
    /**
     * Ask for displaying an element
     * 
     * @param element Element to display 
     * @param status Display status (display or not)
     */
    public display(element: string, status: boolean): void {
        this._logger.info("[ToolbarService] Display/hide toolbar " + element + ", status " + status);
        
        this._displayAnnouncedSource.next({element: element, status: status});
    }

    /**
     * Ask for an action
     * 
     * @param component Component associated to the action
     * @param action action to execute
     * @param params Additionnal parameters
     */
    public do(component: string, action: string, params: any): void {
        this._logger.info("[ToolbarService] Do action " + action + " for  the component " + component + " with params " + params);
        
        this._doAnnouncedSource.next({ component: component, action: action, params: params });
    }
}
