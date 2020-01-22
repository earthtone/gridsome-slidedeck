<template>
  <Layout>
    <ul class="px-4">
      <li v-for="slide in slides" :key="slide" class="text-5xl text-red-900">
        <g-link :to="slide" class="hover:underline">{{ slide | depath }}</g-link>
      </li>
    </ul>
  </Layout>
</template>
<page-query>
  query Slides {
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
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  computed: {
    slides () {
      return this.$page.slides.edges.map(({ node }) => node.path)
    }
  },
  filters: {
    depath (s) {
      return s.replace(/(^\/\w+\/|\/$)/g, '')
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
