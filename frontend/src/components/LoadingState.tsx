export function LoadingState() {
  return (
    <section className="section-shell py-10">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-3xl border border-line/70 bg-white/70 shadow-card"
          >
            <div className="h-52 rounded-t-3xl bg-neutral-200/70" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 rounded bg-neutral-200/80" />
              <div className="h-4 w-full rounded bg-neutral-200/70" />
              <div className="h-4 w-5/6 rounded bg-neutral-200/70" />
              <div className="h-11 rounded-xl bg-neutral-200/80" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
