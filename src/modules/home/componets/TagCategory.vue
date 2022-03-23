<template>
  <v-chip :color="color" class="ma-1" x-small>
    {{ text }}
  </v-chip>
</template>
<script>
export default {
  name: 'tag-category',
  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  }
}
</script>