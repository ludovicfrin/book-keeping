/**
 * Category entity
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
export class Category {
    id: number;
    type: string;
    name: string;
    parent: number;
    selected: boolean;
}