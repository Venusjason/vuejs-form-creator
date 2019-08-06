import {jsonView} from 'jsonview-vue'

let zIndex = 999999

export default {
  name: 'form-msg-helper',
  props: {
    model: {
      type: [Object, Array],
      default: () => {},
    },
  },
  // components: {
  //   JsonView
  // },

  data() {
    return {
      showVal: false,
    }
  },

  render(h) {

    const dialogStyle = {
      position: 'fixed',
      'z-index': zIndex++,
      top: 0,
      right: 0,
      maxWidth: '300px',
      maxHeight: '300px',
      background: 'rgb(236, 251, 240)',
      overflow: 'scroll',
      opacity: 0.9,
      padding: '20px',
      color: 'rgb(0, 0, 0)',
    }

    const bottonStyle = {
      padding: '2px 4px',
      position: 'fixed',
      'z-index': zIndex++,
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      background: '#2d8cf0',
      color: '#fff',
    }

    return (
      <div>
        <button style={bottonStyle} onClick={() => this.showVal = !this.showVal}>{
          this.showVal ? '关闭' : '表单值'
        }</button>
        {
          this.showVal && (
            <div style={dialogStyle} >
              <jsonView json={this.model}/>
            </div>
          )
        }
      </div>
    )
  },
}