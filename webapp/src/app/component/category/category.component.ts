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
    
    formItem: Category;
    parents: Category[] = [];
    items: Category[];
    search: string;
favoriteSeason: string = 'Autumn';
  seasonOptions = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
];
    
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
     * Search an item by id
     * 
     * @param id Item identifier
     * @return Item
     */
    public searchItemById(id: number): Category {
        if (!id) {
            return null;
        }
        this._logger.debug("[CategoryComponent] Looking for category with id " + id);
        
        let item;
        let items: Category[] = this._categories.filter(category => category.id == id);
        
        if (items.length > 0) {
            item = items[0];
        }
        return item;        
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
     * Edit an item
     * Display the form
     * 
     * @param item Item to edit
     */
    public doDisplayForm(item): void {
        this._logger.debug("[CategoryComponent] Edit category's id " + item.id);
        
        this.formItem = Object.create(item);
    }
    
    /**
     * Set the parent list in the form
     */
    public setParentsForm () {
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
        this._logger.debug("[CategoryComponent] Save edit");
        
        //TODO remove comments
//        this._categoryService
//            .save(this.formItem)
//            .then (result => { this.formItem = null; })
//            .catch(error => this._logger.error("[CategoryComponent] Can't save the category with id " + this.formItem.id + ". " + error));
//       
        //TODO to remove
        let newItem = Object.create(this.formItem);
        if (this.formItem.id) {
            console.log("Update");
            this._categories[0] = newItem;
        } else {
            console.log("Add");
            this._categories.push(newItem);
        }
        this.formItem = null;
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
}