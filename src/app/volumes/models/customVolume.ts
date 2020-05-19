export default interface CustomVolume {
    id: string;
    volumeInfo: {
        title: string;
        authors: Array<string>;
        publisher: string;
        publishedDate: string;
        pageCount: number;
        imageLinks: {
            thumbnail: string;
        }
    }
}
