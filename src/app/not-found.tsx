import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundBody } from "@/components/sections/NotFoundBody";

/**
 * The 404 for an address that matches no route in the app.
 *
 * This boundary sits at the root, outside the (site) route group, so it
 * does not inherit the site header and footer the way a normal page does —
 * it has to render them itself, and offset the fixed header the way the
 * group layout's <main> does.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="pt-header">
        <NotFoundBody />
      </main>
      <Footer />
    </>
  );
}
