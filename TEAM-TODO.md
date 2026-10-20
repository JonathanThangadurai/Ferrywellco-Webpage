# Team facts and release tasks

This file records details that were not confirmed in the brief. It is for team review, not website copy.

## People and contact

- **Homepage, Team, Tilman card:** confirm Tilman's surname before publishing a full name.
- **Homepage, Team, Jonathan card:** ask the team to confirm whether the public name should be Jonathan Thangadurai. The site currently says Jonathan.
- **Homepage, Team, optional LinkedIn links:** collect and approve each team member's public profile URL. Empty link slots stay hidden.
- **Homepage, Contact, pilot invitation:** confirm whether there is an active GOTime pilot intake process and who will respond to requests. The current contact route prepares an email; it does not register someone automatically.

## Forecast demo

- **Demo page, ownership:** pause demo implementation and review the next version with Tilman before changing its copy, data source or interaction.

- **Demo page, live outlook:** obtain an Open-Meteo commercial subscription or another source licensed for FerryWellCo's promotional website before making live API calls. Free Open-Meteo access is restricted to non-commercial use, and the terms classify promotional activity as commercial. The underlying data is CC BY 4.0 and needs attribution even with a paid API subscription. See https://open-meteo.com/en/terms and https://open-meteo.com/en/pricing.
- **Demo page, live outlook:** confirm which licensed source, endpoint, attribution, coverage, resolution and update schedule the team approves. Do not promise street-level or route-level differences on a city-scale air-quality grid.
- **Demo page, live outlook:** if a paid API uses a key, place calls behind a server or proxy so the key is never published in client-side JavaScript.
- **Science page, section 06:** publish the data-source, resolution, update-frequency, horizon and limitation definitions once the live data source is selected and verified. The present demo uses sample conditions.
- **Demo page, optional Luchtmeetnet comparison:** verify browser CORS behaviour and usage terms before adding observed PM2.5. This is not part of the current sample demo.

## Hosting and language

- **Custom domain:** do not add CNAME yet. First confirm ownership of ferrywellco.com, then verify it under the repository owner's GitHub account Pages settings using GitHub's requested DNS TXT record. In the repository's Settings > Pages, set ferrywellco.com as the custom domain. GitHub will create the CNAME in the source branch at that point. At the DNS provider, point the apex to GitHub Pages using ALIAS/ANAME or the four A records in [GitHub's current guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Add a www CNAME to jonathanthangadurai.github.io, without the repository path. Wait for DNS to resolve, then enable Enforce HTTPS and test both apex and www. Keep the TXT verification record. Do not point DNS at GitHub before setting the custom domain in repository settings.
- **Dutch draft, nl/index.html:** a native Dutch speaker must review the draft before navigation or hreflang links are added.
