import { cn } from "@/lib/utils";

interface AboutBasicSection {
  title: string;
  content: string;
  label?: string;
}
interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}

interface AboutBasicProps {
  brand?: string; // italic serif word shown before the heading, e.g. "Amuse"
  heading: string;
  description?: string;
  images?: Image[];
  sections?: AboutBasicSection[];
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

interface About29Props extends AboutBasicProps {}
type Props = Partial<About29Props>;

const defaultProps: About29Props = {
  brand: "Amuse",
  heading: "is a high-end and fashionable cosmetics in unique colors and designs",
  description:
    "We are a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  images: [
    { src: "/IU.jpeg", alt: "Team collaboration" },
    { src: "/Wonyoung.jpeg", alt: "Studio workspace" },
    { src: "/GISELLE.jpeg", alt: "Studio workspace" }
  ],
  buttonText: "Shop now",
  buttonHref: "/products",
};

const MAX_COLUMNS = 3;
const MAX_IMAGES = 3;
const COLUMN_CHARS = 160;

// Tilt for each photo so the row feels playful, like the reference
const TILTS = ["-rotate-3", "rotate-0", "rotate-6"];

const truncate = (content: string) => {
  if (content.length <= COLUMN_CHARS) return content;
  return `${content.slice(0, COLUMN_CHARS).trimEnd()}…`;
};

const About29 = (props: Props) => {
  const { brand, heading, description, images, sections, buttonText, buttonHref, className } = {
    ...defaultProps,
    ...props,
  };

  const gallery = (images ?? []).slice(0, MAX_IMAGES);
  const columns = (sections ?? []).slice(0, MAX_COLUMNS);
  const mission = sections?.[0];

  return (
    <section className={cn("py-20 lg:py-28", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-14 lg:gap-20">
          {/* Heading */}
          <div className="flex max-w-4xl flex-col items-center gap-5 text-center">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-hot-pink md:text-5xl lg:text-6xl">
              {brand && (
                <span
                  className="mr-2 font-normal italic"
                  style={{ fontFamily: "'Instrument Serif', Georgia, 'Times New Roman', serif" }}
                >
                  {brand}
                </span>
              )}
              {heading}
            </h2>
            {description && (
              <p className="max-w-xl text-base leading-relaxed text-soft-slate md:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Tilted photo row */}
          {gallery.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {gallery.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={cn(
                    "aspect-square w-36 rounded-3xl object-cover shadow-sm md:w-52 lg:w-64",
                    TILTS[i % TILTS.length],
                  )}
                />
              ))}
            </div>
          )}

          {/* Feature panel */}
          {mission && (
            <div className="flex w-full flex-col items-center gap-6 rounded-3xl bg-white/70 p-8 text-center md:p-14">
              {mission.label && (
                <p className="text-sm font-medium text-soft-slate">{mission.label}</p>
              )}
              <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-hot-pink md:text-4xl">
                {mission.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-soft-slate">
                {mission.content}
              </p>
              {buttonText && (
                <a
                  href={buttonHref}
                  className="mt-2  inline-flex h-11 items-center justify-center rounded-50 bg-hot-pink px-10 text-sm font-boldx text-white transition-colors hover:bg-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hot-pink"
                >
                  {buttonText}
                </a>
              )}
            </div>
          )}

          {/* Columns */}
          {columns.length > 1 && (
            <div className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
              {columns.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-3 rounded-2xl bg-white/70 p-6"
                >
                  <h4 className="text-lg font-semibold text-hot-pink">
                    {section.title}
                  </h4>
                  <p className="text-soft-slate">{truncate(section.content)}</p>
                </div>
              ))}
            </div>
          )}

          {/* No sections given: still show the button under the photos */}
          {!mission && buttonText && (
            <a
              href={buttonHref}
              className="inline-flex h-15 w-60 items-center justify-center rounded-24 bg-hot-pink px-10 text-xl font-bold text-white transition-colors hover:bg-coral focus-visible:outline-2 
                          focus-visible:outline-offset-2 focus-visible:outline-hot-pink"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export { About29 };