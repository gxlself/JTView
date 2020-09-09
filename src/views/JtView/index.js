// import window.PLMVisWeb from '@/utils/plmvisweb.js'
import VJstree from 'vue-jstree'

export default {
  components: {
    VJstree
  },
  itemEvents: {
    mouseover: function () {
      console.log('mouseover')
    },
    contextmenu: function () {
      console.log(arguments[2])
      arguments[2].preventDefault()
      console.log('contextmenu')
    }
  },
  data () {
    const treeData = [
      {
        text: 'Same but with checkboxes',
        children: [
          {
            text: 'initially selected',
            selected: true
          },
          {
            text: 'custom icon',
            icon: 'fa fa-warning icon-state-danger'
          },
          {
            text: 'initially open',
            icon: 'fa fa-folder icon-state-default',
            opened: true,
            children: [
              {
                text: 'Another node'
              }
            ]
          },
          {
            text: 'custom icon',
            icon: 'fa fa-warning icon-state-warning'
          },
          {
            text: 'disabled node',
            icon: 'fa fa-check icon-state-success',
            disabled: true
          }
        ]
      },
      {
        text: 'Same but with checkboxes',
        opened: true,
        children: [
          {
            text: 'initially selected',
            selected: true
          },
          {
            text: 'custom icon',
            icon: 'fa fa-warning icon-state-danger'
          },
          {
            text: 'initially open',
            icon: 'fa fa-folder icon-state-default',
            opened: true,
            children: [
              {
                text: 'Another node'
              }
            ]
          },
          {
            text: 'custom icon',
            icon: 'fa fa-warning icon-state-warning'
          },
          {
            text: 'disabled node',
            icon: 'fa fa-check icon-state-success',
            disabled: true
          }
        ]
      },
      {
        text: 'And wholerow selection'
      }
    ]
    return {
      treeData,
      show: true,
      bodList: [{}],
      pmiTreeData: [
        {
          text: 'PMI',
          icon: 'fa fa-cubes'
        }
      ],
      psTreeData: [
        {
          text: '产品结构',
          icon: 'fa fa-cubes'
        }
      ],
      editingNode: null,
      editingItem: null,
      controlManager: null,
      viewerManager: null,
      pmiManager: null,
      modelRootPsId: null
    }
  },
  creatd () {

  },
  methods: {
    // itemClick (node) {
    //   console.log(node.model.text + ' clicked !')
    // },
    viewjt (path) {
      const host = this.$refs.host
      const childs = host.childNodes
      for (let i = childs.length - 1; i >= 0; i--) {
        host.removeChild(childs[i])
      }

      const controlManager = new window.PLMVisWeb.Control({
        // host: document.getElementById( "host" ),
        host: this.$refs.host,
        width: 500,
        height: 500
      })
      const viewerManager = controlManager.viewer
      viewerManager.open("/DATA?path='" + path + "'", function (success, modelRootPsId) {
        if (success) {
          this.modelRootPsId = modelRootPsId
          viewerManager.setVisibilityByPsId(modelRootPsId, true)
        }
      })
    },

    viewjtpmi (path) {
      const host = this.$refs.host
      const childs = host.childNodes
      for (let i = childs.length - 1; i >= 0; i--) {
        host.removeChild(childs[i])
      }

      const userData = { host: this.$refs.host, width: 200, height: 200 }
      const controlManager = new window.PLMVisWeb.Control(userData)
      this.controlManager = controlManager
      const viewerManager = controlManager.viewer
      this.viewerManager = viewerManager
      window.viewerManager = viewerManager
      viewerManager.open(path, (success, modelRootPsId) => {
        console.log('success', success)
        console.log('modelRootPsId', modelRootPsId)
        if (!success) { // 模型加载完成
          alert('模型加载失败！')
          return
        }
        this.loadAllPmi(viewerManager, modelRootPsId, this)

        this.loadProductStruct()

        // const pageHeight = document.documentElement.clientHeight
        this.treeHeight = 100

        // enableContextMenu()
      })
    },

    // 遍历产品结构
    loadProductStruct () {
      this.psTreeData = []

      this.viewerManager.getProductStructureInfo()
      const psData = this.viewerManager.getProductStructureInfo(this.viewerManager.psId, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
      // console.log(psData);

      // 1创建根节点
      const rootNode = { data: { psRootId: this.modelRootPsId }, type: 'psRoot', text: '产品结构', selected: false, icon: 'fa fa-cubes', opened: true, children: [] }
      this.psTreeData.push(rootNode)

      // 获取顶层id
      const topPsId = psData.childrenIds[0]
      this.cyclePs(topPsId, rootNode)
    },

    cyclePs (psId, parentNode) {
      // {name: "ElectricRazor", psId: "1:15", visibility: 0, childrenIds: Array(25)}
      const pschildData = this.viewerManager.getProductStructureInfo(psId, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
      const childIdsData = pschildData.childrenIds
      if (childIdsData.length > 0) {
        for (let i = 0; i < childIdsData.length; i++) {
          const psId = childIdsData[i]
          const psObj = this.viewerManager.getProductStructureInfo(psId, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
          const node = { data: { psId: psObj.psId }, type: 'productStruct', text: psObj.name, selected: false, icon: 'fa fa-cubes', opened: false, children: [] }
          parentNode.children.push(node)
          if (psObj.childrenIds && psObj.childrenIds.length > 0) { this.cyclePs(psId, node) }
        }
      }
    },

    // 获取 所有的 pmi
    loadAllPmi (viewerManager, modelRootPsId) {
      this.pmiTreeData = []

      const pmiManager = viewerManager.addExtension(window.PLMVisWeb.PMI)// 加载pmi

      this.pmiManager = pmiManager
      viewerManager.setVisibilityByPsId(modelRootPsId, true)
      pmiManager.loadPmiData(modelRootPsId, function () {
        const modelView = pmiManager.getModelViewsStructureInfo()
        const childModelView = modelView.children
        // const viewAndPmisMap = new Map()
        // const modelViewArray = []

        const designGroupTreeData = this.pmiManager.getDesignGroupsStructureInfo()
        console.log(designGroupTreeData)

        // 1创建根节点
        const rootNode = { data: { rootId: modelRootPsId }, type: 'pmiRoot', text: 'PMI', selected: false, icon: 'fa fa-cube', opened: true, children: [] }

        this.pmiTreeData.push(rootNode)

        const customViews = childModelView[0].children // 所有的自定义视图对象
        for (let i = 0; i < customViews.length; i++) {
          const viewData = customViews[i] // 视图对象  {name: "Side View 1", psId: "1:4342", refPsId: "1:15", pmiIds: Array(4)}

          // 2创建视图带PMI的节点
          const viewNode = { data: { viewData: viewData }, type: 'view', text: viewData.name, selected: false, icon: 'fa fa-object-group', opened: false, children: [] }
          rootNode.children.push(viewNode)

          const pmiIds = viewData.pmiIds // 所有的pmi 的id
          for (let j = 0; j < pmiIds.length; j++) {
            const id = pmiIds[j]
            // 根据pmi id获取mpi对象  {name: "Callout 1", psId: "1:4323"}
            const pmiData = pmiManager.getPmiStructureInfo(id, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
            // const viewId = viewData.psId
            // const viewName = viewData.name
            // const pmiId = pmiData.psId
            // const pmiName = pmiData.name

            // 3创建PMI节点
            const pmiNode = { data: { pmiData: pmiData, viewData: viewData }, type: 'pmi', text: pmiData.name, selected: false, icon: 'fa fa-product-hunt' }
            viewNode.children.push(pmiNode)

            // console.log(viewData, pmiData);
          }
        }
      })
    },

    standardView (viewName) {
      // this.viewerManager.setCameraToStandardView(window.PLMVisWeb.StandardViewType.X);
      if (viewName === 'X') {
        this.viewerManager.setCameraToStandardView(window.PLMVisWeb.StandardViewType.X)
      } else if (viewName === 'Y') {
        this.viewerManager.setCameraToStandardView(window.PLMVisWeb.StandardViewType.Y)
      } else if (viewName === 'Z') {
        this.viewerManager.setCameraToStandardView(window.PLMVisWeb.StandardViewType.Z)
      } else if (viewName === '正三轴') {
        this.viewerManager.setCameraToStandardView(window.PLMVisWeb.StandardViewType.TRIMETRIC)
      } else if (viewName === '获取对象') {
        const parts = this.viewerManager.getSelectedParts() // 选中的模型
        alert(parts)
      } else {
        const prop = {
          unit: '1',
          font: 'blockfont' // if the key exists, it will be overwritten with the new value!
        }
        const propertiesManager = this.viewerManager.addExtension(window.PLMVisWeb.Properties)
        propertiesManager.addProperties('1:3572', prop)
        const res = propertiesManager.getProperties('1:3572', true)
        console.log(res)
      }
    },
    // 点击树节点事件
    itemClick (node) {
      this.editingNode = node
      this.editingItem = node.model

      // console.log(this.editingNode);

      // 1很重要(节点点击立即有效果)
      this.editingNode.events.mouseout()
      this.editingNode.events.mouseover()

      const selectedNode = node.data // 选中的节点
      // 2选中父节点时同时选中下面的所有子节点
      if (this.editingNode.data.children) {
        // 2、当选中父节点时，所有的子节点都被选中或取消
        const childrens = this.editingNode.data.children
        for (let i = 0; i < childrens.length; i++) {
          childrens[i].selected = this.editingItem.selected
        }
      }
      if (selectedNode.type === 'pmi') {
        // 1、根据视图显示以及视图下面的pmi
        const viewId = selectedNode.data.viewData.psId
        const pmiId = selectedNode.data.pmiData.psId
        this.pmiManager.setModelViewActive(viewId, true, function () {
          this.pmiManager.setSelectionByPsId(pmiId, true)
          // this.pmiManager.setPmiColorByPsId(pmiId, 0xff0000, 1, false);
        })
      } else if (selectedNode.type === 'view') {
        // 2、显示视图
        const viewId = selectedNode.data.viewData.psId
        this.pmiManager.setModelViewActive(viewId, this.editingItem.selected)
      } else if (selectedNode.type === 'pmiRoot') {
        // 2、显示视图
        const viewId = selectedNode.data.rootId
        this.pmiManager.setModelViewActive(viewId, true, function () {
          this.pmiManager.setVisibilityByPsId('1:15', this.editingItem.selected)
        })
      } else if (selectedNode.type === 'productStruct') {
        const data = this.viewerManager.getProductStructureInfo(selectedNode.data.psId, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
        if (data.childrenIds) {
          this.viewerManager.setVisibilityByPsIds(data.childrenIds, this.editingItem.selected)
          this.viewerManager.setSelectionByPsIds(data.childrenIds, this.editingItem.selected, true) // 被选中状态
        } else {
          this.viewerManager.setVisibilityByPsId(data.psId, this.editingItem.selected)
          this.viewerManager.setSelectionByPsId(data.psId, this.editingItem.selected, true) // 选中对象
        }
      } else if (selectedNode.type === 'psRoot') {
        const data = this.viewerManager.getProductStructureInfo(selectedNode.data.psId, [window.PLMVisWeb.AttributeFlag.VISIBILITY], 0)
        if (data.childrenIds) {
          this.viewerManager.setVisibilityByPsIds(data.childrenIds, this.editingItem.selected) // 显示所有的对象
        } else {
          this.viewerManager.setVisibilityByPsId(data.psId, this.editingItem.selected)
        }
      }

      console.log(node.model.text + ' clicked !')
    },

    itemDragStart (node) {
      console.log(node.model.text + ' drag start !')
    },
    itemDragEnd (node) {
      console.log(node.model.text + ' drag end !')
    },
    itemDropBefore (node, item, draggedItem, e) {
      if (!draggedItem) {
        item.addChild({
          text: 'newNode',
          value: 'newNode'
        })
      }
    },
    itemDrop (node, item) {
      const sortBy = function (attr, rev) {
        if (rev === undefined) {
          rev = 1
        } else {
          rev = (rev) ? 1 : -1
        }
        return function (a, b) {
          a = a[attr]
          b = b[attr]
          if (a < b) {
            return rev * -1
          }
          if (a > b) {
            return rev * 1
          }
          return 0
        }
      }
      item.children.sort(sortBy('text', true))
      console.log(node.model.text + ' drop !')
    },
    inputKeyUp: function () {
      const text = this.searchText
      const patt = new RegExp(text)
      this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, function (node) {
        if (text !== '' && node.model !== undefined) {
          const str = node.model.text
          if (patt.test(str)) {
            node.$el.querySelector('.tree-anchor').style.color = 'red'
          } else {
            node.$el.querySelector('.tree-anchor').style.color = '#000'
          } // or other operations
        } else {
          node.$el.querySelector('.tree-anchor').style.color = '#000'
        }
      })
    },
    addChildNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addChild({
          text: 'newNode'
        })
      }
    },
    removeNode: function () {
      if (this.editingItem.id !== undefined) {
        const index = this.editingNode.parentItem.indexOf(this.editingItem)
        this.editingNode.parentItem.splice(index, 1)
      }
    },
    addBeforeNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addBefore({
          text: this.editingItem.text + ' before'
        }, this.editingNode)
      }
    },
    addAfterNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addAfter({
          text: this.editingItem.text + ' after'
        }, this.editingNode)
      }
    },
    openChildren: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.openChildren()
      }
    },
    closeChildren: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.closeChildren()
      }
    },
    refreshNode: function () {
      this.asyncData = [
        this.$refs.tree2.initializeLoading()
      ]
      this.$refs.tree2.handleAsyncLoad(this.asyncData, this.$refs.tree2)
    },
    customItemClick: function (node, item, e) {
      e.stopPropagation()
      const index = node.parentItem.indexOf(item)
      node.parentItem.splice(index, 1)
    },
    customItemClickWithCtrl: function () {
      console.log('click + ctrl')
    },
    fillData: function () {
      if (this.editingItem.id !== undefined) {
        for (let i = 0; i < this.filesToAdd; i++) {
          this.filesToAddIndex++
          this.editingItem.addChild({
            text: 'File' + this.filesToAddIndex,
            icon: 'fa fa-file icon-state-danger'
          })
        }
      }
    }
  }
}
