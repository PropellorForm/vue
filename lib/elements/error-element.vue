<script lang="ts" setup>
import { inject } from 'vue';
import type { UserClassNames } from '@src/common/types/interfaces/user-config';

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const classNames = inject('class-names') as UserClassNames;
</script>

<template>
  <ul v-if="messages.length > 0" :class="classNames.errors.group">
    <template v-for="message in messages" :key="message">
      <li :class="classNames.errors.error">{{ message }}</li>
    </template>
  </ul>
</template>
