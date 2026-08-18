import { updateGarage } from "../views/garage/build-garage";
import { updateWinners } from "../views/winners/build-winners";

type RouteHandler = () => void; 

const routes: Record<string, RouteHandler> = {
  '/': updateGarage,
  '/garage': updateGarage,
  '/winners': updateWinners,
}
const mainGarage = document.querySelector('#garage');
const mainWinners = document.querySelector('#winners');
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
    if(button.dataset.action === 'toGarage'){
      history.pushState(null, '', '/garage');
    } else if (button.dataset.action === 'toWinners'){
      history.pushState(null, '', '/winners');
    }
    render(globalThis.location.pathname);
  });

  globalThis.addEventListener('popstate', () => {
    render(globalThis.location.pathname);
  });

  if(globalThis.location.pathname === '/' || globalThis.location.pathname === ''){
    history.replaceState(null, '', '/garage');
  }
  render(globalThis.location.pathname);
}