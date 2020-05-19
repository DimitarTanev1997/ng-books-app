import Volume from './volume';

export default interface VolumesResponse {
	kind: string;
	totalItems: number;
	items: Array<Volume>;
}
