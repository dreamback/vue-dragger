import Vue from 'vue'
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

var docBody = document.body
docBody.data = docBody.data || {}

var oldStyle = docBody.data.oldStyle = docBody.data.oldStyle || {}
var moveEle = null
var startPageXY = {}
var startPos = {}

const getClientRect = (el) => el.getBoundingClientRect()

const getScrollPos = () => {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}

const getElePos = (el) => {
  var scrollPos = getScrollPos()
  var clientRect = getClientRect(el)
  return {
    top: scrollPos.top + clientRect.top,
    left: scrollPos.left + clientRect.left
  }
}

const createDragLayout = ({target, pageX, pageY}) => {
  startPos = getElePos(target)

  startPageXY = {x: pageX, y: pageY}

  moveEle = document.createElement('div')
  moveEle.style.width = target.offsetWidth + 'px'
  moveEle.style.height = target.offsetHeight + 'px'
  moveEle.style.position = 'absolute'
  moveEle.style.cursor = 'move'
  moveEle.style.top = startPos.top + 'px'
  moveEle.style.left = startPos.left + 'px'

  moveEle.appendChild(target.cloneNode(true))
  document.body.appendChild(moveEle)
}

const mousedownFn = (e) => {
  console.log(e)
  for (let key in docBody.style) docBody.style.hasOwnProperty(key) && docBody.style[key] && (oldStyle[key] = docBody.style[key])
  docBody.style[prefix + 'user-select'] = 'none'
  createDragLayout(e)
}

const mousemoveFn = (e) => {
  if (!moveEle) return false
  var {pageX, pageY} = e
  moveEle.style.top = (startPos.top + (pageY - startPageXY.y)) + 'px'
  moveEle.style.left = (startPos.left + (pageX - startPageXY.x)) + 'px'
  console.log(moveEle.style.top)
}

const mouseupFn = (e) => {
  docBody.style[prefix + 'user-select'] = ''
  for (let key in oldStyle) docBody.style[key] = oldStyle[key]
  moveEle = null
}

Vue.directive('drag', {
  bind (el, binding, vnode) {
    el.addEventListener('mousedown', mousedownFn, false)
    docBody.addEventListener('mousemove', mousemoveFn, false)
    docBody.addEventListener('mouseup', mouseupFn, false)
  }
})
