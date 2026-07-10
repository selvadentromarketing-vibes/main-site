import type { Lang } from '../i18n/translations';

interface Props {
  lang: Lang;
}

const WA_NUMBER = '529994890828';

const MESSAGE: Record<Lang, string> = {
  es: '¡Hola! Entré a su página y me interesa conocer más sobre Selvadentro — ¿me pueden contar sobre los lotes disponibles?',
  en: 'Hi! I just visited your website and I’d love to know more about Selvadentro — could you tell me about the available lots?',
};

export default function WhatsappSticky({ lang }: Props) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(MESSAGE[lang])}`;
  const aria = lang === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/25 hover:shadow-black/40 hover:scale-105 transition-all duration-300 ring-1 ring-black/5"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden
        className="relative w-7 h-7 sm:w-8 sm:h-8"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.79 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.708.888.616 0 1.532-.11 1.849-.888.06-.144.132-.331.187-.475.098-.276.226-.567.226-.885 0-.34-.087-.53-.446-.694-.373-.16-.94-.4-1.288-.573-.114-.056-.213-.086-.286-.086zM16.01 3C8.83 3 3 8.815 3 16.01c0 2.35.674 4.7 1.878 6.678l.286.457-1.216 4.44 4.583-1.19.443.257A12.968 12.968 0 0 0 16.007 29C23.204 29 29 23.185 29 15.99 29 8.804 23.209 3 16.011 3zm0 23.7c-2.107 0-4.13-.559-5.878-1.632l-.42-.257-4.354 1.14 1.16-4.24-.272-.43A10.667 10.667 0 0 1 4.3 15.99c0-6.446 5.246-11.7 11.71-11.7 6.462 0 11.694 5.254 11.694 11.7-.001 6.46-5.253 11.71-11.702 11.71z" />
      </svg>
    </a>
  );
}
