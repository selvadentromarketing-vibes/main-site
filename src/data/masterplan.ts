import type { Lang } from '../i18n/translations';

/**
 * Masterplan hotspot data — the 9 cenotes and 12 experiencias with their
 * bilingual descriptions. Single source shared by:
 *   - MasterplanExplorer (interactive map dots + popups)
 *   - CenotesPage (crawlable prose grid — the SEO surface for the cenotes)
 *   - src/seo/schema.ts (Place/ItemList JSON-LD)
 *
 * px/py are PIXEL coordinates on the 2400×955 map crop (see
 * MasterplanExplorer). If the map asset is replaced, re-verify positions.
 * Copy sourced from the Suspiro Español brochure (June 2026).
 */

export interface Spot {
  id: string;
  n: number;              // printed number on the map legend
  px: number;             // x in pixels on the 2400×955 crop
  py: number;             // y in pixels on the 2400×955 crop
  labelEs: string;
  labelEn: string;
  descEs?: string;
  descEn?: string;
  category: 'experiencia' | 'cenote';
  images: string[];       // 0-2 renders; [] → text-only popup
  imagePosition?: string; // CSS object-position for the popup crop; default center
}

// Shared copy for experiencias printed at several locations
const KIDS = {
  labelEs: 'Kids Jungle', labelEn: 'Kids Jungle',
  descEs: 'Un pequeño mundo dentro de la selva, donde jugar, explorar y descubrir se vuelve parte de cada día.',
  descEn: 'A little world within the jungle, where playing, exploring, and discovering become part of every day.',
  images: ['/map-kids-jungle.jpg'],
};
const PETS = {
  labelEs: 'Pets Jungle', labelEn: 'Pets Jungle',
  descEs: 'Es libertad entre árboles, senderos que invitan a explorar y momentos simples que se sienten más.',
  descEn: 'Freedom between trees, trails that invite exploration, and simple moments that feel like more.',
  images: ['/map-pets-jungle.jpg'],
};
const PABELLON = {
  labelEs: 'Pabellón Holístico', labelEn: 'Holistic Pavilion',
  descEs: 'Cada rincón fue pensado para sentirse. Aquí, la naturaleza no rodea, abraza.',
  descEn: 'Every corner designed to be felt. Here, nature doesn’t surround — it embraces.',
  images: ['/map-pabellon.jpg'],
};

