import Vue from 'vue'

Vue.directive('drag', {
  bind ($el, binding, vnode) {
    var prefix = (function () {
      var styles = window.getComputedStyle(document.documentElement, '')
      var core = (
        Array.prototype.slice
          .call(styles)
          .join('')
          .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1]
      return core ? ('-' + core + '-') : ''
    })()

    var docBody = document.body || document.documentElement
    docBody.data = docBody.data || {}

    var oldStyle = docBody.data.oldStyle = docBody.data.oldStyle || {}
    var moveEle = null
    var startPageXY = {}
    var startStatus = {}

    const getClientRect = (el) => el.getBoundingClientRect()

    const getScrollPos = () => {
      return {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft
      }
    }

    const getDragBox = (el, name) => {
      if (el === $el || el.nodeName === 'BODY') return null
      if (!name) return el
      el = el.parentNode
      return el.hasAttribute(name) ? el : getDragBox(el, name)
    }

    const fixEvent = (e) => {
      let target = e.$target || e.target || e.srcElement
      if (target === $el || target.nodeName === 'BODY') {
        e.$target = null
        return e
      }
      if (target.hasAttribute && target.hasAttribute('drag')) {
        let dragBox = target.getAttribute('drag')
        e.$target = getDragBox(target, dragBox)
        return e
      } else {
        e.$target = target.parentNode
        return fixEvent(e)
      }
    }

    const getElePos = (el) => {
      var scrollPos = getScrollPos()
      var clientRect = getClientRect(el)
      return {
        top: scrollPos.top + clientRect.top,
        left: scrollPos.left + clientRect.left,
        maxLeft: docBody.scrollWidth - el.offsetWidth,
        maxTop: docBody.scrollHeight - el.offsetHeight
      }
    }

    const createDragLayout = ({$target, pageX, pageY}) => {
      startStatus = getElePos($target)

      startPageXY = {x: pageX, y: pageY}
      moveEle = $target
      moveEle.style.position = 'absolute'
      moveEle.style.top = startStatus.top + 'px'
      moveEle.style.left = startStatus.left + 'px'
    }

    const fixPos = (top, left) => {
      return {
        top: top > startStatus.maxTop ? startStatus.maxTop : (top > 0 ? top : 0),
        left: left > startStatus.maxLeft ? startStatus.maxLeft : (left > 0 ? left : 0)
      }
    }

    const mousedownHandler = (e) => {
      fixEvent(e)
      if (!e.$target) return false
      for (let key in docBody.style) docBody.style.hasOwnProperty(key) && docBody.style[key] && (oldStyle[key] = docBody.style[key])
      docBody.style[prefix + 'user-select'] = 'none'
      createDragLayout(e)
    }

    const mousemoveHandler = (e) => {
      if (!moveEle) return false
      var {pageX, pageY} = e
      var pos = fixPos((startStatus.top + (pageY - startPageXY.y)), (startStatus.left + (pageX - startPageXY.x)))
      moveEle.style.top = pos.top + 'px'
      moveEle.style.left = pos.left + 'px'
    }

    const mouseupHandler = (e) => {
      docBody.style[prefix + 'user-select'] = ''
      for (let key in oldStyle) docBody.style[key] = oldStyle[key]
      // moveEle = null
    }

    const enterTargetMouseHandler = e => {
      if (!moveEle) return
      binding.value.callback && binding.value.callback(e)
      moveEle = null
    }
    window.addEventListener('mousedown', mousedownHandler, false)
    window.addEventListener('mousemove', mousemoveHandler, false)
    window.addEventListener('mouseup', mouseupHandler, false)

    // 拖拽进入对象
    console.log(binding.value.target)
    var enterTarget = document.querySelector(binding.value.target)
    enterTarget.addEventListener('mouseup', enterTargetMouseHandler, false)
  }
})
