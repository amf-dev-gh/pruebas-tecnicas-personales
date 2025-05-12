import { CreateWebWorkerMLCEngine } from "https://esm.run/@mlc-ai/web-llm"

const $ = (el) => document.querySelector(el)
const date = new Date()
const $form = $('form')
const $input = $('input')
const $messages = $('ul')
const $container = $('main')
const $button = $('button')
const $footer = $('footer small')
const $title =$('#empty-chat')
const $loading = $('#loading-info')
const $template = $('#message-template')

$footer.textContent = `IA Chat - Andres Mariano Fernandez - ${date.getFullYear()}`
let messages = JSON.parse(localStorage.getItem('last-chat')) ?? []

const SELECTED_MODEL = 'Llama-3.2-1B-Instruct-q0f16-MLC'
const engine = await CreateWebWorkerMLCEngine(
  new Worker('./worker.js', { type: 'module' }),
  SELECTED_MODEL,
  {
    initProgressCallback: (info) => {
      $loading.textContent = info.text
      $title.innerHTML = '¡Bienvenido 👋! </br> Estamos cargando los datos...'
      if (info.progress === 1) {
        $button.removeAttribute('disabled')
        $title.textContent = '¿En qué puedo ayudarte?'
      }
    }
  })

$form.addEventListener('submit', async (event) => {
  event.preventDefault()
  // Obtengo el mensaje sin espacios en blanco
  const messageText = $input.value.trim()
  if (messageText === '') return

  // Creo el objeto de mensaje de usuario
  const userMessage = {
    role: 'user',
    content: messageText
  }

  // Agrego el mensaje del usuario a la lista de mensajes
  messages.push(userMessage)

  // Agrego el mensaje a la vista, desactivo el boton para esperar la respuesta y oculto el mensaje de bienvenida
  $button.setAttribute('disabled', true)
  $title.classList.add('hidden');
  addMessage(messageText, 'user')
  $input.value = ''

  // Hago la consulta a la IA y aguardo respuesta
  const chunks = await engine.chat.completions.create({ 
    messages,
    stream: true
  })
  let reply = ''

  // Agrega el mensaje vacío y obtiene el elemento
  const $botMessage = addMessage('', 'bot')

  // Por cada parte que va recibiendo de la respuesta, va agregandola al elemento
  for await (const chunk of chunks) {
    const choice = chunk.choices[0]
    const content = choice?.delta?.content ?? ''
    reply += content
    $botMessage.textContent = reply
  }

  // Vuelve a activar el boton, crea el mensaje interno y lo guarda
  $button.removeAttribute('disabled')
  messages.push({
    role: 'assistant',
    content: reply
  })

  // Al finalizar hace scroll hasta el final
  $container.scrollTop = $container.scrollHeight
})

// text es el contendio del mensaje y sender debe ser bot o user
function addMessage (text, sender){
  const clonedTemplate = $template.content.cloneNode(true)

  const $newMessage = clonedTemplate.querySelector('.message')
  const $text = $newMessage.querySelector('#message-content')
  const $time = $newMessage.querySelector('#message-time')

  if(sender === 'user') $time.classList.add('text-end')

  $text.textContent = text
  $time.textContent = getActualTime()

  $newMessage.classList.add(sender)

  $messages.appendChild($newMessage)

  $container.scrollTop = $container.scrollHeight

  return $text
}

function getActualTime () {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` :`${date.getHours()}`
  const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` :`${date.getMinutes()}`
  return `${hour}:${min}`
}