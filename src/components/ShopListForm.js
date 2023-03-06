import { useContext } from 'react'
import MainContext from '../MainContext'



const ShopListForm = () => {
  const { item, setItem } = useContext(MainContext)
  // const { items, setItems } = useContext(MainContext)
  const { update, setUpdate } = useContext(MainContext)

  const additem = async (data) => {
    if (data !== null) {
      try {
        const response = await fetch(`http://127.0.0.1:9292/create/`, {
          method: 'POST',
          body: JSON.stringify({ content: data }),
          headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        console.log(responseData);
        document.getElementById('item-form').value = null;
        setItem(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }
  const updateitem = async (data) => {
    setItem(null);
    if (data !== null) {
      const content = document.getElementById('item-form').value;
      try {
        const response = await fetch(`http://127.0.0.1:9292/item/update/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            content: content !== null ? content : data.content,
            date: new Date()
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        console.log(responseData);
        document.getElementById('item-form').value = null;
        setUpdate(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="item-form mt-3">
      <input
        className="form-control"
        id="item-form"
        type="text"
        placeholder="Add your new item"
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(k) =>
          k.keyCode === 13
            ? update !== null
              ? updateitem(update)
              : additem(item)
            : null
        }
      />
      {update === null ? (
        <button className="btn btn-info" onClick={() => additem(item)}>
          <i className="fas fa-plus" />
        </button>
      ) : (
        <button className="btn btn-warning" onClick={() => updateitem(update)}>
          <i className="far fa-edit" />
        </button>
      )}
    </div>
  )
}

export default ShopListForm