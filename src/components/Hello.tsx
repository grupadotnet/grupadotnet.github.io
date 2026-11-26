'use client';
import { RiArrowDownSLine } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { cn } from '../lib/utils.ts';

const helloAnimStep = (params: { visible: string; invisible: string }) => {
  // Grab the first character from invisible
  if (params.invisible.length === 0) return params;
  return {
    visible: params.visible + params.invisible.charAt(0),
    invisible: params.invisible.slice(1),
  };
};

const Typewriter = ({
  className = '',
  options = [
    i18next.t('Hello.1', 'Poznaj nasze Koło Naukowe!'),
    i18next.t('Hello.2', 'Twórz z nami super projekty!'),
    i18next.t('Hello.3', 'Zdobądź praktyczne doświadczenie pracy w zespole!'),
    i18next.t('Hello.4', 'Rozwijaj z nami swoje pasje i umiejętności!'),
    i18next.t('Hello.5', 'Dołącz do nas i zacznij działać!'),
  ],
}: {
  options?: string[];
  className?: string;
}) => {
  const [textState, setTextState] = useState(() => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const chosen = options[randomIndex];
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      visible: prefersReducedMotion ? chosen : '',
      invisible: prefersReducedMotion ? '' : chosen,
    };
  });

  // Derived directly — true when typing is complete, no extra state or effect triggers needed
  const isFinished = textState.invisible.length === 0;
  const fullText = textState.visible + textState.invisible;

  const typewritterRef = useRef(null);

  useEffect(() => {
    if (isFinished) return;

    const randomTime = Math.floor(Math.random() * 150) + 50;

    const timer = setTimeout(() => {
      setTextState((prev) => helloAnimStep(prev));
    }, randomTime);

    return () => clearTimeout(timer);
  }, [isFinished, textState.invisible]);

  return (
    <h1
      className={
        'lg:text-9xl text-6xl ml-[10dvw] text-balance text-white w-2/3'
      }
      aria-label={fullText}
    >
      <span className={cn(className)} id={'hero-section'} aria-hidden="true">
        {textState.visible}
      </span>
      <span
        aria-hidden="true"
        className={`border-l-4 border-white text-transparent ${isFinished ? 'animate-caret-blink motion-reduce:animate-none' : ''}`}
        ref={typewritterRef}
      >
        {textState.invisible}
      </span>
    </h1>
  );
};
const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  if (!targetId) return;
  try {
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches
        ? 'auto'
        : 'smooth';
      targetElement.scrollIntoView({ behavior, block: 'center' });
      if (targetElement instanceof HTMLElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    }
  } catch {
    // Ignore invalid CSS selector
  }
};

export function Hello() {
  const { t } = useTranslation();

  return (
    <div
      className={'h-[91dvh] w-full grid grid-rows-[1fr_auto] bg-transparent'}
    >
      <section className={'flex items-center'}>
        <Typewriter />
      </section>
      <div className={'flex justify-center items-end mb-20'}>
        <a
          href={'#harmonogram'}
          onClick={handleScroll}
          className={
            'inline-flex items-center justify-center rounded-full p-2 text-white transition duration-200 ease-in-out hover:-translate-y-1.5 hover:scale-125'
          }
          aria-label={t('Hello.scrollDown', 'Przejdź do harmonogramu')}
        >
          <RiArrowDownSLine aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
