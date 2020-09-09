import './index.scss'

export default {
  name: 'chj-input',
  props: {
    value: null,
    type: {
      type: String,
      default: 'input'
    },
    rows: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    required: Boolean,
    errorTips: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    maxNum: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    inputListeners () {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value)
        }
      }
    }
  },
  mounted () {},
  methods: {}
}
