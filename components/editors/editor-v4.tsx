"use client";

import React, { useCallback, useMemo, useState } from "react";
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
import { Bold, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function EditorV4() {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem("content") ||
          '[{type: "paragraph",children: [{ text: "A line of text in a paragraph." }]}]',
      ),
    [],
  );

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
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type,
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <div className="space-x-2 pb-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          <Bold className="size-3" />
        </Button>

        <Button
          variant={"outline"}
          size={"icon"}
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          <Code className="size-3" />
        </Button>
      </div>

      <Editable
        className="focus-visible:outline-none"
        placeholder="Write something"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (event.key === "`" && event.ctrlKey) {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }

          if (event.key === "b" && event.ctrlKey) {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }

          // if (!event.ctrlKey) {
          //   return;
          // }

          // // Replace the `onKeyDown` logic with our new commands.
          // switch (event.key) {
          //   case "`": {
          //     event.preventDefault();
          //     CustomEditor.toggleCodeBlock(editor);
          //     break;
          //   }

          //   case "b": {
          //     event.preventDefault();
          //     CustomEditor.toggleBoldMark(editor);
          //     break;
          //   }
          // }
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
