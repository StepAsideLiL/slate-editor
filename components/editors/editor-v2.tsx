"use client";

import React, { useCallback, useState } from "react";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Editor,
  Element,
} from "slate";

import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

type CustomElement = {
  type: "paragraph" | "code" | null;
  children: CustomText[];
};
type CustomText = { text: string; bold?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function EditorV2() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        className="focus-visible:outline-none"
        placeholder="Write something"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (event.key === "`" && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            const [match] = Editor.nodes(editor, {
              match: (n: any) => n.type === "code",
            });
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: match ? "paragraph" : "code" },
              {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
              },
            );
          }
          if (event.key === "b" && event.ctrlKey) {
            event.preventDefault();
            Editor.addMark(editor, "bold", true);
          }
        }}
      />
    </Slate>
  );
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code className="rounded bg-muted px-1 py-[1px]">{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
