/**
 * Category entity
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
export class Category {
    id: number;
    name: string;
    type: string;
    parent: Category;
    selected: boolean;
}