<script lang="ts" setup>
import { computed, inject } from 'vue';
import type { UserConfig, UserClassNames } from '@src/common/types/interfaces/user-config';

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const config = inject('config') as UserConfig;
const classNames = inject('class-names') as UserClassNames;

const visibleMessages = computed(() => {
  if (config.actions.showOnlyFirstErrorPerInput) {
    return props.messages.slice(0, 1);
  }

  return props.messages;
});
</script>

<template>
  <ul :class="classNames.errors.group">
    <template v-for="message in visibleMessages" :key="message">
      <li :class="classNames.errors.error">{{ message }}</li>
    </template>
  </ul>
</template>
