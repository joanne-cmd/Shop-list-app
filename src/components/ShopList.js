import {  useContext } from 'react'
import MainContext from '../MainContext'



const ShopList = () => {
  const { items, setItems } = useContext(MainContext)
  const { setUpdate } = useContext(MainContext)

  const getLists = async () => {
    try {
      const response = await fetch('http://127.0.0.1:9292/');
      const responseData = await response.json();
      setItems(responseData.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  const completeitem = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:9292/item/${id}`);
      const responseData = await response.json();
      if (!responseData.completed) {
        document.getElementById('tick-sound').play();
      }
      const updatedData = {
        bought: !responseData.bought
      };
      const putResponse = await fetch(`http://127.0.0.1:9292/fetch_items/`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: { 'Content-Type': 'application/json' }
      });
      const putResponseData = await putResponse.json();
      console.log(putResponseData);
    } catch (error) {
      console.log(error);
    }
  }
  const deleteitem = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:9292/delete_item/${id}`, {
        method: 'DELETE'
      });
      const responseData = await response.json();
      console.log(responseData);
      getLists();
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
      <ul className="item-list mt-3">
        {items.length <= 0 ? (
          <li className="item-empty" />
        ) : (
          items.map((item) => (
            <li className="mb-2" key={item._id}>
              <span
                className={
                  item.completed ? 'checkbox completed-checkbox' : 'checkbox'
                }
                onClick={() => completeitem(item._id)}
              />
              <span
                className={
                  item.completed
                    ? 'item-content completed-content'
                    : 'item-content'
                }
              >
                {item.content}
              </span>
              <div className="item-control-buttons">
                <span
                  onClick={() => {
                    setUpdate(item)
                    document.getElementById('item-form').value = item.content
                  }}
                >
                  <i className="far fa-edit" style={{ color: '#3498db' }} />
                </span>
                <span onClick={() => deleteitem(item._id)}>
                  <i
                    className="far fa-trash-alt"
                    style={{ color: '#e74c3c' }}
                  />
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
      <audio src={'./assets/sounds/tick.wav'} id="tick-sound" />
    </>
  )
}

export default ShopList