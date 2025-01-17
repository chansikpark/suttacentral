import { html } from 'lit-element';

export const dictStyles = html`
<style>
  dl {
    margin-top: var(--sc-size-sm);
  }

  dd {
    margin: 0;
    @apply --sc-paper-font-body;
    @apply --sc-serif-font;
  }

  dd > p {
    margin-top: 0;
  }

  dfn {
    @apply --paper-font-headline;
    font-style: normal;
    text-transform: lowercase;
    color: var(--sc-primary-accent-color);
    @apply --sc-serif-font;
  }

  .dppn-entry dfn {
    text-transform: capitalize;
  }

  .case {
    @apply --sc-all-small-caps;
    color: var(--sc-secondary-text-color);
    @apply --sc-sans-font;
    display: block;
    @apply --paper-font-body2;
    white-space: nowrap;
    overflow: hidden;
  }

  dd .ref {
    @apply --sc-sans-font;
    @apply --sc-skolar-font-size-s;
    color: var(--sc-secondary-text-color);
    background-color: var(--sc-textual-info-background-color);
    border-radius: var(--sc-size-xxs);
    padding: var(--sc-size-xs) var(--sc-size-sm) var(--sc-size-xxs);
    white-space: nowrap;
  }

  dd .author {
    @apply --sc-mixed-small-caps
  }

  dd .eti {
    color: var(--sc-secondary-text-color);
    @apply --paper-font-body1
  }

  dd .term {
    font-weight: normal;
  }

  dd .abbr {
    @apply --sc-skolar-font-size-s;
    @apply --sc-sans-font;
    background-color: var(--sc-paper-tooltip-color);
    color: var(--sc-tertiary-text-color);
    font-weight: bold;
    border-radius: var(--sc-size-xxs);
    padding: var(--sc-size-xs) var(--sc-size-sm);
  }

  dd .inline-li {
    @apply --sc-sans-font;
    color: var(--sc-secondary-text-color);
    font-weight: bold;
    padding: 0 8px;
  }

  dd .square {
    color: var(--sc-disabled-text-color);
  }

  dd ol {
    list-style-type: none;
    counter-reset: step-counter;
    margin: 0 0 0 32px;
    padding: 0;

  }

  dd ol ul {
    counter-reset: step-counter;
  }

  .little {
    list-style-type: decimal;
  }

  .little li {
    margin: 0 0 0 0
  }

  dd ul {
    list-style-type: disc;
    margin: 0 0 var(--sc-size-sm) var(--sc-size-md-larger) !important
  }

  dd ol + ul.compounds {
    margin-top: var(--sc-size-md-larger) !important;
  }

  dd ol li {
    counter-increment: step-counter;
    margin: var(--sc-size-xs) 0 0 0;

  }

  .compounds {
    margin-left: var(--sc-size-md-larger) !important;
    list-style-type: none;
  }

  dd ol + li {
    counter-increment: step-counter !important;
  }

  .lower-latin > li::before {
    content: counter(step-counter, lower-latin);
  }

  .upper-latin > li::before {
    content: counter(step-counter, upper-latin);
  }

  .decimal > li::before {
    content: counter(step-counter, decimal);
  }

  .upper-roman > li::before {
    content: counter(step-counter, upper-roman);
  }

  .lower-roman > li::before {
    content: counter(step-counter, lower-roman);
  }

  .lower-greek > li::before {
    content: counter(step-counter, lower-greek);
  }

  .compounds > li::before {
    color: var(--sc-disabled-text-color);
    content: "◦";
    margin-left: -12px;
  }

  dd li::before {
    @apply --sc-sans-font;
    color: var(--sc-secondary-text-color);
    font-weight: bold;
    position: absolute;
    text-align: right;
    margin-left: -32px;
  }

  .google-maps {
    @apply --vertical-margin-md;
    height: 480px;
  }

  .google-maps iframe {
    height: 480px;
    width: 100%;
    border: none;
  }

  .info {
    display: none;
  }

  h1, h2, h3, h4, h5, h6 {
    text-align: left;
    font-weight: normal;
  }

  dd a {
    @apply --sc-inline-link;
  }

  dd a:hover {
    @apply --sc-inline-link-hover;
  }

  dd a:visited {
    @apply --sc-inline-link-visited;
  }
</style>`;
