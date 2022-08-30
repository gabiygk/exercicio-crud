const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sTipo = document.querySelector('#m-tipo')
const sPreço = document.querySelector('#m-preco')
const sArea = document.querySelector('#m-area')
const sEndereço = document.querySelector('#m-endereco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sTipo.value = itens[index].tipo
    sPreço.value = itens[index].preco
    sArea.value = itens[index].area
    sEndereço.value = itens[index].endereco
    id = index
  } else {
    sNome.value = ''
    sTipo.value = ''
    sPreço.value = ''
    sArea.value = ''
    sEndereço.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.tipo}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.area}</td>
    <td>${item.endereco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sTipo.value == '' || sPreço.value == '' || sArea.value == '' || sEndereço.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].tipo = sTipo.value
    itens[id].preco = sPreço.value
    itens[id].area = sArea.value
    itens[id].endereco = sEndereço.value

  } else {
    itens.push({'nome': sNome.value, 'tipo': sTipo.value, 'preco': sPreço.value, 'area': sArea.value, 'endereco': sEndereço.value,})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()