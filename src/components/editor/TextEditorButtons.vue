<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      h1
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      h3
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      h4
    </button>
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      link
    </button>
    <button @click="editor.chain().focus().unsetLink().run()" v-if="editor.isActive('link')">
      remove link
    </button>
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      paragraph
    </button>
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      bold
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      italic
    </button>
    <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
      underline
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      strike
    </button>
    <div v-if="linkEditorOpen" class="mb-2 mt-2" style="display: flex">
      <custom-select :options="['intern', 'extern']" v-model="linkType" />
      <custom-input v-if="linkType === 'extern'" v-model="linkURL" />
      <custom-select v-if="linkType === 'intern'" :options="$store.state.pages.map(({ slug }) => slug)" v-model="linkSlug" />
      <button class="button" @click="submitLink">Link setzen</button>
    </div>
  </div>
</template>

<script>
import { Editor } from "@tiptap/vue-2"
import CustomSelect from '../form/CustomSelect'
import CustomInput from '../form/CustomInput.vue'

export default {
  name: 'text-editor-buttons',
  components: {
    CustomSelect, CustomInput
  },
  props: {
    editor: { type: Editor, default: null }
  },
  data() {
    return {
      linkEditorOpen: false,
      linkType: 'intern',
      linkSlug: '',
      linkURL: '',
      internLinks: [],
    }
  },
  computed: {
    internLinks() {
      return this.$store.state.pages.map(({ slug }) => slug);
    }
  },
  methods: {
    setLink() {
      this.linkEditorOpen = true
    },
    submitLink() {
      this.linkEditorOpen = false
      const url = (this.linkType === 'intern') ? `#/${this.linkSlug}` : this.linkURL;
      this.editor.chain().focus().setLink({ href: url }).run()
    }
  }
};
</script>

<style>
</style>