export const INPUT_REQUIRED = 'Ce champ est obligatoire.';
export const SHORT_INPUT_REQUIRED = 'Obligatoire.';
export const INPUT_MIN = (char: number) => `Assurez-vous que ce champ comporte au moin ${char} caractères.`;
export const INPUT_MAX = (char: number) => `Assurez-vous que ce champ comporte au plus ${char} caractères.`;
export const INPUT_IMG_MIN = (char: number) => `Assurez-vous que ce champ comporte au plus ${char} images.`;
export const INPUT_PONE = "Assurez-vous que ce champ comporte votre téléphone ex: 0610203040";
export const INPUT_EMAIL = "Assurez-vous que ce champ comporte votre email ex: abc@gmail.com";
export const INPUT_URL = "Assurez-vous que ce champ comporte un lien valide ex: http(s)://abc.com";
export const INPUT_FACEBOOK_URL = "Assurez-vous que ce champ comporte un lien valide ex: http://facebook.com/MaPage";
export const INPUT_INSTAGRAM_URL = "Assurez-vous que ce champ comporte un lien valide ex: http://instagram.com/MaPage";
export const INPUT_TWITTER_URL = "Assurez-vous que ce champ comporte un lien valide ex: http://twitter.com/MaPage";
export const IMAGE_COUNT_LIMIT_REACHED = (char: number) => `Le nombre d'images sélectionnées dépasse ${char} images.`;
export const IMAGE_FORMAT = "Seulement les images du type jpg, png, jpeg, sont autorisé.";
export const IMAGE_SIZE_LIMIT_REACHED = "La taille d'image sélectionné dépasse 1mg";
export const INPUT_EMAIL_ALREADY_EXISTS = "Un utilisateur avec ce champ adresse électronique existe déjà."
export const INPUT_PASSWORD_MIN = (char: number) => `Ce mot de passe est trop court. Il doit contenir au moins ${char} caractères`;