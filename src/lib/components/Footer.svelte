<script lang="ts">
  import WordMark from "./WordMark.svelte";
  import type { SettingsDocument } from "../../prismicio-types";
  import { PrismicLink } from "@prismicio/svelte";

  export let settings: SettingsDocument;
</script>

<footer>
  <nav
    class="flex flex-col items-center justify-between gap-6 border-t border-gray-600 px-8 py-7 md:flex-row"
    aria-label="footer"
  >
    <a href="/">
      <WordMark></WordMark>
      <span class="sr-only">{settings.data.site_title} home page</span>
    </a>

    <ul class="flex gap-6">
      {#each settings.data.navigation as item (item.label)}
        <li>
          <PrismicLink
            class="inline-flex min-h-11 items-center"
            field={item.link}>{item.label}</PrismicLink
          >
        </li>
      {/each}
    </ul>
  </nav>
</footer>