export const SPOTS: Spot[] = [
  // ─── EXPERIENCIAS (dark dots 1-12) ───────────────────────────
  {
    id: 'acceso', n: 1, px: 2352, py: 523,
    labelEs: 'Acceso', labelEn: 'Access',
    descEs: 'Un ingreso enmarcado por la selva — donde comienza otra manera de llegar a casa.',
    descEn: 'A jungle-framed arrival — where a new way of coming home begins.',
    category: 'experiencia', images: ['/map-acceso.jpg'],
  },
  {
    id: 'mirador', n: 2, px: 2283, py: 664,
    labelEs: 'Mirador', labelEn: 'Lookout',
    descEs: 'Un mirador suspendido entre la selva y el cenote, donde cada paso revela una nueva perspectiva.',
    descEn: 'A lookout suspended between jungle and cenote, where every step reveals a new perspective.',
    category: 'experiencia', images: ['/map-mirador.jpg'],
    imagePosition: 'top left',
  },
  { id: 'kids-1', n: 3, px: 359,  py: 460, category: 'experiencia', ...KIDS },
  { id: 'kids-2', n: 3, px: 933,  py: 488, category: 'experiencia', ...KIDS },
  { id: 'kids-3', n: 3, px: 1480, py: 480, category: 'experiencia', ...KIDS },
  { id: 'kids-4', n: 3, px: 1925, py: 453, category: 'experiencia', ...KIDS },
  { id: 'kids-5', n: 3, px: 2117, py: 466, category: 'experiencia', ...KIDS },
  { id: 'pets-1', n: 4, px: 382,  py: 486, category: 'experiencia', ...PETS },
  { id: 'pets-2', n: 4, px: 934,  py: 531, category: 'experiencia', ...PETS },
  { id: 'pets-3', n: 4, px: 1480, py: 512, category: 'experiencia', ...PETS },
  { id: 'pets-4', n: 4, px: 1924, py: 492, category: 'experiencia', ...PETS },
  {
    id: 'jungle-gym', n: 5, px: 1828, py: 471,
    labelEs: 'Jungle Gym', labelEn: 'Jungle Gym',
    descEs: 'Un espacio para el cuerpo, rodeado de selva viva.',
    descEn: 'A space for the body, surrounded by living jungle.',
    category: 'experiencia', images: ['/map-jungle-gym.jpg'],
  },
  {
    id: 'padel', n: 6, px: 1713, py: 470,
    labelEs: 'Cancha de pádel y pickleball', labelEn: 'Padel & pickleball court',
    descEs: 'Un espacio donde la energía y la naturaleza se encuentran. Canchas rodeadas de selva, pensadas para disfrutar el juego a otro ritmo.',
    descEn: 'Where energy meets nature. Courts framed by jungle — designed to play at a different pace.',
    category: 'experiencia', images: ['/map-padel.jpg'],
  },
  { id: 'pabellon-1', n: 7, px: 850,  py: 586, category: 'experiencia', ...PABELLON },
  { id: 'pabellon-2', n: 7, px: 1545, py: 460, category: 'experiencia', ...PABELLON },
  {
    id: 'village-comercial', n: 8, px: 1396, py: 456,
    labelEs: 'Village Comercial', labelEn: 'Commercial Village',
    descEs: 'Un pequeño pueblo dentro de la selva — servicios y encuentros a un paso de casa.',
    descEn: 'A little village within the jungle — services and encounters a step from home.',
    category: 'experiencia', images: ['/map-village.jpg'],
  },
  {
    id: 'casa-arbol', n: 9, px: 764, py: 570,
    labelEs: 'Casa del Árbol', labelEn: 'Treehouse',
    descEs: 'Un refugio elevado entre las ramas — para contemplar la selva desde adentro.',
    descEn: 'An elevated refuge among the branches — to contemplate the jungle from within.',
    category: 'experiencia', images: ['/map-casa-arbol.jpg'],
  },
  {
    id: 'jungle-bar', n: 10, px: 764, py: 611,
    labelEs: 'Jungle Bar', labelEn: 'Jungle Bar',
    descEs: 'Cócteles artesanales y textura natural — el punto de encuentro sin prisa.',
    descEn: 'Craft cocktails and natural texture — the unhurried meeting point.',
    category: 'experiencia', images: ['/map-jungle-bar.jpg'],
  },
  {
    id: 'casa-cenotes', n: 11, px: 514, py: 420,
    labelEs: 'Casa de los Cenotes', labelEn: 'Casa de los Cenotes',
    descEs: 'El alma social del entorno — restaurante, bar alberca y playas. Una alberca que se funde con los cenotes.',
    descEn: 'The social heart — restaurant, pool bar, and beaches. A pool that merges with the cenotes.',
    category: 'experiencia', images: ['/map-casa-cenotes.jpg'],
  },
  {
    id: 'wellness', n: 12, px: 421, py: 395,
    labelEs: 'Wellness center', labelEn: 'Wellness center',
    descEs: 'Refugios escondidos entre la selva, donde el agua cristalina y el silencio crean un momento de calma absoluta.',
    descEn: 'Hidden refuges within the jungle, where crystalline water and silence create a moment of absolute calm.',
    category: 'experiencia', images: ['/map-wellness.jpg'],
  },

  // ─── CENOTES (cyan dots 1-9) ─────────────────────────────────
  {
    id: 'cenote-mirador', n: 1, px: 2181, py: 684,
    labelEs: 'Cenote Mirador', labelEn: 'Cenote Mirador',
    descEs: 'Un cenote contemplado desde una torre suspendida entre la selva.',
    descEn: 'A cenote contemplated from a tower suspended in the jungle.',
    category: 'cenote', images: ['/map-cenote-mirador.jpg'],
  },
  {
    id: 'cenote-playa', n: 2, px: 824, py: 500,
    labelEs: 'Cenote Playa', labelEn: 'Cenote Playa',
    descEs: 'Un refugio natural donde la arena, la luz y el silencio crean un paisaje que se siente más que se observa.',
    descEn: 'A natural refuge where sand, light, and silence create a landscape felt more than observed.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-piedra', n: 3, px: 672, py: 600,
    labelEs: 'Cenote Piedra', labelEn: 'Cenote Piedra',
    descEs: 'El silencio de la roca antigua y el reflejo cristalino del agua.',
    descEn: 'The silence of ancient rock and the crystalline reflection of water.',
    category: 'cenote', images: ['/map-cenote-piedra.jpg'],
  },
  {
    id: 'cenote-luz', n: 4, px: 686, py: 680,
    labelEs: 'Cenote Luz', labelEn: 'Cenote Luz',
    descEs: 'Donde el rayo del sol descubre el agua a mediodía.',
    descEn: 'Where the sun’s ray reveals the water at noon.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-azul', n: 5, px: 565, py: 730,
    labelEs: 'Cenote Azul', labelEn: 'Cenote Azul',
    descEs: 'El azul más profundo de Selvadentro — inmersión total.',
    descEn: 'The deepest blue in Selvadentro — total immersion.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-selva', n: 6, px: 609, py: 624,
    labelEs: 'Cenote Selva', labelEn: 'Cenote Selva',
    descEs: 'Enterrado entre raíces — cada gota, un eco de la selva.',
    descEn: 'Buried among roots — each drop, an echo of the jungle.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-madera', n: 7, px: 456, py: 445,
    labelEs: 'Cenote Madera', labelEn: 'Cenote Madera',
    descEs: 'Espacios donde desconectas del exterior para conectar contigo.',
    descEn: 'Spaces where you disconnect from the outside to connect with yourself.',
    category: 'cenote', images: ['/map-cenote-madera.jpg'],
  },
  {
    id: 'cenote-vida', n: 8, px: 527, py: 357,
    labelEs: 'Cenote Vida', labelEn: 'Cenote Vida',
    descEs: 'Un pulso azul que respira con la selva.',
    descEn: 'A blue pulse breathing with the jungle.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-caverna', n: 9, px: 408, py: 357,
    labelEs: 'Cenote Caverna', labelEn: 'Cenote Caverna',
    descEs: 'Una catedral de piedra donde la luz y el agua se encuentran.',
    descEn: 'A cathedral of stone where light and water meet.',
    category: 'cenote', images: ['/map-cenote-caverna.jpg'],
  },
];

