<template>
  <v-chip :color="tag.color" class="ma-1" x-small>
    {{ tag.text }}
  </v-chip>
</template>
<script>
export default {
  name: 'tag-category',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>