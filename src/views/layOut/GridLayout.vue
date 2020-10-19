<script lang="jsx">
/**
 * 网格视图
 * @author 4everlynn
 */
export default {
  name: 'GridLayout',
  props: {
    /**
     * 一行最多多少个元素
     */
    max: {
      type: Number,
      default: 3
    },
    fluid: {
      type: Boolean,
      default: false
    },
    colClass: {
      type: Array,
      default: () => []
    }
  },
  render () {
    const nodes = this.$slots.default
    const renderTarget = []
    for (let i = 0; i < nodes.length; i += this.max) {
      renderTarget.push(nodes.slice(i, i + this.max))
    }

    const render = (v) => {
      const result = []

      for (const column of v) {
        // noinspection JSXNamespaceValidation
        result.push(
          <div style={{ width: !this.fluid ? `${100 / this.max}%` : '', flex: !this.fluid ? 'none' : '' }} class={ ['column', ...this.colClass] }>
            { column }
          </div>
        )
      }

      return result
    }

    const result = []

    for (const columns of renderTarget) {
      // noinspection JSXNamespaceValidation
      result.push(
        <div style="width: 100%" class="columns is-mobile">
          { render(columns) }
        </div>
      )
    }

    return (
      <div class="centered">
        { result }
      </div>
    )
  }
}
</script>

<style lang="scss">
  .centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>
