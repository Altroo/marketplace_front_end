export class DefaultSeoPageClass {
	constructor(
		public pk: number,
		public page_url: string,
		public title: string,
		public h_one: string,
		public tags: Array<string>,
		public h_two: string,
		public paragraphe: string,
		public page_meta_description: string,
	) {}
}