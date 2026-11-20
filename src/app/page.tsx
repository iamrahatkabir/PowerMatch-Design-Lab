import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm font-medium text-neutral-500">PowerMatch Design Lab</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-2 text-neutral-600">Pick a category to see its screens.</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const body = (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                {!category.ready && (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-neutral-600">{category.description}</p>
            </>
          );

          return (
            <li key={category.slug}>
              {category.ready ? (
                <Link
                  href={`/${category.slug}`}
                  className="block h-full rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-400 hover:shadow-sm"
                >
                  {body}
                </Link>
              ) : (
                <div className="h-full rounded-xl border border-dashed border-neutral-200 p-5 opacity-60">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
