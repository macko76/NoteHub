<template>
  <node-view-wrapper>
    <div
      class="notex-heading d-flex"
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
      <node-view-content class="notex-heading__content" :class="`${textAlign}`" as="h1" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "HeadingWrapper",
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
.notex-heading {
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

  .notex-heading__content {
    padding: 0.5rem;
    width: calc(100% - 33px);
    display: inline;

    h1 {
      font-size: 2.6rem;
      font-weight: 600;
      line-height: 1;
    }

    h2 {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 0.8;
    }
  }
}
</style>
