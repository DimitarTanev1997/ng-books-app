export default interface LoggedUser {
	id: string;
	localId: string;
	email: string;
	displayName: string;
	idToken: string;
	registered: boolean;
}
