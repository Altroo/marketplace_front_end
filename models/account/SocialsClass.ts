type SocialsProviderType = 'google' | 'facebook'

export class SocialsClass {
	constructor(
		public pk : number,
		public provider: SocialsProviderType,
		public uid: string,
		public last_login: string,
		public date_joined: string,
	) {}
}

export class GoogleClass extends SocialsClass{
	constructor(
		pk: number,
		provider: SocialsProviderType,
		uid: string,
		last_login: string,
		date_joined: string,
		public extra_data: {
			id: string,
			email: string,
			verified_email: boolean,
			name: string,
			given_name: string,
			family_name: string,
			picture: string,
			locale: string,
		}
	) {
		super(pk, provider, uid, last_login, date_joined)
	}
}

export class FacebookClass extends SocialsClass{
	constructor(
		pk: number,
		provider: SocialsProviderType,
		uid: string,
		last_login: string,
		date_joined: string,
		public extra_data: {
            id: string,
            first_name: string,
            last_name: string,
            name: string,
            name_format: string,
            picture: {
                data: {
                    height: number,
                    is_silhouette: boolean,
                    url: string,
                    width: number
                }
            },
            short_name: string
        }
	) {
		super(pk, provider, uid, last_login, date_joined)
	}
}

/*
[
    {
        "pk": 1,
        "provider": "google",
        "uid": "104378374907541649483",
        "last_login": "2022-07-20T11:52:34.904526Z",
        "date_joined": "2022-07-20T11:52:34.904535Z",
        "extra_data": {
            "id": "104378374907541649483",
            "email": "youness.elalami02@gmail.com",
            "verified_email": true,
            "name": "Youness El Alami",
            "given_name": "Youness",
            "family_name": "El Alami",
            "picture": "https://lh3.googleusercontent.com/a-/AFdZucrhxnykhArAMoGZf0_dN9Uytj7OOPvWTarevSAv=s96-c",
            "locale": "fr"
        }
    },
    {
        "pk": 2,
        "provider": "facebook",
        "uid": "1586867238341572",
        "last_login": "2022-07-20T12:25:05.092202Z",
        "date_joined": "2022-07-20T12:25:05.092213Z",
        "extra_data": {
            "id": "1586867238341572",
            "first_name": "Al",
            "last_name": "Uness",
            "name": "Uness Al",
            "name_format": "{first} {last}",
            "picture": {
                "data": {
                    "height": 50,
                    "is_silhouette": false,
                    "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1586867238341572&height=50&width=50&ext=1660911904&hash=AeQS7Oy8czvkveM--34",
                    "width": 50
                }
            },
            "short_name": "Al"
        }
    }
]
 */