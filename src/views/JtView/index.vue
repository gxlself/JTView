<template>
  <li-row>
    <li-col :span="8">
      <!-- <v-jstree :data="treeData" show-checkbox multiple allow-batch whole-row @item-click="itemClick"></v-jstree> -->
      <v-jstree ref="tree2" class="pmiTree"
        :data="pmiTreeData"  show-checkbox multiple allow-batch whole-row  draggable
        @item-click="itemClick"
        @item-drag-start="itemDragStart"
        @item-drag-end="itemDragEnd"
        @item-drop-before = "itemDropBefore"
        @item-drop="itemDrop">
      </v-jstree>
      <v-jstree ref="tree2" class="psTree"
        :data="psTreeData" show-checkbox multiple allow-batch whole-row draggable
        @item-click="itemClick"
        @item-drag-start="itemDragStart"
        @item-drag-end="itemDragEnd"
        @item-drop-before = "itemDropBefore"
        @item-drop="itemDrop">
      </v-jstree>
    </li-col>
    <li-col :span="16">
      <div ref="host" id="host" v-if="show"></div>
      <div id="contextMenu">
        <input id="isOnObject" type="checkbox" />
        <input id="isOnPmi" type="checkbox" />
        <div class="emptySpace">
          <input type="button"  id = "commond2" value="重置视图" @click="standardView('Z')" />
          <input type="button"  id = "commond1" value="X轴" @click="standardView('X')" />
          <input type="button"  id = "commond2" value="Y轴" @click="standardView('Y')" />
          <input type="button"  id = "commond2" value="正三轴" @click="standardView('正三轴')" />
          <input type="button"  id = "commond2" value="获取对象" @click="standardView('获取对象')" />
          <input type="button"  id = "commond2" value="测试" @click="standardView('')" />
        </div>
      </div>
    </li-col>
    <li-col>
      <li-button @click="viewjtpmi('http://localhost:3000/assets/20200715')">点击</li-button>
    </li-col>
  </li-row>
</template>

<script>
import index from './index'
export default index
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
