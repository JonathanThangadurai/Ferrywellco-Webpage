# Team facts and release tasks

This file records details that were not confirmed in the brief. It is for team review, not website copy.

## People and contact

- **Homepage, Team, Tilman card:** confirm Tilman's surname before publishing a full name.
- **Homepage, Team, Jonathan card:** ask the team to confirm whether the public name should be Jonathan Thangadurai. The site currently says Jonathan.
- **Homepage, Team, optional LinkedIn links:** collect and approve each team member's public profile URL. Empty link slots stay hidden.
- **Homepage, Contact, partner enquiry:** agree who responds to platform enquiries and how to record the outcome of each conversation. The current contact route prepares an email; it does not register an enquiry on a server.
- **For platforms:** choose one type of outdoor app for the first commercial test and agree which user action a partner would want to improve.
- **For platforms, buyer interviews:** ask how the team currently handles outdoor conditions, who owns the planning feature, what it would cost to integrate, and which business measure would justify a pilot. Repeat use or premium uptake are possible measures to discuss, not established results.
- **For platforms, offer:** decide whether the first partner receives a hosted view, an API, a software component, or a manual pilot output. Define the scope, duration, cost and what FerryWellCo actually supplies before publishing terms.
- **For platforms, differentiation:** test whether activity-specific comparisons solve a problem beyond the data, routing and widgets partners can already buy. Compare against suppliers such as Ambee and Tomorrow.io without claiming a unique capability before validation.
- **For platforms, data and privacy:** document source, license, pollutants, geographic coverage, spatial resolution, refresh rate and forecast horizon. Map what location or activity information a partner would share, and whether a coarse or partner-side location lookup can avoid sending individual location histories to FerryWellCo.
- **Science and copy:** confirm with Tilman which signals can be supported beyond the heat and PM2.5 example before describing them as GOTime features.
- **Science and copy:** decide with Tilman whether a general air-quality index belongs in the product. The European Air Quality Index reports the worst pollutant category; it is not a combined heat, pollen and health score. Keep pollutant readings visible and avoid a street-level claim unless the chosen data can support it.

## Forecast demo

- **Demo page, ownership:** review the embedded adaptation of Tilman's first phone demo with him. Confirm the comparison wording, example conditions and interaction before treating them as an approved product design. His original `fw_demo.html` remains untouched.

- **Demo page, live outlook:** obtain an Open-Meteo commercial subscription or another source licensed for FerryWellCo's promotional website before making live API calls. Free Open-Meteo access is restricted to non-commercial use, and the terms classify promotional activity as commercial. The underlying data is CC BY 4.0 and needs attribution even with a paid API subscription. See https://open-meteo.com/en/terms and https://open-meteo.com/en/pricing.
- **Demo page, live outlook:** confirm which licensed source, endpoint, attribution, coverage, resolution and update schedule the team approves. Do not promise street-level or route-level differences on a city-scale air-quality grid.
- **Demo page, live outlook:** if a paid API uses a key, place calls behind a server or proxy so the key is never published in client-side JavaScript.
- **Science page:** publish the data-source, resolution, update-frequency, horizon and limitation definitions once the live data source is selected and verified. The present demo uses sample conditions.
- **Demo page, optional Luchtmeetnet comparison:** verify browser CORS behaviour and usage terms before adding observed PM2.5. This is not part of the current sample demo.

## Hosting and language

- **Custom domain complete (30 October 2026):** ferrywellco.com is verified and set as the GitHub Pages custom domain. GitHub added the `CNAME` file, and HTTPS enforcement is enabled. The apex site, www redirect, HTTP-to-HTTPS redirect and old GitHub Pages redirect have been tested. Keep the GitHub verification TXT record and existing Zoho mail records in place.
- **Dutch draft, nl/index.html:** rewrite it for the platform focus, then ask a native Dutch speaker to review it before navigation or hreflang links are added. The draft remains unlinked and marked noindex.
