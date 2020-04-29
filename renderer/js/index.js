

const documentReady = (fn) => {
  if (document.addEventListener) { // 标准浏览器
    document.addEventListener('DOMContentLoaded',  function cb() {
      document.removeEventListener('DOMContentLoaded', cb, false)
      fn()
    }, false)
  } else if (document.attachEvent) { // IE浏览器
    document.attachEvent('onreadystatechange', function cb() {
      if (document.readyState == 'complete') {
        document.detachEvent('onreadystatechange', cb)
        fn()
      }
    })
  }
}

documentReady(() => {
  const select = document.querySelector('#select')
  const content = document.querySelector("#content")
  const submit = document.querySelector('#submit')
  select.onclick = () => {
  }
  submit.onclick = async () => {
    for (let i = 0; i < sourcePathList.length; i++) {
      await app(sourcePathList[i], i + 1, sourcePathList.length)
    }
  }
  content.ondragenter = function (event) {
      // 重写ondragover 和 ondragenter 使其可放置
      event.preventDefault();
  }
  content.ondragover = function (event) {
    // 重写ondragover 和 ondragenter 使其可放置
    event.preventDefault();
  }
  content.ondragleave = function (event) {
      event.preventDefault();
  }
  content.ondrop = function (event) {
    // 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
    event.preventDefault();
    console.log(event)
    var efiles = event.dataTransfer.files;
    [...efiles].forEach(file => {
      sourcePathList.push(file.path)
    });
    return false;
  }
})