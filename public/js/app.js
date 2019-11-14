console.log('Client side java script is loaded')

fetch('localhost/3000/weather?address=Boston').then((response)=> {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')

weatheForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Testing')
})