import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider.tsx';
import {
  RiArrowRightUpLine,
  RiChatSmile2Line,
  RiCheckLine,
  RiDiscordFill,
  RiFacebookBoxLine,
  RiFileCopyLine,
  RiLinkedinBoxLine,
  RiMailSendLine,
  RiMastodonLine,
} from '@remixicon/react';

export const Route = createFileRoute('/contact')({
  component: Contact,
  staticData: {
    titleData: extractTranslation('Pages.Contact.navbarTitle', 'Kontakt'),
    hideInNav: false,
    order: 4,
  },
});

function MatrixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3H4v18h3" />
      <path d="M17 3h3v18h-3" />
      <path d="M8 15V9l4 4 4-4v6" />
    </svg>
  );
}

const cardClass =
  'group h-full justify-between border-none bg-muted/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70';

const iconBoxClass =
  'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';

const titleClass =
  'text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors';

export function Contact() {
  const { t } = useTranslation();
  const { actualTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const emailAddress = 'knpimi@pk.edu.pl';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  return (
    <div className={'bg-background'}>
      <section
        id="kontakt"
        className="container mx-auto max-w-6xl px-4 py-16 md:py-24"
      >
        <div className="flex flex-col space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiChatSmile2Line className="mr-2 h-4 w-4" />
              {t('Pages.Contact.badge', 'Bądźmy w kontakcie')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Pages.Contact.title', 'Gdzie nas znajdziesz?')}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground text-balance">
              {t(
                'Contact.paragraph',
                'Wybierz najwygodniejszy kanał komunikacji i skontaktuj się z nami bezpośrednio lub dołącz do naszej społeczności.'
              )}
            </p>
          </div>

          {/* Asymmetric Bento Box Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
            {/* 1. Email (Direct/Private) - Wide Top-Left Block (md:col-span-2 lg:row-span-1) */}
            <Card className={`${cardClass} md:col-span-2 lg:row-span-1`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className={iconBoxClass}>
                    <RiMailSendLine className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="font-normal">
                    {t('Contact.email.badge', 'Zapytania biznesowe')}
                  </Badge>
                </div>
                <CardTitle className={titleClass}>
                  {t('Contact.email.title', 'Napisz do nas e-mail')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    'Contact.email.description',
                    'Kanał bezpośredni do spraw oficjalnych, propozycji współpracy, patronatów oraz zapytań biznesowych.'
                  )}
                </p>
                <div className="flex items-center justify-between gap-2 rounded-xl bg-background/80 p-2 pl-4 ring-1 ring-foreground/10">
                  <code className="truncate font-mono text-sm font-medium text-foreground">
                    {emailAddress}
                  </code>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="shrink-0 cursor-pointer gap-1.5 rounded-lg"
                  >
                    {copied ? (
                      <>
                        <RiCheckLine className="h-4 w-4 text-emerald-500" />
                        <span>{t('Contact.email.copied', 'Skopiowano')}</span>
                      </>
                    ) : (
                      <>
                        <RiFileCopyLine className="h-4 w-4" />
                        <span>{t('Contact.email.copy', 'Kopiuj adres')}</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2. Discord (Community) - Tall Feature Bento Tile (md:col-span-2 lg:col-span-2 lg:row-span-2) */}
            <Card
              className={`${cardClass} md:col-span-2 lg:col-span-2 lg:row-span-2`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#5865F2]/15 text-[#5865F2] dark:bg-[#5865F2]/25 dark:text-[#7983F5]">
                    <RiDiscordFill className="h-6 w-6" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {t('Contact.discord.online', 'Online')}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-[#5865F2] dark:group-hover:text-[#7983F5] transition-colors">
                  {t('Contact.discord.title', 'Społeczność Discord')}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    'Contact.discord.description',
                    'Serce naszego koła naukowego. Wpadnij porozmawiać o projektach, zadać pytania starszym studentom i być na bieżąco z życiem sekcji.'
                  )}
                </p>

                {/* Discord Server Widget Embed */}
                <div className="flex flex-1 items-center justify-center overflow-hidden rounded-xl ring-1 ring-foreground/10">
                  <iframe
                    title="Discord Server Widget"
                    src={`https://discord.com/widget?id=954758423185092708&theme=${actualTheme}`}
                    width="350"
                    height="500"
                    allowTransparency={true}
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="h-[350px] w-full border-0 lg:h-full lg:min-h-[320px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 3. Facebook Page - Square Bento Tile (col-span-1) */}
            <a
              href="https://www.facebook.com/grupa.pk.net"
              target="_blank"
              rel="noreferrer"
              className="col-span-1 block h-full"
            >
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={iconBoxClass}>
                      <RiFacebookBoxLine className="h-6 w-6" />
                    </div>
                    <RiArrowRightUpLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  <CardTitle className={titleClass}>Facebook</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {t(
                      'Contact.facebook.description',
                      'Aktualności, relacje z wydarzeń oraz szybki kontakt przez wiadomość prywatną.'
                    )}
                  </p>
                  <Badge variant="secondary" className="font-normal">
                    {t('Contact.facebook.badge', 'Strona oficjalna')}
                  </Badge>
                </CardContent>
              </Card>
            </a>

            {/* 4. Matrix - Square Bento Tile (col-span-1) */}
            <a
              href="https://matrix.to/#/@knpimi:matrix.org"
              target="_blank"
              rel="noreferrer"
              className="col-span-1 block h-full"
            >
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={iconBoxClass}>
                      <MatrixIcon className="h-6 w-6" />
                    </div>
                    <RiArrowRightUpLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  <CardTitle className={titleClass}>Matrix</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {t(
                      'Contact.matrix.description',
                      'Bezpieczny, zdecentralizowany czat oparty o otwarty protokół.'
                    )}
                  </p>
                  <Badge variant="secondary" className="font-normal">
                    {t('Contact.matrix.badge', 'Szyfrowany / Open Source')}
                  </Badge>
                </CardContent>
              </Card>
            </a>

            {/* 5. Mastodon - Bottom Wide Bento Tile (md:col-span-1 lg:col-span-2) */}
            <a
              href="https://mastodon.social/@knpimi"
              rel="me noreferrer"
              target="_blank"
              className="col-span-1 md:col-span-1 lg:col-span-2 block h-full"
            >
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={iconBoxClass}>
                      <RiMastodonLine className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        Fediverse
                      </Badge>
                      <RiArrowRightUpLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                  </div>
                  <CardTitle className={titleClass}>Mastodon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(
                      'Contact.mastodon.description',
                      'Śledź nasze mikroblogowe wpisy w zdecentralizowanej sieci społecznościowej Fediverse.'
                    )}
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* 6. LinkedIn - Bottom Wide Bento Tile (md:col-span-1 lg:col-span-2) */}
            <a
              href="https://www.linkedin.com/company/knpimi-politechnika-krakowska"
              target="_blank"
              rel="noreferrer"
              className="col-span-1 md:col-span-1 lg:col-span-2 block h-full"
            >
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={iconBoxClass}>
                      <RiLinkedinBoxLine className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        {t('Contact.linkedin.badge', 'Profil oficjalny')}
                      </Badge>
                      <RiArrowRightUpLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                  </div>
                  <CardTitle className={titleClass}>LinkedIn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(
                      'Contact.linkedin.description',
                      'Poznaj nasze osiągnięcia naukowe, zrealizowane projekty oraz relacje z konferencji i hackathonów.'
                    )}
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
