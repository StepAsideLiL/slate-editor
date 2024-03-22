import EditorV1 from "@/components/editors/editor-v1";
import EditorV2 from "@/components/editors/editor-v2";
import EditorV3 from "@/components/editors/editor-v3";

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
              <kbd className="rounded bg-muted px-1 py-[1px]">ctrl</kbd> +{" "}
              <kbd className="rounded bg-muted px-1 py-[1px]">`</kbd>
            </span>
          </p>
        </div>

        <div className="min-h-20 border border-muted p-3">
          <EditorV1 />
        </div>
      </section>

      <section className="space-y-3 px-10">
        <div className="text-muted-foreground">
          <h1 className="text-xl">Editor 2</h1>
          <p>
            Features of Editor 1, and turn normal characters to bold characters
            with{" "}
            <span className="font-mono">
              <kbd className="rounded bg-muted px-1 py-[1px]">ctrl</kbd> +{" "}
              <kbd className="rounded bg-muted px-1 py-[1px]">b</kbd>
            </span>
          </p>
        </div>

        <div className="min-h-20 border border-muted p-3">
          <EditorV2 />
        </div>
      </section>

      <section className="space-y-3 px-10">
        <div className="text-muted-foreground">
          <h1 className="text-xl">Editor 3</h1>
          <p>
            Features of Editor 1, and toggle characters between bold and normal
            with{" "}
            <span className="font-mono">
              <kbd className="rounded bg-muted px-1 py-[1px]">ctrl</kbd> +{" "}
              <kbd className="rounded bg-muted px-1 py-[1px]">b</kbd>
            </span>
          </p>
        </div>

        <div className="min-h-20 border border-muted p-3">
          <EditorV3 />
        </div>
      </section>
    </main>
  );
}
