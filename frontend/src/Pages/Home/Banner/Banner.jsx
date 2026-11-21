
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDES = [
  { id: 1, src: "/banner/01.png", alt: "Bachai BD banner 1" },
  { id: 2, src: "/banner/02.png", alt: "Bachai BD banner 2" },
  { id: 3, src: "/banner/03.jpg", alt: "Bachai BD banner 3" },
  { id: 4, src: "/banner/04.jpg", alt: "Bachai BD banner 4" },
  { id: 5, src: "/banner/05.jpg", alt: "Bachai BD banner 5" },
  { id: 6, src: "/banner/06.jpg", alt: "Bachai BD banner 6" },
  { id: 7, src: "/banner/07.png", alt: "Bachai BD banner 7" },
];

export default function Banner() {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 30,
    },
    [autoplay.current]
  );

  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      aria-label="Bachai BD promotional banners"
      className="
        relative w-full overflow-hidden
        bg-white md:bg-gray-100
        h-[clamp(300px,32vw,520px)]
      "
    >
      {/* CAROUSEL */}

      <div
        ref={emblaRef}
        className="h-full w-full overflow-hidden"
      >
        <div className="flex h-full touch-pan-y">

          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="
                relative h-full min-w-0
                flex-[0_0_100%]
                overflow-hidden
                bg-white md:bg-gray-100
              "
            >

              {/* BLURRED BACKGROUND - DESKTOP ONLY */}

              <img
                src={slide.src}
                alt=""
                aria-hidden="true"
                className="
                  hidden md:block
                  absolute inset-0
                  h-full w-full
                  object-cover
                  scale-110
                  blur-2xl
                  opacity-50
                "
                draggable={false}
              />

              {/* BACKGROUND OVERLAY */}

              <div
                className="
                  absolute inset-0
                  bg-white
                  md:bg-black/10
                  h-1/2 md:h-full
                "
              />

              {/* ORIGINAL BANNER IMAGE */}

              <motion.img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable={false}
                initial={false}
                animate={
                  selected === index
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0.95,
                        scale: 1,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute inset-0 z-10
                  h-1/2 md:h-full
                  w-full
                  object-contain
                  object-center
                  select-none
                "
              />

            </div>
          ))}

        </div>
      </div>

      {/* PROGRESS BAR */}

      <div
        className="
          absolute left-0 right-0 top-0
          z-30 h-[3px] bg-white/20
        "
      >
        <motion.div
          key={selected}
          initial={{ width: 0 }}
          animate={{
            width: `${((selected + 1) / SLIDES.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
          className="h-full bg-orange-500"
        />
      </div>

      {/* PREVIOUS BUTTON */}

      <motion.button
        type="button"
        onClick={scrollPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous banner"
        className="
          hidden md:flex
          absolute left-3 top-1/2 z-30
          -translate-y-1/2
          h-10 w-10 items-center justify-center
          rounded-full
          border border-white/40
          bg-white/70 text-gray-800
          shadow-md backdrop-blur-md
          transition hover:bg-white
          lg:left-6 lg:h-12 lg:w-12
        "
      >
        <FiChevronLeft size={25} />
      </motion.button>

      {/* NEXT BUTTON */}

      <motion.button
        type="button"
        onClick={scrollNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next banner"
        className="
          hidden md:flex
          absolute right-3 top-1/2 z-30
          -translate-y-1/2
          h-10 w-10 items-center justify-center
          rounded-full
          border border-white/40
          bg-white/70 text-gray-800
          shadow-md backdrop-blur-md
          transition hover:bg-white
          lg:right-6 lg:h-12 lg:w-12
        "
      >
        <FiChevronRight size={25} />
      </motion.button>

      {/* DOT INDICATORS */}

      <div
        className="
          hidden md:flex
          absolute bottom-4 left-1/2 z-30
          -translate-x-1/2
          items-center gap-2
          rounded-full bg-black/25
          px-3 py-2 backdrop-blur-md
        "
      >
        {SLIDES.map((slide, index) => (
          <motion.button
            key={slide.id}
            type="button"
            onClick={() => scrollTo(index)}
            animate={{
              width: selected === index ? 24 : 7,
              opacity: selected === index ? 1 : 0.55,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            aria-label={`Go to banner ${index + 1}`}
            aria-current={
              selected === index ? "true" : undefined
            }
            className="
              h-[7px] rounded-full
              bg-white
            "
          />
        ))}
      </div>

    </section>
  );
}
