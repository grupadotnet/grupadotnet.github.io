import { useMemo } from 'react';

interface EventLinks {
  googleTemplateUrl: string;
  icsUrl: string;
  googleSubscribeUrl: string;
  webcalUrl: string;
}

export function useCalendarLinks(eventLinks: EventLinks | undefined) {
  return useMemo(() => {
    if (!eventLinks) return { singularLink: '', entireLink: '' };

    const { googleTemplateUrl, icsUrl, googleSubscribeUrl, webcalUrl } =
      eventLinks;
    const ua = navigator.userAgent;

    const isIOS =
      /iPad|iPhone|iPod/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /android/i.test(ua);

    if (isIOS) {
      return { singularLink: icsUrl, entireLink: webcalUrl };
    }

    if (isAndroid) {
      return {
        singularLink: googleTemplateUrl,
        entireLink: googleSubscribeUrl,
      };
    }

    // PC Default
    return { singularLink: googleTemplateUrl, entireLink: googleSubscribeUrl };
  }, [eventLinks]);
}
