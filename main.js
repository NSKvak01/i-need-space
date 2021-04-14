const search = document.querySelector('#search')

search.addEventListener('click', ()=>{
    const inputKey = document.querySelector('#api-key')
    const key = inputKey.value
    
    const inputPlace = document.querySelector('#address')
    let place = inputPlace.value
    place=encodeURI(place)
    const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${key}`
    fetch(mapBoxURL)
        .then((res)=>res.json())
        .then((data)=>{
            const noradInput = document.querySelector('#norad')
            const norad = noradInput.value
            console.log(data)
            const lat = data.features[0].center[1]
            const lon = data.features[0].center[0]
            console.log(lat, lon)
            const sateliteURL = `https://satellites.fly.dev/passes/${norad}?lat=${lat}&lon=${lon}&limit=1&days=15&visible_only=true`
            fetch(sateliteURL)
                .then((res)=>res.json())
                .then((object)=>{
                    console.log(object)
                    const rise = object[0].rise.utc_datetime
                    const culmination = object[0].culmination.utc_datetime
                    const set = object[0].set.utc_datetime
                    const timeSection = document.querySelector('#time')
                    const h1 = document.querySelectorAll('h1')
                    const h2 = document.querySelectorAll('h2')
                    for (const h of h1){
                        h.remove()
                    }
                    for (const h of h2){
                        h.remove()
                    }
                    const title = document.createElement('h1')
                    title.innerText = data.features[0].text
                    const riseTime = document.createElement('h2')
                    riseTime.innerText = `Rise time: ${rise}`
                    const culminationTime = document.createElement('h2')
                    culminationTime.innerText = `Culmination time: ${culmination}`
                    const setTime = document.createElement('h2')
                    setTime.innerText = `Set time: ${set}`
                    timeSection.appendChild(title)
                    timeSection.appendChild(riseTime)
                    timeSection.appendChild(culminationTime)
                    timeSection.appendChild (setTime)
                    timeSection.getElementsByClassName.padding = '15px'
                    title.style.padding = '25px'
                    riseTime.style.padding = '25px'
                    culminationTime.style.padding = '25px'
                    setTime.style.padding = '25px'
                    inputPlace.value = ''

                })
        })
})