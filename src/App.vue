<template>
  <div id="app">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- 主要内容 -->
              <component :is="Component"></component>

              <!-- 加载中状态 -->
              <template #fallback> 正在加载... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
