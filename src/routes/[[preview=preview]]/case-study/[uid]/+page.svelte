<script>
  import { PrismicText, SliceZone, PrismicImage } from "@prismicio/svelte";

  import { components } from "$lib/slices";
  import Bounded from "$lib/components/Bounded.svelte";
  import TraingleGrid from "$lib/components/TraingleGrid.svelte";
  import gsap from "gsap";
  import { onMount } from "svelte";

  export let data;

  onMount(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(".case-study__image", {
        opacity: 1,
      });

      return;
    }

    gsap.fromTo(
      ".case-study__image",
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 1,
        delay: 0.5,
      },
    );
  });
</script>

<Bounded>
  <div class="relative grid w-full place-items-center text-center">
    <TraingleGrid></TraingleGrid>
  </div>

  <h1 class="text-5xl font-medium md:text-7xl">
    <PrismicText field={data.page.data.company}></PrismicText>
  </h1>
  <span class="block text-lg text-yellow-500">Case Study</span>
  <p class="mb-4 mt-8 max-w-xl text-lg text-slate-300">
    <PrismicText field={data.page.data.description}></PrismicText>
  </p>
  <PrismicImage
    field={data.page.data.image}
    class="case-study__image rounded-lg opacity-0"
  ></PrismicImage>

  <div class="mx-auto mt-12 md:mt-16">
    <SliceZone slices={data.page.data.slices} {components} />
  </div>
</Bounded>
