import { Book } from "./book";

export interface RemarkBook {
    id: number;
    content: string;
    book: Book;
}