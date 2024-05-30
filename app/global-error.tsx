'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="w-1/4 mx-auto mt-40">
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()} className="text-primary">Try again</button>
        </div>
      </body>
    </html>
  );
};