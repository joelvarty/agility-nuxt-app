<template>
  <!-- <div v-if="$agility.client.config.isPreview === true">
    <div id="agility-preview-bar" title="You are currently in Preview Mode.">
      Preview Mode
      <span
        id="agility-clear-preview"
        title="Clear preview mode"
        :click="clearPreviewMode"
      >X</span>
    </div>
  </div>-->

  <div>Agility Page</div>
</template>

<script>
export default {
  methods: {
    clearPreviewMode: function() {
      window.location.href = '?AgilityPreview=0'
    }
  }
}
</script>

<style scoped>
#agility-preview-bar {
  position: fixed;
  z-index: 2;
  background-color: #ebebeb;
  color: #000;
  padding: 4px;
  font-size: 10px;
  border-bottom-right-radius: 4px;
}

#agility-clear-preview {
  color: #000;
  margin-left: 4px;
  padding: 1px 3px;
  font-size: 8px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
}
</style>