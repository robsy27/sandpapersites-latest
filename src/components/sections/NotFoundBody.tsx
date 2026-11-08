import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The body of the 404 page, without any page chrome.
 *
 * It is a component rather than a page because there are two places a
 * "not found" can surface and they need different wrappers: the root
 * boundary at app/not-found.tsx (an address that matches no route at all,
 * which renders outside the (site) layout and so has to bring its own
 * header and footer) and the one inside the (site) group (a `notFound()`
 * thrown by a real page, which already sits inside the site chrome).
 *
 * Sharing the body keeps the two from drifting apart.
 */
export function NotFoundBody() {
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
          <p className="no-justify mt-6 text-base leading-relaxed text-mist-300">
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
