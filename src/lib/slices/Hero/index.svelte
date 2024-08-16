<script lang="ts">
  import gsap from "gsap";
  import { onMount } from "svelte";

  import { PrismicImage, PrismicText } from "@prismicio/svelte";

  import ButtonLink from "../../components/ButtonLink.svelte";
  import Bounded from "../../components/Bounded.svelte";
  import TraingleGrid from "$lib/components/TraingleGrid.svelte";
  import type { HeroSlice } from "../../../prismicio-types";

  export let slice: HeroSlice;

  onMount(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
        {
          opacity: 1,
        },
      );

      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    tl.fromTo(
      ".hero__heading",
      { scale: 0.5 },
      { scale: 1, opacity: 1, duration: 1.4 },
    );
    tl.fromTo(
      ".hero__body",
      { y: 20 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=0.6",
    );
    tl.fromTo(
      ".hero__button",
      { scale: 1.5 },
      { scale: 1, opacity: 1, duration: 1.3 },
      "-=0.8",
    );
    tl.fromTo(
      ".hero__image",
      { y: 100 },
      { y: 0, opacity: 1, duration: 1.3 },
      "+=0.3",
    );
    tl.fromTo(
      ".hero__glow",
      { scale: 0.5 },
      { scale: 1, opacity: 1, duration: 1.8 },
      "-=1",
    );

    gsap.to(".hero__glow1", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 1,
      keyframes: [
        { top: "0%", left: "33%", duration: 0 },
        { top: "33%", left: "33%", duration: 2 },
        { top: "33%", left: "0%", duration: 3 },
        { top: "0%", left: "0%", duration: 2 },
        { top: "0%", left: "33%", duration: 3 },
      ],
    });
    gsap.to(".hero__glow2", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 1,
      keyframes: [
        { top: "33%", left: "0%", duration: 0 },
        { top: "0%", left: "0%", duration: 2 },
        { top: "0%", left: "33%", duration: 3 },
        { top: "33%", left: "33%", duration: 2 },
        { top: "33%", left: "0%", duration: 3 },
      ],
    });
  });
</script>

<Bounded
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
>
  <div class="relative text-center">
    <TraingleGrid></TraingleGrid>

    {#if slice.primary.heading}
      <h1
        class="hero__heading mx-auto max-w-3xl text-balance text-5xl font-medium opacity-0 md:text-7xl"
      >
        <PrismicText field={slice.primary.heading} />
      </h1>
    {/if}

    {#if slice.primary.body}
      <p
        class="hero__body mx-auto mt-6 max-w-md text-balance text-gray-300 opacity-0"
      >
        <PrismicText field={slice.primary.body} />
      </p>
    {/if}

    {#if slice.primary.button_link}
      <ButtonLink
        field={slice.primary.button_link}
        class="hero__button mt-8 opacity-0"
      >
        {slice.primary.button_label}
      </ButtonLink>
    {/if}

    {#if slice.primary.image}
      <div class="hero__image glass-container mt-16 w-fit opacity-0">
        <div
          class="hero__glow hero__glow1 absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 opacity-0 mix-blend-screen blur-[120px] filter"
        ></div>
        <div
          class="hero__glow hero__glow2 absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-500/50 opacity-0 mix-blend-screen blur-[120px] filter"
        ></div>

        <PrismicImage field={slice.primary.image} class="rounded-lg" />
      </div>
    {/if}
  </div>
</Bounded>
