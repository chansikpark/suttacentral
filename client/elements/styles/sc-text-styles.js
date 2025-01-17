import { html } from 'lit-element';

export const textStyles = html`
<style>
  a {
    text-decoration: none;
  }

  /* Firefox & Safari use the font-synthesis property
  to remove italics, etc. that do not appear in the script
  not yet implemented for other browsers */
  [lang="ar"],
  [lang="si"],
  [lang="fa"],
  [lang="he"],
  [lang="hi"],
  [lang="vi"],
  [lang="jpn"],
  [lang="lzh"],
  [lang="zh"],
  [lang="mr"],
  [lang="my"],
  [lang="ta"],
  [lang="th"],
  [lang="xct"],
  [lang="ko"],
  [lang="bn"] {
    font-synthesis: none;
  }

  [lang="ar"] .sutta, [lang="fa"] .sutta {
    @apply --sc-arabic-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="ar"] .hgroup p, [lang="fa"] .hgroup p {
    @apply --sc-arabic-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  [lang="he"] .sutta {
    @apply --sc-hebrew-serif-font;
  }

  [lang="he"] .hgroup p {
    @apply --sc-hebrew-sans-font;
    @apply --sc-remove-small-caps;
  }

  [lang="hi"] .sutta, [lang="mr"] .sutta,
  [lang="pli-Deva"] .word, .devanagari-script .word {
    @apply --sc-devanagari-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="hi"] .hgroup p, [lang="mr"] .hgroup p,
  .hgroup p [lang="pli-Deva"] .word,
  .devanagari-script .hgroup p .word {
    @apply --sc-devanagari-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  .uddanagatha [lang="pli-Deva"] .word,
  .devanagari-script .uddanagatha .word {
    @apply --sc-devanagari-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-s;
  }

  [lang="my"] .sutta, [lang="pli-Mymr"] .word,
  .myanmar-script .word {
    @apply --sc-myanmar-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="my"] .hgroup p, .hgroup p [lang="pli-Mymr"] .word,
  .myanmar-script .hgroup p .word {
    @apply --sc-myanmar-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  .uddanagatha [lang="pli-Mymr"] .word,
  .myanmar-script .uddanagatha .word {
    @apply --sc-myanmar-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-s;
  }

  [lang="si"] .sutta, [lang="pli-Sinh"] .word,
  .sinhala-script .word {
    @apply --sc-sinhala-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="si"] .hgroup p, .hgroup p [lang="pli-Sinh"] .word,
  .sinhala-script .hgroup p .word {
    @apply --sc-sinhala-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  .uddanagatha [lang="pli-Sinh"] .word,
  .sinhala-script .uddanagatha .word {
    @apply --sc-sinhala-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-s;
  }

  [lang="ta"] .sutta {
    @apply --sc-tamil-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="ta"] .hgroup p {
    @apply --sc-tamil-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  [lang="bn"] .sutta {
    @apply --sc-bengali-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="bn"] .hgroup p {
    @apply --sc-bengali-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  [lang="th"] .sutta, [lang="pli-Thai"] .word,
  .thai-script .word {
    @apply --sc-thai-serif-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="th"] .hgroup p, .hgroup p [lang="pli-Thai"] .word,
  .thai-script .hgroup p .word {
    @apply --sc-thai-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  [lang="th"] .uddana, .uddanagatha [lang="pli-Thai"] .word,
  .thai-script .uddanagatha .word {
    @apply --sc-thai-sans-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-s;
  }

  [lang="xct"] .sutta {
    @apply --sc-tibetan-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="xct"] .hgroup p {
    @apply --sc-tibetan-font;
    @apply --sc-remove-small-caps;
    @apply --sc-tall-font-size-md;
  }

  [lang="zh"] .sutta, [lang="lzh"] .sutta {
    @apply --sc-traditional-chinese-font;
    @apply --sc-dense-font-size-md;
  }

  [lang="lzh"] .hgroup p, [lang="zh"] .hgroup p,
  [lang="lzh"] .counter, [lang="lzh"] .t-counter {
    @apply --sc-traditional-chinese-font;
    @apply --sc-remove-small-caps;
    @apply --sc-dense-font-size-md;
  }

  [lang="lzh"] .uddana, [lang="zh"] .uddanagatha {
    @apply --sc-traditional-chinese-font;
    @apply --sc-remove-small-caps;
    @apply --sc-dense-font-size-s;
  }

  [lang="ko"] .sutta {
    @apply --sc-korean-font;
    @apply --sc-dense-font-size-md;
  }

  [lang="ko"] .hgroup p {
    @apply --sc-korean-font;
    @apply --sc-remove-small-caps;
    @apply --sc-dense-font-size-md;
  }

  [lang="jpn"] .sutta {
    @apply --sc-japanese-font;
    @apply --sc-dense-font-size-md;
  }

  [lang="jpn"] .hgroup p {
    @apply --sc-japanese-font;
    @apply --sc-remove-small-caps;
    @apply --sc-dense-font-size-md;
  }

  [lang="jpn"] .uddana {
    @apply --sc-japanese-font;
    @apply --sc-remove-small-caps;
    @apply --sc-dense-font-size-s;
  }

  [lang="ev"] .sutta {
    @apply --sc-tengwar-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="kln"] .sutta {
    @apply --sc-klingon-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="vu"] .sutta {
    @apply --sc-vulcan-font;
    @apply --sc-tall-font-size-xl;
  }

  [lang="au"] .sutta {
    @apply --sc-aurebesh-font;
    @apply --sc-tall-font-size-md;
  }

  [lang="vi"] .sutta, [lang="vi"] .hgroup p {
    @apply --sc-tall-font-size-md;
  }

  [lang="vi"] .uddana, [lang="vi"] .uddanagatha {
    @apply --sc-tall-font-size-s;
  }

  .sutta, article.latin-script {
    @apply --sc-paper-font-body;
    @apply --sc-serif-font;
  }

  .html-text-content section {
    margin: 0 auto !important;
    padding: var(--sc-size-lg) var(--sc-size-md) var(--sc-size-xxl);
    max-width: 720px;
    display: block;
  }

  .html-text-content.side-by-side section {
    max-width: 1440px;
  }

  .html-text-content.side-by-side .sc-segmented-text {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .html-text-content.line-by-line .original-text {
    @apply --sc-sans-font;
    color: var(--sc-secondary-text-color);
    margin-bottom: 20px;
  }

  .html-text-content aside {
    display: none;
  }

  .original-text:not([lang='pli-Latn']) {
    font-style: normal;
    @apply --sc-remove-small-caps;
    font-synthesis: none;
  }

  .html-text-content:not(.latin-script) .word {
    font-style: normal;
    @apply --sc-remove-small-caps;
  }

  [lang='pli-Latn'] .original-text {
    @apply --sc-serif-font;
  }

  .side-by-side .translated-text {
    padding-right: var(--sc-size-md);
    display: inline-block;
    width: 47%;
    vertical-align: text-top;
  }

  .side-by-side .original-text {
    @apply --sc-sans-font;
    display: inline-block;
    width: 47%;
    padding-left: 5px;
    vertical-align: text-top;
  }

  .line-by-line .translated-text, .line-by-line .original-text {
    display: block;
  }

  .show-pali .translated-text {
    display: none;
  }

  .show-pali .original-text {
    @apply --sc-serif-font;
    display: inline;
  }

  .text-tooltip {
    --paper-tooltip-opacity: 0.98;
    --paper-tooltip-background: var(--sc-paper-tooltip-color);
    --paper-tooltip: {
      @apply --sc-sans-font;
      @apply --sc-skolar-font-size-xs;
      line-height: var(--sc-size-md);
      padding: var(--sc-size-sm) var(--sc-size-md);
      text-shadow: 0 0 var(--sc-secondary-background-color);
      white-space: normal;
    };
  }

  /*Descriptions of all classes below can be found in zz1 and zz3 test files*/

  .infomode .term,
  .infomode .gloss {
    color: var(--sc-primary-accent-color);
  }

  .term {
    font-weight: bold;
  }

  .suttainfo,
  .colophon {
    @apply --paper-font-body1;
    @apply --padding-md;
    color: var(--sc-secondary-text-color);
    background: var(--sc-primary-background-color);
    border: 1px solid var(--sc-tertiary-background-color);
    border-radius: var(--sc-size-xxs);
    display: inline-block;
    margin-bottom: var(--sc-size-md);
  }

  [lang="lzh"] .suttainfo,
  .xu,
  .w {
    @apply --sc-traditional-chinese-font;
    @apply --sc-dense-font-size-md;
    font-weight: 400;
    @apply --padding-md;
    color: var(--sc-secondary-text-color);
    background: var(--sc-primary-background-color);
    border: 1px solid var(--sc-tertiary-background-color);
    border-radius: var(--sc-size-xxs);
    display: inline-block;
    margin-bottom: var(--sc-size-md);
  }

  .suttainfo p,
  .xu p,
  .w p,
  .colophon p {
    margin-bottom: 0;
  }

  /* TEXT */

  .sutta ul {
    list-style-type: none;
    padding: 0 0 12px 0;
    margin-left: 32px;
  }

  .sutta ul li::before {
    position: absolute;
    content: "◦";
    color: var(--sc-disabled-text-color);
    margin-left: -12px;
  }

  .sutta ol {
    padding: 0 0 12px 0;
    margin-left: 32px;
  }

  .sutta ol ol {
    padding: 0 0 0 1em;
    margin: 0 0 0 0;
  }

  .gatha {
    font-size: inherit;
    display: table;
    width: auto;
    margin: 0 auto;
    max-width: 90%;
  }

  .indent {
    padding-left: 32px;
  }

  .endsection,
  .end,
  .endsubsection {
    font-style: italic;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }

  [lang="si"] .endsection,
  [lang="he"] .endsection,
  [lang="hi"] .end,
  [lang="jpn"] .end,
  [lang="lzh"] .endsection,
  [lang="lzh"] .scribe,
  [lang="zh"] .endsection,
  [lang="th"] .endsection,
  [lang="th"] .end,
  [lang="th"] .namo,
  [lang="hi"] .namo,
  [lang="jpn"] .namo,
  [lang="lzh"] .namo,
  [lang="si"] .namo,
  [lang="ta"] .speaker,
  [lang="bn"] .endsutta,
  [lang="bn"] .endsection,
  [lang="bn"] .namo {
    font-style: inherit;
  }

  .endsutta {
    font-weight: bold;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }

  .uddana {
    color: var(--sc-secondary-text-color);
    @apply --paper-font-body1;
  }

  .uddana-intro {
    font-weight: bold;
    color: var(--sc-secondary-text-color);
  }

  .endbook,
  .endvagga {
    text-align: center;
    color: var(--sc-secondary-text-color);
    @apply --sc-all-caps;
  }

  [lang="si"] .endbook,
  [lang="zh"] .endbook,
  [lang="si"] .endvagga {
    @apply --sc-remove-small-caps;
  }

  .endbook {
    font-weight: bold;
  }

  .surplus {
    display: none;
  }

  .infomode .surplus {
    display: inline;
    color: var(--sc-secondary-text-color);
  }

  .infomode .supplied {
    color: var(--sc-primary-color)
  }

  .infomode .supplied2 {
    color: var(--sc-primary-color-dark);
  }

  [lang="pgd"] .add,
  [lang="pli"] .add,
  [lang="san"] .add,
  [lang="pra"] .add,
  [lang="en"] .add,
  .infomode .add {
    color: var(--sc-secondary-text-color);
    @apply --sc-sans-font;
  }

  [lang="lzh"] .add,
  [lang="xct"] .add {
    color: var(--sc-secondary-text-color);
    @apply --sc-noto-sans-font;
  }

  [lang="pli"] p,
  [lang="san"] p {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .pe {
    font-style: italic;
  }

  .infomode .pe {
    color: var(--sc-secondary-text-color);
  }

  .metre {
    display: none;
  }

  .infomode .metre {
    @apply --sc-skolar-font-size-xxs;
    color: var(--sc-primary-accent-color);
    display: inline-block;
    position: absolute;
    margin-top: -11px;
    letter-spacing: 0.2em;
  }

  .infomode .expanded {
    color: var(--sc-secondary-text-color);
  }

  .suppliedmetre {
    color: var(--sc-secondary-text-color);
  }

  .gap {
    color: var(--sc-secondary-text-color);
  }

  .infomode .var {
    color: var(--sc-secondary-accent-color);
  }

  .text-table {
    margin: var(--sc-size-xl) auto;
    border-collapse: collapse;
  }

  .text-table td {
    padding: 12px var(--sc-size-md-larger) 12px var(--sc-size-md-larger);
    vertical-align: text-top;
    border-top: 1px solid var(--sc-tertiary-background-color);
    border-bottom: 1px solid var(--sc-tertiary-background-color);
  }

  .text-table li {
    padding: var(--sc-size-xs) 0;
  }

  .text-table ul {
    padding-left: var(--sc-size-xl);
  }

  .varnote,
  .corrnote {
    --paper-tooltip-opacity: 0.98;
    --paper-tooltip-background: var(--sc-paper-tooltip-color);
    --paper-tooltip: {
      @apply --sc-sans-font;
      @apply --sc-skolar-font-size-xs;
      line-height: var(--sc-size-md);
      padding: var(--sc-size-sm) var(--sc-size-md);
      text-shadow: 0 0 var(--sc-secondary-background-color);
      white-space: normal;
      max-width: 100% !important;
    }
  }

  .varnote table {
    color: var(--sc-paper-tooltip-text-color);
  }

  .varnote td {
    padding: 0;
    vertical-align: middle;
    border: none;
  }

  .varnote td:first-child:not(:last-child) {
    font-weight: bold;
    padding-right: var(--sc-size-xs);
  }

  .varnote td:last-child {
    font-size: 14px;
  }

  .infomode .corr,
  .infomode .corrected {
    color: var(--sc-primary-accent-color)
  }

  .del, .del-scribe {
    display: none
  }

  .infomode .del, .infomode .del-scribe {
    text-decoration: line-through;
    display: inline
  }

  .unclear {
    color: var(--sc-secondary-text-color);
  }

  .scribe {
    font-style: italic;
  }

  hr {
    width: 33%;
    margin: 1em auto 0;
  }

  .t-gaiji {
    color: var(--sc-primary-accent-color);
  }

  a.cr {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-skip-ink: auto;
  }

  a.cr:hover  {
    color: var(--sc-primary-color);
  }

    a.cr:visited {
      text-decoration-color: var(--sc-primary-color-dark);
    }

  .hidden,
  .alt-title {
    display: none;
  }

  .allowance,
  .kamma {
    font-weight: bold;
  }

  .t-byline,
  .t-headname,
  .t-juanname {
    font-style: inherit;
  }

  .uddanagatha {
    color: var(--sc-secondary-text-color);
    @apply --paper-font-body1;
    font-style: inherit;
  }

  .evam {
    @apply --sc-all-small-caps;
  }

  .namo {
    text-align: center;
    font-style: italic;
    color: var(--sc-primary-text-color);
  }

  .rightview,
  .wrongview,
  .rule-number,
  .t-note,
  .vagga-number {
    color: var(--sc-secondary-text-color);
  }

  .rule,
  .subrule {
    font-weight: bold;
  }

  .speaker {
    font-style: italic;
  }

  .counter,
  .t-counter {
    @apply --paper-font-body2-chinese;
    color: var(--sc-secondary-text-color);
  }

  h1, h2, h3, h4, h5, h6, ul, ol, dd, p, figure, pre, table, fieldset {
    margin: 1em 0 0 0;
  }

  .hgroup + p,
  .hgroup + blockquote {
    margin-top: var(--sc-size-xl);
  }
</style>`;
