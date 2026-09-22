"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="container section" role="alert"><h1>Щось не завантажилось</h1><p>Спробуйте ще раз або поверніться трохи пізніше.</p><button type="button" onClick={reset}>Спробувати ще раз</button></div>; }
