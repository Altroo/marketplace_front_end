export class BlogClass {
	constructor(
		public pk: number,
		public page_url: string,
		public background_image: string,
		public background_image_alt: string,
		public title: string,
		public tags: Array<string>,
		public header: string,
		public page_meta_description: string,
		public content: string,
		public created_date: Date,
	) {}
}