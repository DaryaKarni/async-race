import { switchToGarage } from "../views/garage/build-garage";
import { switchToWinners } from "../views/winners/build-winners";

type RouteHandler = () => void; 

const routes: Record<string, RouteHandler> = {
  '#/garage': switchToGarage,
  '#/winners': switchToWinners,
};

function getElements() {
  return {
    mainGarage: document.querySelector('#garage'),
    mainWinners: document.querySelector('#winners'),
  };
}

function render(hash: string): void {
  const currentHash = Object.hasOwn(routes, hash) ? hash : '#/garage';
  const handler = routes[currentHash];
  const { mainGarage, mainWinners } = getElements();

  if (currentHash === '#/garage') {
    mainWinners?.classList.add('hidden');
    mainGarage?.classList.remove('hidden');
  } else {
    mainGarage?.classList.add('hidden');
    mainWinners?.classList.remove('hidden');
  }
  
  handler();
}

export function initRouter() {
  const navButtons = document.querySelector('.nav-buttons');
  
  navButtons?.addEventListener('click', (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest<HTMLElement>('.button');
    if (!button) return;

    if (button.dataset.action === 'toGarage') {
      globalThis.location.hash = '#/garage';
    } else if (button.dataset.action === 'toWinners') {
      globalThis.location.hash = '#/winners';
    }
  });

  globalThis.addEventListener('hashchange', () => {
    render(globalThis.location.hash);
  });

  if (!globalThis.location.hash || !Object.hasOwn(routes, globalThis.location.hash)) {
    globalThis.location.hash = '#/garage';
  }

  render(globalThis.location.hash);
}