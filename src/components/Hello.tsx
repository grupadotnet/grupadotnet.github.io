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
  // Accept an array of options (with some fallbacks)
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
  const [isFinished, setIsFinished] = useState(false);

  const typewritterRef = useRef(null);

  useEffect(() => {
    // 1. Array to hold timeout IDs so we can clean them up if the component unmounts
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    // 2. Start at 0ms delay
    let accumulatedDelay = 0;

    // 3. Loop based on the length of the invisible text
    for (let i = 0; i < textState.invisible.length; i++) {
      // Generate a random delay between 50ms and 200ms
      const randomTime = Math.floor(Math.random() * 150) + 50;

      // Add it to the running total so they execute in order
      accumulatedDelay += randomTime;

      const id = setTimeout(() => {
        // MUST use the 'prev' callback version of setState here
        // Otherwise, every timeout uses the initial empty string state
        setTextState((prev) => helloAnimStep(prev));
      }, accumulatedDelay);

      timeoutIds.push(id);
    }

    const finishId = window.setTimeout(() => {
      setIsFinished(true);
    }, accumulatedDelay);

    timeoutIds.push(finishId);
    // 4. Cleanup function to prevent memory leaks if the user leaves the page early
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []); // Empty array ensures this only runs ONCE on load

  return (
    <div
      className={
        'lg:text-9xl text-6xl ml-[10dvw] text-balance text-white w-2/3'
      }
    >
      <span className={cn(className)}>{textState.visible}</span>
      {/* Optional: Render invisible text with 0 opacity to keep layout stable */}
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
