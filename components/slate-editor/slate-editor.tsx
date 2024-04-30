"use client"

import { useCallback, useMemo, useState } from "react"
import { Editable, RenderElementProps, Slate, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { Descendant, createEditor, Range, Editor, Transforms } from "slate"
import { H1Element, H2Element, H3Element } from "./slate-custom-types"

export default function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const initialValue: Descendant[] = [{
    type: "paragraph",
    children: [{
      text: '',
    },]
  }]

  const [target, setTarget] = useState<Range | null>()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])

  const filteredBlock = blockList.filter(c =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10)
  console.log(filteredBlock);
  

  // @ts-ignore
  const onKeyDown = useCallback(event => {
    if (target && filteredBlock.length > 0) {
      switch(event.key) {
        case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= filteredBlock.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? filteredBlock.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertBlock(editor, filteredBlock[0])
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
      }
    }
  }, [filteredBlock, editor, index, target])

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={() => {
      const { selection } = editor

      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection)
        const wordBefore = Editor.before(editor, start, { unit: 'word' })
        const before = wordBefore && Editor.before(editor, wordBefore)
        const beforeRange = before && Editor.range(editor, before, start)
        if (beforeRange?.anchor.offset === 0) {
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange)
            setSearch(beforeMatch[1])
            setIndex(0)
            return
          }
        }
      }

      setTarget(null)
    }}>
      <Editable className="p-2 bg-muted h-96" placeholder={"Write or type '/' for commands"} onKeyDown={onKeyDown} renderElement={renderElement} />
    </Slate>
  )
}

const insertBlock = (editor: Editor, blockName: string) => {
  switch (blockName) {
    case "Header 1":
      const header1: H1Element = {
        type: "h1",
        character: "",
        children: [{ text: '' }],
      }
      Transforms.insertNodes(editor, header1)
      Transforms.move(editor)
      break;
    case "Header 2":
      const header2: H2Element = {
        type: "h2",
        character: "",
        children: [{ text: '' }],
      }
      Transforms.insertNodes(editor, header2)
      Transforms.move(editor)
      break;
    case "Header 3":
      const header3: H3Element = {
        type: "h3",
        character: "",
        children: [{ text: '' }],
      }
      Transforms.insertNodes(editor, header3)
      Transforms.move(editor)
      break;
  }
}

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'h1':
      return <h1 {...props} className="text-9xl font-bold" />
    case 'h2':
      return <h2 {...props} className="text-4xl font-medium" />
    case 'h3':
      return <h3 {...props} className="text-2xl" />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const blockList = [
  "Header 1",
  "Header 2",
  "Header 3",
  "Bullet List",
  "Ordered List",
  "To-Do List",
]