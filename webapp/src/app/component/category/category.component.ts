import { Component, OnInit } from '@angular/core';

import { Category } from '../../entity/category';
import { CategoryService } from '../../service/category.service';

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
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
    categories: Category[];
    error: any;
    
    /**
     * Constructor
     * 
     * @param categoryService Category service
     */
    constructor(private categoryService : CategoryService) { }  
    
    
    search (id): Category {
        for (let category of this.categories) {
            if (category.id == id)
                return category;
        }
        return null;
    }
    
    /**
     * Component initialization
     * Read the categories
     */
    ngOnInit(): void {
        this.categoryService
            .get()
            .then(categories => this.categories = categories)
            .catch(error => this.error = error);
    }    
}