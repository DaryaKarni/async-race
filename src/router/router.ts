import { switchToGarage } from "../views/garage/build-garage";

import { switchToWinners} from "../views/winners/build-winners";

type RouteHandler = () => void; 

const routes: Record<string, RouteHandler> = {
  '/': switchToGarage,
  '/garage': switchToGarage,
  '/winners': switchToWinners,
}

const mainGarage = document.querySelector('#garage');
const mainWinners = document.querySelector('#winners');

const getNormalizedPath = (): string => {
  const base = import.meta.env.BASE_URL;
  return globalThis.location.pathname.replace(base, '/');
};

function render(path: string): void{
  const handler = routes[path] || routes['/garage'];
  if(path === '/garage'){
    mainWinners?.classList.add('hidden');
    mainGarage?.classList.remove('hidden');
  } else{
    mainWinners?.classList.remove('hidden');
    mainGarage?.classList.add('hidden');
  }
  handler();
}
export function initRouter(){
  const navButtons = document.querySelector('.nav-buttons');
  navButtons?.addEventListener('click', (event: Event) => {
    const target = event.target;
    if(!(target instanceof HTMLElement)) return;
    const button = target.closest<HTMLElement>('.button');
    if(!button) return;
    event.preventDefault();

    const base = import.meta.env.BASE_URL;

    if(button.dataset.action === 'toGarage'){
      history.pushState(null, '', `${base}garage`);
    } else if (button.dataset.action === 'toWinners'){
      history.pushState(null, '', `${base}winners`);
    }
    render(getNormalizedPath());
  });

  globalThis.addEventListener('popstate', () => {
    render(getNormalizedPath());
  });

  const currentPath = getNormalizedPath();
  if(currentPath === '/' || currentPath === ''){
    history.replaceState(null, '', `${import.meta.env.BASE_URL}garage`);
  }
  render(globalThis.location.pathname);
}