/**
 * Real pixel size of every image referenced above, so each render site can
 * declare honest width/height instead of one guessed pair (the files run
 * from 900×1200 portrait to 1200×600 landscape). Asserted by
 * scripts/check-static.mjs against the files on disk.
 */
export const SPOT_IMAGE_DIMS: Record<string, { width: number; height: number }> = {
  '/map-acceso.jpg': { width: 1200, height: 600 },
  '/map-casa-arbol.jpg': { width: 1200, height: 792 },
  '/map-casa-cenotes.jpg': { width: 1200, height: 675 },
  '/map-cenote-caverna.jpg': { width: 1024, height: 768 },
  '/map-cenote-madera.jpg': { width: 1200, height: 675 },
  '/map-cenote-mirador.jpg': { width: 900, height: 1200 },
  '/map-cenote-piedra.jpg': { width: 1200, height: 800 },
  '/map-jungle-bar.jpg': { width: 1200, height: 675 },
  '/map-jungle-gym.jpg': { width: 1200, height: 675 },
  '/map-kids-jungle.jpg': { width: 1200, height: 761 },
  '/map-mirador.jpg': { width: 1200, height: 900 },
  '/map-pabellon.jpg': { width: 1200, height: 900 },
  '/map-padel.jpg': { width: 1200, height: 675 },
  '/map-pets-jungle.jpg': { width: 1200, height: 771 },
  '/map-village.jpg': { width: 1200, height: 800 },
  '/map-wellness.jpg': { width: 1200, height: 675 },
};

export const CENOTES = SPOTS.filter((s) => s.category === 'cenote');

/** Unique experiencias (Kids/Pets/Pabellón repeat as map dots — dedupe by n). */
export const EXPERIENCIAS = SPOTS.filter(
  (s, i, arr) =>
    s.category === 'experiencia' &&
    arr.findIndex((o) => o.category === 'experiencia' && o.n === s.n) === i,
);

export const spotLabel = (s: Spot, lang: Lang) => (lang === 'es' ? s.labelEs : s.labelEn);
export const spotDesc = (s: Spot, lang: Lang) => (lang === 'es' ? s.descEs : s.descEn);
