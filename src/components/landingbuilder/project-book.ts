/** Progressive enhancement: no page gate, storage, global keyboard handler or animation library. */
export class ProjectScrapbook extends HTMLElement {
  private listeners?: AbortController;

  connectedCallback() {
    queueMicrotask(() => { if (this.isConnected && !this.listeners) this.setup(); });
  }

  disconnectedCallback() {
    this.listeners?.abort();
    this.listeners = undefined;
  }

  private setup() {
    const cover = this.querySelector<HTMLElement>('[data-book-cover]');
    const pages = this.querySelector<HTMLElement>('[data-book-pages]');
    const panels = Array.from(this.querySelectorAll<HTMLElement>('[data-book-panel]'));
    const launch = this.querySelector<HTMLButtonElement>('[data-book-open]');
    const controls = this.querySelector<HTMLElement>('[data-book-controls]');
    const prev = this.querySelector<HTMLButtonElement>('[data-book-prev]');
    const next = this.querySelector<HTMLButtonElement>('[data-book-next]');
    const close = this.querySelector<HTMLButtonElement>('[data-book-close]');
    const list = this.querySelector<HTMLButtonElement>('[data-book-list]');
    const count = this.querySelector<HTMLElement>('[data-book-count]');
    const status = this.querySelector<HTMLElement>('[data-book-status]');
    // Keep the static HTML usable if a future template edit removes a required control.
    if (!cover || !pages || !panels.length || !launch || !controls || !prev || !next || !close || !list || !count || !status) return;
    this.listeners = new AbortController();
    const options = { signal: this.listeners.signal };
    let open = false;
    let listView = false;
    let active = 0;

    const render = (announce = true) => {
      this.dataset.enhanced = 'true';
      this.dataset.open = String(open && !listView);
      this.dataset.view = listView ? 'list' : 'book';
      cover.hidden = listView;
      launch.hidden = open || listView;
      launch.setAttribute('aria-expanded', String(open));
      pages.hidden = !open && !listView;
      panels.forEach((panel, index) => { panel.hidden = !listView && (!open || index !== active); });
      controls.hidden = !open || listView;
      prev.disabled = active === 0;
      next.disabled = active === panels.length - 1;
      count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
      list.hidden = false;
      list.textContent = listView ? 'Volver al cuaderno' : 'Ver proyectos en lista';
      list.setAttribute('aria-pressed', String(listView));
      if (announce) status.textContent = listView ? 'Todos los proyectos están visibles.' : open
        ? `Proyecto ${active + 1} de ${panels.length}: ${panels[active].dataset.title}.`
        : 'Cuaderno cerrado.';
    };
    const go = (index: number) => {
      const focused = document.activeElement;
      active = Math.max(0, Math.min(index, panels.length - 1)); render();
      // Do not leave keyboard focus on a newly disabled boundary control.
      if (focused === prev && prev.disabled) (next.disabled ? close : next).focus({ preventScroll: true });
      if (focused === next && next.disabled) (prev.disabled ? close : prev).focus({ preventScroll: true });
    };
    launch.addEventListener('click', () => { open = true; render(); close.focus({ preventScroll: true }); }, options);
    close.addEventListener('click', () => { open = false; render(); launch.focus({ preventScroll: true }); }, options);
    prev.addEventListener('click', () => go(active - 1), options);
    next.addEventListener('click', () => go(active + 1), options);
    list.addEventListener('click', () => { listView = !listView; render(); }, options);
    controls.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement).closest('input, select, textarea, [contenteditable]')) return;
      const destinations: Record<string, number> = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: panels.length - 1 };
      if (event.key in destinations) { event.preventDefault(); go(destinations[event.key]); }
      if (event.key === 'Escape') { event.preventDefault(); close.click(); }
    }, options);
    render(false);
  }
}

if (!customElements.get('project-scrapbook')) customElements.define('project-scrapbook', ProjectScrapbook);
