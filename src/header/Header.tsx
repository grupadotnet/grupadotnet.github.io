import Logo from '../assets/icons/Logo_KNPiMI.svg';
import Logo_White from '../assets/icons/Logo_KNPiMI_white.svg';
import Logo_with_text from '../assets/icons/Logo_KNPiMI_with_text.svg';
import Logo_White_with_text from '../assets/icons/Logo_KNPiMI_white_with_text.svg';
import Burger from '../assets/icons/hamburger-icon-gradient.svg';
import Burger_White from '../assets/icons/hamburger-icon.svg';
import { Button } from '../components/button/button.tsx';
import { useWindowSize } from '../components/useWindowSize.tsx';
import { useEffect, useRef, useState } from 'react';

const SCROLL_THRESHOLD = 200;
const NAMES = ['O NAS', 'SEKCJE', 'PROJEKTY', 'PARTNERZY', 'KONTAKT'];
export function Header() {
  const pointers = NAMES.map((name) => {
    name = '#' + name.replaceAll(' ', '_');
    return name;
  });

  const { width } = useWindowSize();
  const [ColorScheme, setColorScheme] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [burgerShow, setburgerShow] = useState<boolean>(false);
  const HeaderRef = useRef<HTMLDivElement>(null);
  const handleBurgerToggle = () => {
    setburgerShow((prev) => !prev);

    const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;
    if (!isPastThreshold) {
      setColorScheme((prev) => !prev);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    const handleScroll = () => {
      const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;
      setColorScheme(isPastThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const LogoSVG = ColorScheme
    ? [Logo, Logo_with_text]
    : [Logo_White, Logo_White_with_text];
  const BurgerSVG = ColorScheme ? Burger : Burger_White;

  return (
    <div
      id={'header'}
      className={`relative sticky-top ${ColorScheme ? 'opaque' : 'transparent'} ${isLoaded ? 'animated' : ''}`}
      ref={HeaderRef}
    >
      <div className={' fixed h-29 flex top-0 left-0 right-0 items-center'}>
        <nav
          className={`flex font(--font-family) ${width > 768 ? 'w-7/8' : 'w-11/12'} items-center place-content-between m-auto`}
        >
          <a href="/">
            <img
              srcSet={width > 1100 ? LogoSVG[1] : LogoSVG[0]}
              alt={'logo'}
              className={'max-w-5xl h-24'}
            />
          </a>
          {width > 768 ? (
            <div className={'flex items-center'}>
              {pointers.map((pointer, i) => (
                <Button key={pointer} target={pointer}>
                  {NAMES[i]}
                </Button>
              ))}
            </div>
          ) : (
            <button
              className={
                'cursor-pointer flex size-20 items-center justify-center'
              }
              tabIndex={0}
              type="button"
              onClick={handleBurgerToggle}
            >
              <img className={'max-w-5xl h-8'} src={BurgerSVG} alt={'Menu'} />
            </button>
          )}
        </nav>
      </div>
      <div
        className={`flex fixed top-29 flex-col items-center burger ${burgerShow ? 'show' : ''}`}
      >
        {width <= 768 &&
          pointers.map((pointer, i) => (
            <Button key={pointer} target={pointer}>
              {NAMES[i]}
            </Button>
          ))}
      </div>
    </div>
  );
}
