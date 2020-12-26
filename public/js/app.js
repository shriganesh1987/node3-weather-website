const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent =  'Loading...'
    messageTwo.textContent =  ''

//to make http request from client side javascript, we will be using the fetch API
//fetch is not part of javascript. Its a browser based api.
//not accessible via Nodejs
//So, code written here cannot be used in backend node cript.
//As this code runs in only browser, not node js. Code written here is perfectly fine.
fetch('/weather?address=' + location).then((response) => {
    response.json().then((data)=> {
        //console.log(data)
        if(data.error)
        {
            //console.log(data.error)
            messageOne.textContent =  data.error
        }
        else
        {
            //console.log(data.location)
            messageOne.textContent = data.location
            //console.log(data.forecast)
            messageTwo.textContent = data.forecast
        }
    })
})
})