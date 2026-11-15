/** Minimal hyperscript for satori element trees (no JSX needed in a .ts file). */
export type Style = Record<string, string | number | undefined>;
export interface VNode {
  type: string;
  props: { style?: Style; children?: unknown; [k: string]: unknown };
}
export type Child = VNode | string | false | null | undefined;

/** `div` with flex layout by default (satori requires `display: flex` on any element with several children). */
export function h(style: Style, ...children: Child[]): VNode {
  const kids = children.filter((c) => c !== false && c !== null && c !== undefined);
  return { type: 'div', props: { style: { display: 'flex', ...style }, children: kids.length === 1 ? kids[0] : kids } };
}

/** Inline text-only node (`span`): never a flex container. */
export function span(style: Style, text: string): VNode {
  return { type: 'span', props: { style, children: text } };
}

export function img(src: string, width: number, height: number, style: Style = {}): VNode {
  return { type: 'img', props: { src, width, height, style: { width, height, ...style } } };
}
