import './App.scss'
import { useState } from 'react'
import MainContext from './MainContext'
import ShopList from './components/ShopList'
import ShopListForm from './components/ShopListForm'
import ShopListInfo from './components/ShopListInfo'

const App = () => {
  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)
  const [update, setUpdate] = useState(null)

  const states = {
    items,
    setItems,
    item,
    setItem,
    update,
    setUpdate,
  }

  return (
    <MainContext.Provider value={states}>
      <section className="container">
        <div className="col-xl-5 col-md-8 px-5 py-3 mt-3 item-container">
          <p className="item-title my-2">{'Shopping list'}</p>
          <ShopListForm />
          <ShopList  />
          <ShopListInfo />
        </div>
      </section>
    </MainContext.Provider>
  )
}

export default App;
