import * as lucide from 'lucide-static';

/** Inline SVG of a Lucide icon (https://lucide.dev/icons), sized by CSS. */
export function icon(name: string, extra = ''): string {
  const svg = (lucide as Record<string, string>)[name];
  if (!svg) throw new Error(`Unknown Lucide icon: ${name}`);
  return svg
    .replace(/\s(width|height)="24"/g, '')
    .replace('class="', `aria-hidden="true" ${extra} class="`);
}
