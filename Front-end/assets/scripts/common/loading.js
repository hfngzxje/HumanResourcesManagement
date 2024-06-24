const bodyEL = document.querySelector('body')
const loadingEl = document.createElement('div');
loadingEl.className = "absolute top-0 left-0 w-screen h-screen bg-gray-900/35 z-50 flex flex-col items-center justify-center"
loadingEl.innerHTML = `
  <i class='bx bx-loader bx-spin bx-rotate-90 text-white text-4xl'></i>
  <div class="text-white">Đang xử lý ...</div>
`;

function setLoading(loading = true) {
  if(!loading) {
    loadingEl.remove()
    return
  }
  bodyEL.append(loadingEl)
}