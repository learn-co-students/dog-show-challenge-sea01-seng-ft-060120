document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => json.forEach(dog => showAllDogs(dog)))
    const showAllDogs = (dog) => {
        const tableBody = document.getElementById('table-body')
        let tableRow = document.createElement('tr')
      tableRow.setAttribute("id", `${dog.id}`)
    //   tableRow.id = dog.id
      console.log(tableRow)
        tableRow.innerHTML = `
        <td> ${dog.name}</td>
        <td> ${dog.breed} </td>
        <td> ${dog.sex} </td>
        <td><button>Edit</button></td>
        `
    
        tableBody.appendChild(tableRow)
        let btn = tableRow.querySelector('button')
        btn.addEventListener('click', (e) => {populateDog(e, dog)})
        // console.log(btn)
    }

    const populateDog = (e, dog) => {
        let dogForm = document.querySelector('form')
        dogForm.innerHTML = `
        <input type="text" name="name" placeholder's name" value="${dog.name}" />
        <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}" />
        <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}" />
        <input type="submit" value="Submit" />
        `
        dogForm.addEventListener('submit', (e)  => editDog(e, dog)) 
    }

    const editDog = (e, dog ) => {
        e.preventDefault()
        console.log(dog)
        // console.log(e)
    // }
    // console.log(e.target.name.value)
        let data = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }

        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
        let tableRow = document.getElementById(json.id)
        console.log(tableRow)
        tableRow.innerHTML = `
        <td> ${json.name}</td>
        <td> ${json.breed} </td>
        <td> ${json.sex} </td>
        <td><button>Edit</button></td>
        `
        // let btn = tableRow.querySelector('button')
        // btn.addEventListener('click', (e) => {populateDog(e, dog)})
        })
    }


})












