// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs').promises
const path = require('path')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collection = addCollection('Slide')
    const files = await fs.readdir(path.resolve('.', 'src', 'slides'))
    for (const file of files) {
      const filepath = path.resolve('.', 'src', 'slides', file)
      const slide = await fs.readFile(filepath, 'utf-8')
      collection.addNode({
        path: `/${file}`,
        content: slide,
        name: file.replace(/\.\w+$/, '')
      })
    }
    // fs.readdir(path.resolve('.', 'src', 'slides'), (err, slides) => {
    //   if (err) throw err

    //   for (const slide of slides) {
    //     // console.log(slide)
    //     const filepath = path.resolve('.', 'src', 'slides', slide)
    //     console.log('in loop', filepath)
    //     const file = fs.readFile

    //     // fs.readFile(filepath, 'utf-8', (err, content) => {
    //     //   console.log('in fs callback', content)
    //     //   if (err) throw err
    //     //   collection.addNode({
    //     //     path: filepath,
    //     //     content
    //     //   })
    //     // })
    //   }
    // })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
