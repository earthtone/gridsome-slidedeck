<template>
  <main class="layout">
    <slot/>
  </main>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style src="../styles.css"/>
