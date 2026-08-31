import { createFileRoute } from '@tanstack/react-router';
// @ts-expect-error: unrepairable
import { Card, CardContent } from '@/components/ui/card';
// @ts-expect-error: unrepairable
import { Badge } from '@/components/ui/badge';
import { RiTerminalBoxFill } from '@remixicon/react';
import { useTranslation, Trans } from 'react-i18next';

export const Route = createFileRoute('/about')({
  component: About,
  staticData: {
    title: 'O nas',
    hideInNav: false,
    order: 0,
  },
});

export function About() {
  const { t } = useTranslation();
  return (
    <div className={'bg-background'}>
      <section
        id="about"
        className="container mx-auto max-w-4xl px-4 py-16 md:py-24"
      >
        {/*
        bg-muted/50 gives it a very subtle background tint that adapts to
        your light/dark mode automatically, pulling it off the page just a bit.
      */}
        <Card className="border-none bg-muted/50 shadow-sm">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col space-y-6">
              {/* The Badge + Icon instantly gives it that modern shadcn aesthetic */}
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium"
                >
                  <RiTerminalBoxFill className="mr-2 h-4 w-4" />
                  {t('About.badge', 'Kim jesteśmy')}
                </Badge>
              </div>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t('About.title', 'O NAS')}
              </h2>

              <p className="text-lg leading-relaxed text-muted-foreground text-justify text-pretty">
                <Trans i18nKey={'About.paragraph'}>
                  <span>
                    Koło naukowe programistów i miłośników informatyki działa
                    przy Wydziale Mechanicznym Politechniki Krakowskiej. Zrzesza
                    studentów zainteresowanych szeroko rozumianym
                    programowaniem. Organizujemy cotygodniowe zajęcia
                    programowania z{' '}
                    <strong className="bg-(image:--primary) bg-clip-text font-bold text-transparent ">
                      zakresu tworzenia aplikacji internetowych, uczenia
                      maszynowego i analizy danych, cyberbezpieczeństwa oraz
                      programowania niskopoziomowego
                    </strong>
                    . Zajmujemy się również projektami, które pozwalają
                    uczestnikom na rozwój umiejętności programistycznych.
                  </span>
                </Trans>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
