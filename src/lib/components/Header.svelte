<script lang="ts">
  import WordMark from "./WordMark.svelte";
  import type { SettingsDocument } from "../../prismicio-types";
  import { PrismicLink } from "@prismicio/svelte";
  import ButtonLink from "./ButtonLink.svelte";
  import clsx from "clsx";

  import IconClose from "~icons/ph/x-bold";
  import IconMenu from "~icons/ph/list-bold";
  import { asLink, type LinkField } from "@prismicio/client";
  import { page } from "$app/stores";

  export let settings: SettingsDocument;

  let isOpen = false;
  const toggleOpen = () => (isOpen = !isOpen);
  const close = () => (isOpen = false);

  const isActive = (link: LinkField) => {
    const path = asLink(link);

    return path && $page.url.pathname.includes(path);
  };
</script>

<header class="p-4 md:p-6">
  <nav
    class="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center"
    aria-label="main"
  >
    <div class="flex items-center justify-between">
      <a href="/" on:click={close} class="z-50">
        <WordMark></WordMark>
        <span class="sr-only">{settings.data.site_title} home page</span>
      </a>

      <button
        type="button"
        class="block p-2 text-2xl text-white md:hidden"
        aria-expanded={isOpen}
        on:click={toggleOpen}
      >
        <IconMenu></IconMenu>
      </button>
    </div>

    <!-- Mobile Nav -->
    <div
      class={clsx(
        "fixed inset-0 z-40 flex flex-col items-end bg-gray-950 pr-4 pt-6 transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "transltate-x-0" : "translate-x-[100%]",
      )}
    >
      <button
        type="button"
        class="block p-2 text-2xl text-white md:hidden"
        on:click={toggleOpen}
        aria-expanded={isOpen}
      >
        <IconClose></IconClose>
      </button>

      <ul class="grid justify-items-end gap-8">
        {#each settings.data.navigation as item (item.label)}
          <li>
            {#if item.cta_button}
              <ButtonLink
                field={item.link}
                on:click={close}
                aria-current={isActive(item.link) ? "page" : undefined}
              >
                {item.label}
              </ButtonLink>
            {:else}
              <PrismicLink
                class="block min-h-11 px-3 text-3xl first:mt-8"
                field={item.link}
                on:click={close}
                aria-current={isActive(item.link) ? "page" : undefined}
              >
                {item.label}
              </PrismicLink>
            {/if}
          </li>
        {/each}
      </ul>
    </div>

    <!-- Desktop Nav -->
    <ul class="hidden gap-6 md:flex">
      {#each settings.data.navigation as item (item.label)}
        <li>
          {#if item.cta_button}
            <ButtonLink
              field={item.link}
              aria-current={isActive(item.link) ? "page" : undefined}
            >
              {item.label}
            </ButtonLink>
          {:else}
            <PrismicLink
              class="inline-flex min-h-11 items-center"
              field={item.link}
              aria-current={isActive(item.link) ? "page" : undefined}
            >
              {item.label}
            </PrismicLink>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</header>
