/**
 * Category entity
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
export class Category {
    id: number;
    name: string;
    parent: Category;
}