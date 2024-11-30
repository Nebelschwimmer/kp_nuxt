import ru_messages from "./locales/ru-RU";
import en_messages from "./locales/en-US";
import fr_messages from "./locales/fr-FR";


export default defineI18nConfig(() => ({
	legacy: false,
	locale: "ru",
	messages: {
		en: en_messages,

		fr: fr_messages,

		ru: ru_messages,
	},
}));
