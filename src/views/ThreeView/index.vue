<template>
  <div id="model"></div>
</template>

<script>
import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, AmbientLight, Color, GridHelper, Group } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' // 轨迹控制器
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
export default {
  mounted () {
    this.$nextTick(() => {
      this.init3d()
      this.initScene()
      this.initCamera()
      this.addGridHelper()
      this.scene.add(this.camera)
      document.getElementById('model').appendChild(this.renderer.domElement)
      this.initControl()
      this.animate()
      this.loadSTL()
    })
  },
  data () {
    // 路径预设置
    const mtlLoader = new MTLLoader().setPath('http://localhost:10818/')
    const objLoader = new OBJLoader().setPath('http://localhost:10818/')
    return {
      camera: null,
      scene: null,
      renderer: null,
      orbitControl: null,
      mtlLoader,
      objLoader
    }
  },
  methods: {
    init3d () {
      const fov = 50
      const aspect = window.innerWidth / window.innerHeight
      const near = 1
      const far = 3000

      // 相机实例化
      this.camera = new PerspectiveCamera(fov, aspect, near, far)
      // 场景实例化
      this.scene = new Scene()
      // 定义画布，预设置
      this.renderer = new WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    initScene () {
      this.scene.background = new Color(0x333366)
      this.scene.add(new AmbientLight(0xffffff))
    },
    initCamera () {
      this.camera.up.set(0, 1, 0)
      this.camera.position.set(-1400, 1000, 1000)
      this.camera.add(new PointLight(0xffffff))
    },
    addGridHelper () {
      // 尺寸,细分格子数，中线颜色，网格颜色
      const grid = new GridHelper(1400, 600, 0xffffff, 0x888888)
      // grid.rotateOnAxis( new Vector3( 1, 0, 0 ), 90 * ( Math.PI / 180 ) )
      this.scene.add(grid)
    },
    initControl () {
      this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControl.addEventListener('change', this.render)
      //   controls.target.set( 0, 1.2, 2 );
      this.orbitControl.update()
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    async loadSTL () {
      this.mtlLoader.load('SRTC_2C0821_L.mtl', (materials) => {
        const lxgroup = new Group()
        materials.preload()
        this.objLoader.setMaterials(materials)
          .load('SRTC_2C0821_L.obj', group => {
            group.scale.set(0.5, 0.5, 0.5)
            group.position.set(200, 0, 0)
            for (let i = 0; i < group.children.length; i++) {
              lxgroup.children[i] = group.children[i]
            }
            this.scene.add(lxgroup)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
html, body{
  height: 100%;
}
#model{
    width: 100%;
}
</style>
