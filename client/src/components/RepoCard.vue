<template>
    <div @click="$emit('htClicked',!isClicked)">
        <b-card :class="isClicked ? 'bg-success text-white' : ''">
            <b-card-title>Repo Name</b-card-title>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'RepoCard',
  props: {
    isClicked: Boolean,
    repo: Object
  }
}
</script>

<style scoped>
div {
    cursor: pointer;
}
</style>
