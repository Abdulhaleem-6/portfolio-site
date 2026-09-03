import Link from "next/link";

export default function NotFound() {
  return (
    <section className="rule">
      <div className="frame pad py-32">
        <p className="label label-signal">Error 404</p>
        <h1 className="display-l mt-6 max-w-[14ch]">That page does not exist.</h1>
        <Link href="/" className="action mt-10">
          Back to the work
        </Link>
      </div>
    </section>
  );
}
