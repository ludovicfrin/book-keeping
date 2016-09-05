import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Logger } from "angular2-logger/core";

import { Category } from '../../entity/category';

import { CategoryService } from '../../service/category.service';
import { ToolbarService } from '../../service/toolbar.service';

import { SearchPipe } from '../../pipe/search.pipe';

/**
 * Category administration component
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Component({
  moduleId: module.id,
  selector: 'bk-category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.css'],
  providers: [CategoryService, SearchPipe]
})

export class CategoryComponent implements OnInit {
    private _categories: Category[];
    private _display: any = { 'delete': false };

    items: Category[];
    search: string;
    
    selectedIndex: number = -1;
    formTitle: String;
    formItem: Category;
    parents: Category[] = [];

    
    /**
     * Constructor
     * 
     * @param _logger Logger Manager
     * @param _categoryService Category service
     * @param _searchPipe Search filter
     * @param _router Navigation manager
     * @param _toolbarService Service to communicate between toolbar and components
     */
    public constructor(
        private _logger: Logger, 
        private _categoryService : CategoryService, 
        private _searchPipe: SearchPipe, 
        private _router: Router, 
        private _toolbarService : ToolbarService) { }
    
    /**
     * Component initialization
     * Listen for actions from the toolbar
     * Read the items
     */
    public ngOnInit(): void {
        this._logger.debug("[CategoryComponent] Initialization");
        
        this._toolbarService.doAnnounced.subscribe(action => {
            if (action.component == 'category') {
                switch(action.action) {
                    case "delete": this._doDelete(); break;
                    case "search": this._doSearch(action.params); break;
                }
            }
        });

        this._categoryService
            .get()
            .then(categories => { 
                this._categories = categories;
                this.items = this._categories; 
            })
            .catch(error => this._logger.error("[CategoryComponent] Can't read the categories. " + error));
    }
    
    /**
     * Click on a item using the checkbox
     * Stop others actions (select a item)
     * 
     * @param event Event manager
     */
    public doClick(event): void {
        this._logger.debug("[CategoryComponent] Click on checkbox");
        
        event.stopPropagation();
    }
    
    /**
     * Select an item
     * 
     * @param status Selection status (select or deselect)
     * @param item Item selected
     */
    public doSelect(status, item): void {
         this._logger.debug("[CategoryComponent] Select/Unselect (status : " + status + ") category's id " + item.id);
        
        item.selected = status;
    }
    
    /**
     * Select all items
     * 
     * @param status Selection status (select or deselect)
     */
    public doSelectAll(status): void {
        this._logger.debug("[CategoryComponent] Select all items");
        
        this.items.forEach(item => item.selected = status);
    }
    
    /**
     * Search items in the list
     * 
     * @param request Search request
     */
    private _doSearch (request): void {
        this._logger.debug("[CategoryComponent] Do search on value " + request);
        
        this.items = this._searchPipe.transform(this._categories, ['name'], request);
    }
    
    /**
     * Delete items
     */
    private _doDelete(): void {
        this._logger.debug("[CategoryComponent] Delete selected categories");
                
        for (let i=0; i<this.items.length; i++) {
            if (this.items[i].selected == true) {
                this._categoryService
                    .delete(this.items[i].id)
                    .then (result => {
                        this.items.splice(i, 1);
                        i--;
                    })
                    .catch(error => this._logger.error("[CategoryComponent] Can't delete the category with id " + this.items[i].id + ". " + error));
            }            
        }
    }
    
    /**
     * Check if some items are selected
     * Send message to the toolbar in order to display/hide buttons
     * 
     * @return True if some items are selected
     */
    public hasSomeSelected(): boolean {
        let nbSelected = this.items.filter(category => category.selected).length;
        
        if (nbSelected > 0 && this._display.delete == false) {
            this._display.delete = true;
            this._toolbarService.display("delete", true);
        }
        else if (nbSelected == 0 && this._display.delete == true) {
            this._display.delete = false;
            this._toolbarService.display("delete", false);
        }
        
        return nbSelected > 0 && nbSelected < this._categories.length;
    }
    
    /**
     * Check if all items are selected
     * 
     * @return True if all items are selected
     */
    public hasAlllSected(): boolean {
        return this.items.every(category => category.selected) == true;
    }
    
   /**
     * Edit an item
     * Display the form
     * 
     * @param index Item index in the list
     */
    public displayForm(index: number): void {
        if (index >= 0) {
            this._logger.debug("[CategoryComponent] Edit category width index " + index);
            this.selectedIndex = index;
            this.formItem = JSON.parse(JSON.stringify(this.items[index]));
            this.formTitle = "Modification de la cat\u00e9gorie " +  this.formItem.name;          
        } else {
            this._logger.debug("[CategoryComponent] Edit new category");
            this.formItem = new Category();
            this.formTitle = "Ajout d'une cat\u00e9gorie";
        }
    }
    
    /**
     * Set the parent list in the form
     */
    public setParentsListForm () {
        this._logger.debug("[CategoryComponent] Set the parents list in the form for the type " + this.formItem.type);
        
        this.parents = this._categories.filter(category => category.type == this.formItem.type);
    }    
    
    /**
     * Cancel the current item edition
     * 
     * @param event Events manager 
     */
    public cancelForm(event): void {
        this._logger.debug("[CategoryComponent] Cancel edit");
        
        event.preventDefault();
        this.formItem = null;
    }
    
    /**
     * Save the current item edition 
     */
    public saveForm(): void {
        this._logger.debug("[CategoryComponent] Save the category's edition" + this.selectedIndex);
        
        //TODO remove comments
        this._categoryService
            .save(this.formItem)
            .then (result => { 
                if (this.selectedIndex >= 0) {
                    this.items[this.selectedIndex] = this.formItem;
                } else {
                    this._categories.push(this.formItem);
                }
                this.formItem = null;
                this.selectedIndex = -1;
            })
            .catch(error => this._logger.error("[CategoryComponent] Can't save the category with id " + this.formItem.id + ". " + error));
    }    
}