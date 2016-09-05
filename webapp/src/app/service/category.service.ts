import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Logger } from "angular2-logger/core";

import 'rxjs/add/operator/toPromise';

import { Category } from '../entity/category';

/**
 * Category service
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Injectable()
export class CategoryService {

	/**
	 * Constructor
	 * 
	 * @param _logger Logger manager
	 * @param _http Http manager
	 */
	constructor(
        private _logger: Logger, 
        private _http: Http) { }

	/**
	 * Get the categories
	 * 
	 * @return List of categories
	 */  
	public get(): Promise<Category[]> {
        this._logger.info("[CategoryService] Read all the elements");
        
		return this._http.get("/examples/rest/category")
			.toPromise()
			.then(response => response.json() as Category[])
			.catch(this._handleError);
    }  
    
    /**
     * Get a category with a defined id
     *
     * @param id Identifier
     * @return Category
     */
	public getById(id: number): Promise<Category> {
        this._logger.info("[CategoryService]  Read element with id " + id);
        
		return this._http.get("/test/category/" + id)
			.toPromise()
			.then(response => response.json() as Category)
			.catch(this._handleError);
	}
    
    /**
     * Save a category (add/update)
     * 
     * @param category Category to save
     * @return Category saved
     */
    public save(category: Category): Promise<Category> {
        this._logger.info("[CategoryService]  Save the element");
        
        let path: string = "/test/category";
        
        if (category.id) {
            path += "/" + category.id;
        }
        
        return this._http.post(path, JSON.stringify(category))
            .toPromise()
            .then(response => response.json() as Category)
            .catch(this._handleError);
    }
	
	/**
	 * Delete a category with a defined id
	 *
	 * @param id Identifier
	 */
    public delete(id: number): Promise<any> {
        this._logger.info("[CategoryService]  Delete the element with id " + id);
         
	 	return this._http.delete("/test/category/" + id)
			.toPromise()
			.catch(this._handleError);
	 }

	/**
	 * Error handler
	 *
	 * @param error Error
	 * @return Error message
	 */
	private _handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
	}
}
