export class DefaultSeoPageClass {
	constructor(
		public pk: number,
		public page_url: string,
		public title: string,
		public tags: Array<string>,
		public header: string,
		public paragraphe: string,
		public page_meta_description: string,
	) {}
}