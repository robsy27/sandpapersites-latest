import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VideoBackdrop } from "@/components/chrome/VideoBackdrop";

/** Shared hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  video,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  /** Looping clip behind the band. Replaces the ambient backdrop. */
  video?: string;
}) {
  /* Every inner page gets footage, not just the county pages. Shrewsbury is
     the default because Shropshire is the home county; the Cheshire page
     passes Chester explicitly. */
  const clip = video ?? "/video/shrewsbury.mp4";
  return (
    /* Given real height and its content vertically centred. It used to be a
       shallow band with the title crowded against the fixed header, which
       read as the page starting mid-sentence. */
    <section className="relative flex min-h-[58svh] items-center overflow-hidden bg-navy-900 py-20 sm:min-h-[62svh] sm:py-24 lg:py-28 full:bg-navy-900/82">
      <VideoBackdrop src={clip} />

      <Container className="relative w-full">
        <Reveal className="max-w-3xl">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold text-balance text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mist-300">
            {lead}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
