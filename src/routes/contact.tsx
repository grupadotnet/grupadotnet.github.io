import knpimi from '/svg/KNPIMI/Logo_KNPiMI.svg';
import knpimi_w from '/svg/KNPIMI/Logo_KNPiMI_white.svg';

import { useState } from 'react';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider.tsx';
import { sectionColorsByPath } from '@/lib/sections';
import { cn } from '@/lib/utils';
import {
  RiArrowRightUpLine,
  RiChatSmile2Line,
  RiCheckLine,
  RiDiscordFill,
  RiFacebookBoxLine,
  RiFileCopyLine,
  RiHashtag,
  RiLinkedinBoxLine,
  RiLockLine,
  RiMailSendLine,
  RiMastodonLine,
  RiShieldCheckLine,
} from '@remixicon/react';

export const Route = createFileRoute('/contact')({
  component: Contact,
  staticData: {
    titleData: extractTranslation('Contact.navbarTitle', 'Kontakt'),
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
  'group h-full justify-between border-none bg-muted/50 shadow-sm transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70';

const iconBoxClass =
  'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';

const titleClass =
  'text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors';

function Contact() {
  const { t } = useTranslation();
  const { actualTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isStandalone = useLocation().pathname !== '/';
  const Heading = isStandalone ? 'h1' : 'h2';
  const cardTitleAs = isStandalone ? 'h2' : 'h3';

  const emailAddress = 'knpimi@pk.edu.pl';
  const [copiedInvite, setCopiedInvite] = useState(false);
  const discordInviteDisplay = 'discord.gg/ySkAbnejnC';
  const discordInviteUrl = `https://${discordInviteDisplay}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(discordInviteUrl);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const discordChannels = [
    {
      id: 'announcements',
      name: t('Contact.discord.channels.announcements.name', 'ogłoszenia'),
      description: t(
        'Contact.discord.channels.announcements.description',
        'Terminy spotkań, warsztaty i hackathony'
      ),
      dotClass: 'bg-[#5865F2] dark:bg-[#7983F5]',
    },
    {
      id: 'webdev',
      name: t('Contact.discord.channels.webdev.name', 'webdev'),
      description: t(
        'Contact.discord.channels.webdev.description',
        'React, TypeScript, .NET i code review'
      ),
      dotClass: sectionColorsByPath.webdev.dot,
    },
    {
      id: 'data-and-ai',
      name: t('Contact.discord.channels.dataAndAi.name', 'data-and-ai'),
      description: t(
        'Contact.discord.channels.dataAndAi.description',
        'ML, Python, notebooki i projekty R&D'
      ),
      dotClass: sectionColorsByPath['data&ai'].dot,
    },
    {
      id: 'cybersec',
      name: t('Contact.discord.channels.cybersec.name', 'cybersec'),
      description: t(
        'Contact.discord.channels.cybersec.description',
        'CTF, Kali Linux, Wazuh i OSINT'
      ),
      dotClass: sectionColorsByPath.cybersec.dot,
    },
    {
      id: 'projects',
      name: t('Contact.discord.channels.projects.name', 'projekty-i-pomoc'),
      description: t(
        'Contact.discord.channels.projects.description',
        'Zespoły projektowe i wsparcie starszych studentów'
      ),
      dotClass: 'bg-muted-foreground/60',
    },
  ];

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
              <RiChatSmile2Line aria-hidden="true" className="mr-2 h-4 w-4" />
              {t('Contact.badge', 'Bądźmy w kontakcie')}
            </Badge>
            <Heading className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Contact.title', 'Gdzie nas znajdziesz?')}
            </Heading>
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
                    <RiMailSendLine aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="font-normal">
                    {t('Contact.email.badge', 'Zapytania biznesowe')}
                  </Badge>
                </div>
                <CardTitle as={cardTitleAs} className={titleClass}>
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
                        <RiCheckLine
                          aria-hidden="true"
                          className="h-4 w-4 text-emerald-500"
                        />
                        <span>{t('Contact.email.copied', 'Skopiowano')}</span>
                      </>
                    ) : (
                      <>
                        <RiFileCopyLine
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        <span>{t('Contact.email.copy', 'Kopiuj adres')}</span>
                      </>
                    )}
                  </Button>
                  <span className="sr-only" aria-live="polite">
                    {copied
                      ? t(
                          'Contact.email.copiedAnnouncement',
                          'Skopiowano adres e-mail do schowka'
                        )
                      : ''}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* 2. Discord (Community) - Tall Feature Bento Tile (md:col-span-2 lg:col-span-2 lg:row-span-2) */}
            <Card
              className={`${cardClass} md:col-span-2 lg:col-span-2 lg:row-span-2`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#5865F2]/15 text-[#4752C4] dark:text-[#7983F5]">
                    <RiDiscordFill aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/12 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <RiShieldCheckLine
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                    {t('Contact.discord.privacyBadge', 'Prywatność chroniona')}
                  </div>
                </div>
                <CardTitle
                  as={cardTitleAs}
                  className="text-xl transition-colors group-hover:text-[#4752C4] dark:group-hover:text-[#7983F5]"
                >
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

                {/* Privacy-first Server Preview Panel */}
                <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-background/80 ring-1 ring-foreground/10">
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5865F2]/12 p-1.5">
                        <img
                          src={actualTheme === 'dark' ? knpimi_w : knpimi}
                          alt=""
                          className="h-full w-auto"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-semibold text-foreground">
                          {t('Contact.discord.serverName', 'KNPiMI • PK')}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {t(
                            'Contact.discord.serverSubtitle',
                            'Oficjalny serwer koła naukowego'
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0 font-normal">
                      {t('Contact.discord.activeBadge', 'Aktywna społeczność')}
                    </Badge>
                  </div>

                  <div className="px-3 py-3">
                    <p className="px-2 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                      {t('Contact.discord.channelsLabel', 'Kanały na serwerze')}
                    </p>
                    <ul className="space-y-1">
                      {discordChannels.map((channel) => (
                        <li
                          key={channel.id}
                          className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/50"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 flex shrink-0 items-center gap-1.5"
                          >
                            <span
                              className={cn(
                                'h-2 w-2 rounded-full',
                                channel.dotClass
                              )}
                            />
                            <RiHashtag className="h-3.5 w-3.5 text-muted-foreground" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-xs font-semibold text-foreground">
                              {channel.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {channel.description}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-2 border-t border-border/60 bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
                    <RiLockLine
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    />
                    <span>
                      {t(
                        'Contact.discord.privacyNote',
                        'Dla ochrony prywatności studentów nie wyświetlamy publicznej listy osób online ani nie ładujemy zewnętrznego widżetu Discord.'
                      )}
                    </span>
                  </div>
                </div>

                {/* Action Area: Copy Invite + Join CTA */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 rounded-xl bg-background/80 p-2 pl-4 ring-1 ring-foreground/10">
                    <code className="truncate font-mono text-sm font-medium text-foreground">
                      {discordInviteDisplay}
                    </code>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopyInvite}
                      className="shrink-0 cursor-pointer gap-1.5 rounded-lg"
                    >
                      {copiedInvite ? (
                        <>
                          <RiCheckLine
                            aria-hidden="true"
                            className="h-4 w-4 text-emerald-500"
                          />
                          <span>
                            {t('Contact.discord.copied', 'Skopiowano')}
                          </span>
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                          <span>
                            {t('Contact.discord.copyInvite', 'Kopiuj link')}
                          </span>
                        </>
                      )}
                    </Button>
                    <span className="sr-only" aria-live="polite">
                      {copiedInvite
                        ? t(
                            'Contact.discord.copiedAnnouncement',
                            'Skopiowano link zaproszenia na Discorda do schowka'
                          )
                        : ''}
                    </span>
                  </div>

                  <Button
                    nativeButton={false}
                    className="h-11 w-full cursor-pointer gap-2 rounded-xl bg-[#4752C4] text-white hover:bg-[#3c45a5] dark:bg-[#5865F2] dark:hover:bg-[#4752C4]"
                    render={
                      <a
                        href={discordInviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiDiscordFill aria-hidden="true" className="h-5 w-5" />
                        <span>
                          {t(
                            'Contact.discord.joinCta',
                            'Dołącz do serwera Discord'
                          )}
                        </span>
                        <RiArrowRightUpLine
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        <span className="sr-only">
                          {' '}
                          (
                          {t(
                            'Common.opensInNewTab',
                            'otwiera się w nowej karcie'
                          )}
                          )
                        </span>
                      </a>
                    }
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
                      <RiFacebookBoxLine
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </div>
                    <RiArrowRightUpLine
                      aria-hidden="true"
                      className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    />
                  </div>
                  <CardTitle as={cardTitleAs} className={titleClass}>
                    Facebook
                  </CardTitle>
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
              <span className="sr-only">
                {' '}
                ({t('Common.opensInNewTab', 'otwiera się w nowej karcie')})
              </span>
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
                    <RiArrowRightUpLine
                      aria-hidden="true"
                      className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    />
                  </div>
                  <CardTitle as={cardTitleAs} className={titleClass}>
                    Matrix
                  </CardTitle>
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
              <span className="sr-only">
                {' '}
                ({t('Common.opensInNewTab', 'otwiera się w nowej karcie')})
              </span>
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
                      <RiMastodonLine aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        Fediverse
                      </Badge>
                      <RiArrowRightUpLine
                        aria-hidden="true"
                        className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      />
                    </div>
                  </div>
                  <CardTitle as={cardTitleAs} className={titleClass}>
                    Mastodon
                  </CardTitle>
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
              <span className="sr-only">
                {' '}
                ({t('Common.opensInNewTab', 'otwiera się w nowej karcie')})
              </span>
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
                      <RiLinkedinBoxLine
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        {t('Contact.linkedin.badge', 'Profil oficjalny')}
                      </Badge>
                      <RiArrowRightUpLine
                        aria-hidden="true"
                        className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      />
                    </div>
                  </div>
                  <CardTitle as={cardTitleAs} className={titleClass}>
                    LinkedIn
                  </CardTitle>
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
              <span className="sr-only">
                {' '}
                ({t('Common.opensInNewTab', 'otwiera się w nowej karcie')})
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
