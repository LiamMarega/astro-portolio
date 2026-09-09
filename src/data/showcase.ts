import { minorProjects } from './projects';

// References to existing portfolio records. No invented clients, images or metrics.
const entries = [
  { source: 'Ferox Landing Page', id: 'ferox-web', title: 'Ferox', category: 'Landing page', contribution: 'Desarrollo de la web de presentación de Ferox.', note: 'La puerta de entrada al producto.' },
  { source: 'LamShoes E-commerce', id: 'lamshoes-web', title: 'LamShoes', category: 'E-commerce', contribution: 'Trabajo frontend para una experiencia de compra online.', note: 'El producto, en primer plano.' },
  { source: 'Advantis Dashboard', id: 'advantis-web', title: 'Advantis AI', category: 'Aplicación web', contribution: 'Desarrollo frontend de interfaces con React y TypeScript.', note: 'De la información a la interfaz.' },
];

export const landingProjects = entries.map(({ source, ...entry }) => {
  const project = minorProjects.find((item) => item.text === source);
  if (!project) throw new Error(`Missing portfolio source: ${source}`);
  const href = project.link || project.image;
  return {
    ...entry, image: project.image, href,
    external: /^https?:\/\//.test(href),
    linkLabel: !project.link ? 'Ver captura' : project.link.includes('figma.com') ? 'Ver prototipo' : 'Visitar sitio',
  };
});

export const projectContributions: Record<'es' | 'en', Record<string, string>> = {
  es: {
    ferox: 'Desarrollo mobile en Flutter para la app social de Ferox.',
    advantisAI: 'Desarrollo frontend de interfaces web con React y TypeScript.',
    fmoney: 'Desarrollo frontend para una plataforma de sorteos Web3.',
  },
  en: {
    ferox: 'Flutter mobile development for the Ferox social app.',
    advantisAI: 'Frontend development of web interfaces with React and TypeScript.',
    fmoney: 'Frontend development for a Web3 raffle platform.',
  },
};
