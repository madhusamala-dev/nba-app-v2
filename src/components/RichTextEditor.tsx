import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Image as ImageIcon, 
  Table as TableIcon,
  Palette,
  Highlighter,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = "Start writing..." 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-gray-200' : ''}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-gray-200' : ''}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'bg-gray-200' : ''}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Block Elements */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        {/* Colors */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColor('#000000')}
              title="Black"
            >
              <div className="w-4 h-4 bg-black rounded"></div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColor('#dc2626')}
              title="Red"
            >
              <div className="w-4 h-4 bg-red-600 rounded"></div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColor('#2563eb')}
              title="Blue"
            >
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColor('#16a34a')}
              title="Green"
            >
              <div className="w-4 h-4 bg-green-600 rounded"></div>
            </Button>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHighlight('#fef08a')}
            title="Yellow Highlight"
          >
            <div className="w-4 h-4 bg-yellow-200 rounded border"></div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHighlight('#bfdbfe')}
            title="Blue Highlight"
          >
            <div className="w-4 h-4 bg-blue-200 rounded border"></div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHighlight('#bbf7d0')}
            title="Green Highlight"
          >
            <div className="w-4 h-4 bg-green-200 rounded border"></div>
          </Button>
        </div>

        {/* Media & Tables */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={addImage}
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={addTable}
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="min-h-[200px] max-h-[400px] overflow-y-auto"
      />
    </div>
  );
};

export default RichTextEditor;