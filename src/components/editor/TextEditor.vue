<template>
  <div>
    <text-editor-buttons :editor="editor" />

    <span>
    <editor-content :editor="editor" />
    </span>

    <div class="export">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import TextEditorButtons from './TextEditorButtons.vue';


export default {
  components: {
    EditorContent,
    TextEditorButtons,
  },
  data() {
    return {
      editor: null,
      view: "editor",
      content: "<p>Moin</p>",
      html: '',
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Document, Paragraph, Text, Heading],
      autofocus: true,
      editable: true,
      content: '<p>Moin</p>'
    });
    this.html = this.editor.getHTML();

    this.editor.on('update', () => {
      this.html = this.editor.getHTML();
    })
  },

  methods: {
    showHtml() {
      this.content;
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
</style>