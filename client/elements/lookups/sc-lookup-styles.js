import { html } from 'lit-element';

export const lookupStyles = html`
<style>
  :host {
    --paper-tooltip: {
      @apply --sc-skolar-font-size-s;
      background-color: var(--sc-paper-tooltip-color);
      font-feature-settings: normal;
      letter-spacing: 0;
      text-align: left;
      text-transform: none;
      opacity: 1;
      max-width: 300px;
      line-height: 130%;
    }
  }

  .lookup-tooltip .separator {
    width: 100%;
    margin-bottom: 1em;
    margin-top: .8em;
    color: var(--sc-border-color);
  }

  .definition {
    white-space: normal;
  }

  .lookup-tooltip .definition:last-of-type .separator {
    display: none;
  }

  .lookup-tooltip .definition {
    margin-left: .4em;
  }

  .lookup-tooltip .definition:last-of-type {
    margin-bottom: .5em;
  }

  .lookup-tooltip .definition:first-of-type {
    margin-top: .7em;
  }

  .lookup-tooltip .ideograph {
    margin-right: .2em;
  }

  .lookup-link {
    color: var(--sc-primary-color-light) !important;
    background: unset;
    font-weight: bold;
  }

  .lookup-link:hover {
    color: var(--sc-primary-color-medium) !important;
  }

  h1 {
    /* it is here because of the difference on how h1 calculates margin for bare text and text in spans */
    -webkit-margin-before: 12px;
  }

  .green-color {
    color: var(--sc-primary-accent-color);
  }

  .word {
    white-space: nowrap;
  }
</style>`;
