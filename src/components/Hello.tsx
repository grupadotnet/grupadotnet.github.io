'use client';
import { RiArrowDownSLine } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
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
    i18next.t('Hello.message.1', 'Poznaj nasze Koło Naukowe!'),
    i18next.t('Hello.message.2', 'Twórz z nami zajebiste projekty!'),
  ],
}: {
  options?: string[];
  className?: string;
}) => {
  const [textState, setTextState] = useState(() => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return {
      visible: '',
      invisible: options[randomIndex],
    };
  });

  // Derived directly — true when typing is complete, no extra state or effect triggers needed
  const isFinished = textState.invisible.length === 0;

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
    <div
      className={
        'lg:text-9xl text-6xl ml-[10dvw] text-balance text-white w-2/3'
      }
    >
      <span className={cn(className)} id={'hero-section'}>
        {textState.visible}
      </span>
      <span
        className={`border-l-4 border-white text-transparent ${isFinished ? 'animate-caret-blink' : ''}`}
        ref={typewritterRef}
      >
        {textState.invisible}
      </span>
    </div>
  );
};
export function Hello() {
  // @ts-expect-error: unrepairable
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={'h-[91dvh] w-full grid grid-rows-[1fr_auto]'}>
      <section className={'flex items-center'}>
        <Typewriter />
      </section>
      <div className={'flex justify-center items-end mb-20'}>
        <a href={'#about'} onClick={handleScroll}>
          <RiArrowDownSLine />
        </a>
      </div>
    </div>
  );
}
