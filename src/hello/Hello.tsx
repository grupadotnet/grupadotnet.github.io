import { useEffect, useRef, useState } from 'react';

const PHRASES = [
  'POZNAJ NASZE KOŁO NAUKOWE!',
  'ZBUDUJ Z NAMI COŚ NIESAMOWITEGO.',
  'ROZWIJAJ Z NAMI SWOJE PASJE!',
];

export default function Hello() {
  const [text] = useState(() => {
    const randomIndex = Math.floor(Math.random() * PHRASES.length);
    return PHRASES[randomIndex];
  });
  const [id, setId] = useState<number>(0);
  const PredictionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typewriterInterval = setInterval(() => {
      setId((prevId) => {
        if (prevId >= text.length) {
          clearInterval(typewriterInterval);
          PredictionRef.current?.classList.add('before:animate-(--blink)');
          return prevId;
        }
        //console.log(prevId + 1);
        return prevId + 1;
      });
    }, 125);

    return () => clearInterval(typewriterInterval);
  }, [text.length]);

  const textVisible = text.slice(0, id);
  const textPrediction = text.slice(id, text.length).split(' ')[0];
  const textInvisible = text.slice(id + 1 + textPrediction.length, text.length);

  return (
    <>
      <div className={'h-screen w-full flex'} id={'HELLO'}>
        <p
          className={
            'text-[clamp(3rem,7vw,8rem)] mt-[35vh] w-7/8 m-auto text-balance text-white font-(family-name:--font-family-monospace)'
          }
        >
          <span className={''}>{textVisible}</span>
          <span
            id={'TextPrediction'}
            className={' text-gray-400 '}
            ref={PredictionRef}
          >
            {textPrediction}
          </span>
          <span className={'text-transparent'}>{textInvisible}</span>
        </p>
      </div>
    </>
  );
}
