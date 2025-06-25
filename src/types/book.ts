

export enum BookType {
    Physical = 'PHYSICAL', //Sách bth
    EBook = 'E-BOOK' //sách điện tử
}

export interface Book {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    code: string//Dùng dùng để generate qr code 
    name: string
    thumbnail: string
    pdfLink: string
    audioLink: string
    type: BookType
    audioDuration: number//Thời lượng sách nói 
    publishDate: string //Ngày xuất bản. format: YYYY-MM-DD 
    totalRate: number // 
    totalStar: number //
    bookChapters: BookChapter[]
    galleries: BookGallery[];
}

export interface BookChapter {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    name: string
    pdfLink: string
    audioLink: string
    audioDuration: number//Thời lượng sách nói
    book: Book

}


export interface BookGallery {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    name: string
    link: string
    book: Book;

}
