// calm-firefox: Firefox prefs, read at every start, on any OS.
// Link (or copy) this file to <profile>/user.js; with a link, editing here is enough.
// Delete a line (or the link) and restart to undo it.

// Let Firefox read chrome/userChrome.css and chrome/userContent.css.
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Still the motion (calm-firefox spec 001).
user_pref("ui.prefersReducedMotion", 1);
user_pref("toolkit.cosmeticAnimations.enabled", false);

// No AI. Same switch as Settings > AI Controls > "Block AI enhancements" (Firefox 148+).
user_pref("browser.ai.control.default", "blocked");
user_pref("browser.ml.chat.enabled", false);

// No nags, no sponsored rows (calm-firefox spec 002).
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

// A quiet new tab: no weather, widgets, promo card or big logo (Firefox 161 names).
user_pref("browser.newtabpage.activity-stream.showWeather", false);
user_pref("browser.newtabpage.activity-stream.discoverystream.promoCard.visible", false);
user_pref("browser.newtabpage.activity-stream.logowordmark.alwaysVisible", false);
user_pref("browser.newtabpage.activity-stream.widgets.crossword.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.system.crossword.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.pictureOfTheDay.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.system.pictureOfTheDay.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.lists.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.focusTimer.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.clocks.enabled", false);

// Pick up where you left off: reopen the previous tabs on every start.
user_pref("browser.startup.page", 3);

// The start page is just the search box: no shortcuts either.
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);

// No VPN button in the toolbar.
user_pref("browser.ipProtection.enabled", false);

// Compact, Brave-like chrome: tight density, tabs in the title bar, no bookmarks row on new tabs.
user_pref("browser.compactmode.show", true);
user_pref("browser.uidensity", 1);
user_pref("browser.tabs.inTitlebar", 1);
user_pref("browser.toolbars.bookmarks.visibility", "never");
