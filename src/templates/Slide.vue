<template>
  <section>
    <global-events @keydown.right="next" @keydown.left="prev"/>
    <!-- <article v-html="$page.slide.content" /> -->
    <markdown :plugins="plugins">
      {{ $page.slide.content }}
    </markdown>
  </section>
</template>
<page-query>
  query Slide ($path: String!) {
    slide(path: $path) {
      id
      path
      content
    }

    slides: allSlide {
      edges {
        node {
          path
        }
      }
    }
  }
</page-query>
<script>
import Markdown from '@earthtone/vue-markdown-lite'
import markdownItAttrs from 'markdown-it-attrs'

export default {
  components: {
    Markdown
  },
  data () {
    return {
      plugins: [
        [markdownItAttrs]
      ]
    }
  },
  methods: {
    next () {
      this.$router.push(this.nextSlide)
    },
    prev () {
      if (this.currentIndex <= 0) return
      this.$router.push(this.prevSlide)
    }
  },
  computed: {
    slides () {
      return this.$page.slides.edges.map(({ node }) => node.path)
    },
    currentIndex () {
      return this.slides.findIndex(p => p === this.$page.slide.path)
    },
    nextSlide () {
      return this.slides[(this.currentIndex + 1) % this.slides.length]
    },
    prevSlide () {
      return this.slides[(this.currentIndex - 1) % this.slides.length]
    }
  }
}
</script>
