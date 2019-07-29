export default {
  name: 'form-msg-helper',
  props: {
    model: {
      type: [Object, Array],
      default: () => {},
    },
  },

  data() {
    return {
      showVal: false,
    }
  },

  render(h) {

    const bottonStyle = {
      padding: '2px 4px',
      position: 'fixed',
      'z-index': 100000002,
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      background: '#2d8cf0',
      color: '#fff',
    }

    const dialogStyle = {
      position: 'fixed',
      'z-index': 100000001,
      top: 0,
      right: 0,
      maxWidth: '300px',
      // height: '300px',
      background: 'rgb(236, 251, 240)',
      'over-flow': 'scroll',
      opacity: 0.9,
      padding: '20px',
      color: 'rgb(0, 0, 0)',
    }

    return (
      <div>
        <button style={bottonStyle} onClick={() => this.showVal = !this.showVal}>{
          this.showVal ? '关闭' : '表单值'
        }</button>
        {
          this.showVal && (
            <div style={dialogStyle} >
              <pre>{JSON.stringify(this.model, null, 2)}</pre>
            </div>
          )
        }
      </div>
    )
  },
}