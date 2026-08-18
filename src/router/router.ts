import { updateGarage } from "../views/garage/build-garage";
import { updateWinners } from "../views/winners/build-winners";

type RouteHandler = () => void; 

const routes: Record<string, RouteHandler> = {
  '/garage': updateGarage,
  '/winners': updateWinners,
}

function render(path: string): void{
  const handler = routes[path];
  if(handler){
    handler();
  }
}

const mainGarage = document.querySelector('#garage');
const mainWinners = document.querySelector('#winners');
const navButtons = document.querySelector('.nav-buttons');
navButtons?.addEventListener('click', (event: Event) => {
  const target = event.target;
  if(!(target instanceof HTMLElement)) return;
  const button = target.closest<HTMLElement>('.button');
  if(!button) return;
  event.preventDefault();
  if(button.dataset.action === 'toGarage'){
    history.pushState(null, '', '/garage');
    mainWinners?.classList.add('hidden');
    mainGarage?.classList.remove('hidden');
  } else if (button.dataset.action === 'toWinners'){
    history.pushState(null, '', '/winners');
    mainWinners?.classList.remove('hidden');
    mainGarage?.classList.add('hidden');
  }
  render(globalThis.location.pathname);
});

globalThis.addEventListener('popstate', () => {
  render(globalThis.location.pathname);
})