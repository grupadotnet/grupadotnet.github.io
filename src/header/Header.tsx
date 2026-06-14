import Logo from '../assets/icons/Logo_KNPiMI.svg';
import Logo_White from '../assets/icons/Logo_KNPiMI_white.svg';
import Logo_with_text from '../assets/icons/Logo_KNPiMI_with_text.svg';
import Logo_White_with_text from '../assets/icons/Logo_KNPiMI_white_with_text.svg';
import Burger from '../assets/icons/hamburger-icon-gradient.svg';
import Burger_White from '../assets/icons/hamburger-icon.svg';
import { Button } from '../components/button/button.tsx';
import { useWindowSize } from '../components/useWindowSize.tsx';
import { useCallback, useState } from 'react';
import { useOnInView } from 'react-intersection-observer';

export function Header() {
  const names = ['O NAS', 'SEKCJE', 'PROJEKTY', 'PARTNERZY', 'KONTAKT'];
  const pointers = names.map((name) => {
    name = '#' + name.replaceAll(' ', '_');
    return name;
  });

  const { width } = useWindowSize();
  const [ColorScheme, setColorScheme] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [burgerShow, setburgerShow] = useState<boolean>(false);

  const BurgerShow = () => {
    setburgerShow((prev) => !prev);
    if (!isInView) {
      setColorScheme((prev) => !prev);
    }
  };
  const handleHeaderInView = useCallback((inView: boolean) => {
    setIsInView(!inView);
    setColorScheme(!inView);
  }, []);
  const HeaderInViewRef = useOnInView(handleHeaderInView, {
    threshold: 0.2,
    rootMargin: '200px 0px 0px 0px',
  });

  const LogoSVG = ColorScheme
    ? [Logo, Logo_with_text]
    : [Logo_White, Logo_White_with_text];
  const BurgerSVG = ColorScheme ? Burger : Burger_White;

  return (
    <div
      id={'header'}
      className={`relative sticky-top ${ColorScheme ? 'opaque' : 'transparent'}`}
      ref={HeaderInViewRef}
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
                  {names[i]}
                </Button>
              ))}
            </div>
          ) : (
            <div
              className={
                'cursor-pointer flex size-20 items-center justify-center'
              }
              onClick={BurgerShow}
            >
              <img className={'max-w-5xl h-8'} src={BurgerSVG} alt={'Menu'} />
            </div>
          )}
        </nav>
      </div>
      <div
        className={`flex fixed top-29 flex-col items-center burger ${burgerShow ? 'show' : ''}`}
      >
        {width <= 768 &&
          pointers.map((pointer, i) => (
            <Button key={pointer} target={pointer}>
              {names[i]}
            </Button>
          ))}
      </div>
    </div>
  );
}
