import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
	 * @param http Http manager
	 */
	constructor(private http:Http) { }

	/**
	 * Get the categories
	 * 
	 * @return List of categories
	 */  
	public get(): Promise<Category[]> {
		return this.http.get("/examples/rest/category")
			.toPromise()
			.then(response => response.json() as Category[])
			.catch(this.handleError);
    }  
    
    /**
     * Get a category with a defined id
     *
     * @param id Identifier
     * @return Category
     */
	public getById(id: number): Promise<Category> {
		return this.http.get("/test/category")
			.toPromise()
			.then(response => response.json() as Category)
			.catch(this.handleError);
	} 

	/**
	 * Error handler
	 *
	 * @param error Error
	 * @return Action
	 */
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	} 
}
