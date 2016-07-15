var qs = document.querySelectorAll.bind(document)
var log = console.log.bind(console)


  document.body.addEventListener('click', function(e){
    if(
      e.target.parentNode.parentNode.classList.contains('thumbnail') ||
      e.target.parentNode.classList.contains('thumbnail') ||
      e.target.classList.contains('thumbnail')
    ){
      window.location.href = '/detail.html?id=' + e.target.parentNode.getAttribute('data-id')
  }
})

fetch('http://localhost:8000/api/v1/portfolio')
  .then(function(jsonData){
    return jsonData.json()
  })
  .then(function(data){
    var id = window.location.search.slice(4)
    //detail pages
    if (id) {
      data.forEach(function(item){
        if (id == item.id){
          var thumbnail = document.createElement('div')
          thumbnail.classList.add('thumbnail')

          var img = document.createElement('img')
          img.setAttribute('src', item.image)

          var h3 = document.createElement('h3')
          h3.innerHTML = item.title

          var p = document.createElement('p')
          p.innerHTML = item.description

          var a = document.createElement('a')
          a.setAttribute('href', item.repo)
          a.classList.add('btn')
          a.classList.add('btn-primary')
          a.innerHTML = 'View Github Repo <i class="glyphicon glyphicon glyphicon-console"></i>'

          thumbnail.appendChild(img)
          document.querySelector('.container').appendChild(thumbnail)
          document.querySelector('.container').appendChild(h3)
          document.querySelector('.container').appendChild(p)
          document.querySelector('.container').appendChild(a)





        }
      })
    }
    //homepage code
    else{
      var featured = document.querySelector('#featured')
      var row = makeNewRow()

      data.forEach(function(item, i){


        var col = document.createElement('div')
        col.classList.add('col-sm-4')

        var thumbnail = document.createElement('div')
        thumbnail.classList.add('thumbnail')
        thumbnail.setAttribute('data-id', item.id)

        var img = document.createElement('img')
        img.setAttribute('src', item.image)

        var caption = document.createElement('div')
        caption.classList.add('caption')


        var captionTitle = document.createElement('h4')
        captionTitle.innerHTML = item.title

        caption.appendChild(captionTitle)
        thumbnail.appendChild(img)
        thumbnail.appendChild(caption)
        col.appendChild(thumbnail)
        row.appendChild(col)

        if (i % 3 === 0){
          featured.appendChild(row)

        }
      })
    }
  })

  function makeNewRow(){
    var row = document.createElement('div')
    row.classList.add('row')

    return row
  }
