<template>
  <node-view-wrapper>
    <div
      class="notex-ordered-list d-flex"
      @mouseover="setFocused(true)"
      @mouseleave="setFocused(false)"
      :style="{ width: '100%' }"
    >
      <div class="d-flex align-center flex-column handles" contenteditable="false">
        <v-icon
          class="d-inline-block pt-2 drag-handle"
          :size="22"
          draggable="true"
          data-drag-handle
        >
          {{ focused ? "drag_indicator" : null }}
        </v-icon>
      </div>
      <node-view-content class="notex-ordered-list__content" :class="`${textAlign}`" as="ol" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "OrderedListWrapper",
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    setFocused(focused) {
      this.focused = focused;
    },
  },
  computed: {
    textAlign() {
      return `text-${this.node.attrs.textAlign}`;
    },
  },
};
</script>

<style lang="scss">
.notex-ordered-list {
  li::marker {
    font-size: 1rem;
    font-weight: 400;
  }

  li {
    margin-left: 0.6rem;
  }

  .handles {
    width: 25px;
    opacity: 0.3;
  }

  .drag-handle {
    cursor: grab;
  }

  .setting-handle {
    cursor: pointer;
  }

  .notex-ordered-list__content {
    p {
      padding-left: 0 !important;
    }
    padding: 0.5rem;
    width: calc(100% - 25px);
    display: inline;
  }
}
</style>
