/** Brand strings every card prints (from src/content/site.ts: name, brand, url). */
import { useContent } from '../../content/site';

const { site: s } = useContent('es');
export const site = { name: s.name, brand: s.brand, domain: new URL(s.url).host.replace(/^www\./, '') };
