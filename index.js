const express = require('express')

const app = express()
app.use(express.json())

app.listen(3001, () => {
  console.log('Server on port 3000');
})

/*   ------  ARTICLES  -------   */

const articles = require('./articles.json')

app.get('/articles', (req, res) =>{ // get ALL

  res.status(200).json(articles)

})

app.get('/articles/:id', (req, res) =>{ // get ONE by ID

  id = +req.params.id
  const article = articles.find(article => article.id === id)
  if(!article){
    res.status(404).json({message: 'Article non trouvé'})
  }else{
    res.status(200).json(article)
  }

})

app.post('/articles', (req, res) =>{ // post ONE

  const article = {
    id: articles.length + 1,
    title: req.body.title,
    body: req.body.body,
    autor: req.body.autor,
    date: req.body.date,
    _links: { 
      category: {
        href: 'http://localhost:3001/categories/' + req.body.categoryId 
      },
      _self: 'http://localhost:3001/articles/' + (articles.length + 1)
    }
  }

  let title = {}
  articles.forEach((e) =>{
    title[e.title] = e.title
  })

  if(title[req.body.title]){
    console.log(article);
    res.status(400).json({message: 'L\'article existe déjà'})
  }else{
    articles.push(article)
    res.status(200).json(article)
  }

})

app.put('/articles/:id', (req, res) =>{ //change ONE by ID

  if(articles.find(article => article.id === +req.params.id)){
    const article = articles.find(article => article.id === +req.params.id)

    article.title = req.body.title
    article.body = req.body.body
    article.autor = req.body.autor
    article.date = req.body.date
    article._links.category.href = 'http://localhost:3001/categories/' + req.body.categoryId

    res.status(200).json(article)
  }else{
    res.status(404).json({message: 'Article non trouvé'})
  }

})

app.delete('/articles/:id', (req, res) =>{ // delete ONE by ID
  id = +req.params.id
  const article = articles.find(artist => artist.id === id)

  if(article){
    articles.splice(articles.indexOf(article), 1)
    res.status(200).json(article)
  }else{
    res.status(404).json({message: 'Article non trouvé'})
  }

})

/*   ------  CATEGORIES  -------   */

const categories = require('./categories.json')

app.get('/categories', (req, res) =>{ // get ALL

  res.status(200).json(categories)

})

app.get('/categories/:id', (req, res) =>{ // get ONE by ID

  id = +req.params.id
  const category = categories.find(category => category.id === id)
  if(!category){
    res.status(404).json({message: 'Catégorie non trouvé'})
  }else{
    res.status(200).json(category)
  }

})

app.post('/categories', (req, res) =>{ // post ONE

  const category = {
    id: categories.length + 1,
    name: req.body.name,
    description: req.body.description,
    _links: { 
      _self: 'http://localhost:3001/categories/' + (categories.length + 1)
    }
  }

  let title = {}
  categories.forEach((e) =>{
    title[e.title] = e.title
  })

  if(title[req.body.title]){
    console.log(category);
    res.status(400).json({message: 'La catégorie existe déjà'})
  }else{
    categories.push(category)
    res.status(200).json(category)
  }

})

app.put('/categories/:id', (req, res) =>{ //change ONE by ID

  if(categories.find(category => category.id === +req.params.id)){
    const category = categories.find(category => category.id === +req.params.id)

    category.name = req.body.name
    category.description = req.body.description

    res.status(200).json(category)
  }else{
    res.status(404).json({message: 'Catégorie non trouvé'})
  }

})

app.delete('/categories/:id', (req, res) =>{ // delete ONE by ID
  id = +req.params.id
  const category = categories.find(category => category.id === id)

  if(category){
    categories.splice(categories.indexOf(category), 1)
    res.status(200).json(category)
  }else{
    res.status(404).json({message: 'Catégorie non trouvé'})
  }

})