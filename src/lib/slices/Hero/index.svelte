<script>
  import {
    PrismicImage,
    PrismicLink,
    PrismicRichText,
    PrismicText,
  } from "@prismicio/svelte";

  import ButtonLink from "../../components/ButtonLink.svelte";
  import Bounded from "../../components/Bounded.svelte";
  import TraingleGrid from "$lib/components/TraingleGrid.svelte";

  /** @type{import("@prismicio/client").Content.HeroSlice} */
  export let slice;
</script>

<Bounded
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
>
  <div class="relative text-center">
    <TraingleGrid></TraingleGrid>

    {#if slice.primary.heading}
      <h1
        class="mx-auto max-w-3xl text-balance text-5xl font-medium md:text-7xl"
      >
        <PrismicText field={slice.primary.heading} />
      </h1>
    {/if}

    {#if slice.primary.body}
      <p class="mx-auto mt-6 max-w-md text-balance text-gray-300">
        <PrismicText field={slice.primary.body} />
      </p>
    {/if}

    {#if slice.primary.button_link}
      <ButtonLink field={slice.primary.button_link} class="mt-8">
        {slice.primary.button_label}
      </ButtonLink>
    {/if}

    {#if slice.primary.image}
      <div class="glass-container mt-16 w-fit">
        <div
          class="absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 mix-blend-screen blur-[120px] filter"
        ></div>
        <div
          class="absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-500/50 mix-blend-screen blur-[120px] filter"
        ></div>

        <PrismicImage field={slice.primary.image} class="rounded-lg" />
      </div>
    {/if}
  </div>
</Bounded>
