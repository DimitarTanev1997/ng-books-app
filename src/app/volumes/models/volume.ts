interface IndustryIdentifier {
	type: string;
	identifier: string;
}

interface ReadingModes {
	text: boolean;
	image: boolean;
}

interface PanelizationSummary {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
}

interface ImageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

interface VolumeInfo {
	title: string;
	subtitle: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: IndustryIdentifier[];
	readingModes: ReadingModes;
	pageCount: number;
	printType: string;
	categories: string[];
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
	averageRating: number;
}

interface SaleInfo {
	country: string;
	saleability: string;
	isEbook: boolean;
	buyLink: string;
	listPrice?: ListPrice;
}

interface Epub {
	isAvailable: boolean;
}

interface Pdf {
	isAvailable: boolean;
}

interface AccessInfo {
	country: string;
	viewability: string;
	embeddable: boolean;
	publicDomain: boolean;
	textToSpeechPermission: string;
	epub: Epub;
	pdf: Pdf;
	webReaderLink: string;
	accessViewStatus: string;
	quoteSharingAllowed: boolean;
}

interface SearchInfo {
	textSnippet: string;
}

interface ListPrice {
	amount: number;
	currencyCode: string;
}

export default interface Volume {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: VolumeInfo;
	saleInfo: SaleInfo;
	accessInfo: AccessInfo;
	searchInfo: SearchInfo;
}
