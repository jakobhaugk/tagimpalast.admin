<template>
  <div>
    <text-editor-buttons :editor="editor" />

    <editor-content :editor="editor" />

    <div class="export" v-if="showHtml">
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
  props: {
    showHtml: { type: Boolean, default: false },
    value: { type: String, default: '' },
    id: String
  },
  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Document, Paragraph, Text, Heading],
      autofocus: true,
      editable: true,
      content: this.value,
    });
    this.editor.on('update', () => {
      this.$emit('input', this.editor.getHTML())
    })
    this.editor.commands.setContent(this.value)
  },

  updated() {
    
      this.editor.commands.setContent(this.value, true)
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror {
  border-radius: 4px;
  color: #363636;
  display: block;
  max-width: 100%;
  min-width: 100%;
  padding: calc(.75em - 1px);
  border: 1px solid;
}
</style>