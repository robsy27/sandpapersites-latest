import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-900 py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-accent uppercase">
            404
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">
            That page has wandered off.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-mist-300">
            The link may be out of date, or the page may have moved. Head back
            to the homepage, or get in touch and I’ll point you the right way.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" icon="arrowRight">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Contact
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
