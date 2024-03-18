import EditorV1 from "@/components/editors/editor-v1";
import EditorV2 from "@/components/editors/editor-v2";

export default function Page() {
  return (
    <main className="container space-y-10">
      {/* <SlateEditor /> */}
      <section className="space-y-3 px-10">
        <div className="text-muted-foreground">
          <h1 className="text-xl">Editor 1</h1>
          <p>
            Toggle between code block and paragraph with{" "}
            <span className="font-mono">
              <code className="rounded bg-muted px-1 py-[1px]">ctrl</code> +{" "}
              <code className="rounded bg-muted px-1 py-[1px]">`</code>
            </span>
          </p>
        </div>

        <div className="min-h-20 border border-muted p-3">
          <EditorV1 />
        </div>
      </section>

      <section className="space-y-3 px-10">
        <div className="text-muted-foreground">
          <h1 className="text-xl">Editor 1</h1>
          <p>
            Toggle between code block and paragraph with{" "}
            <span className="font-mono">
              <code className="rounded bg-muted px-1 py-[1px]">ctrl</code> +{" "}
              <code className="rounded bg-muted px-1 py-[1px]">`</code>
            </span>
          </p>
        </div>

        <div className="min-h-20 border border-muted p-3">
          <EditorV2 />
        </div>
      </section>
    </main>
  );
}
