import MainContext from '../MainContext'
import { useContext } from 'react'



const ShopListInfo = () => {
  const { items, setItems } = useContext(MainContext)

  const deleteAllItems = async () => {
    try {
      await Promise.all(items.map((item) => {
        return fetch(`http://127.0.0.1:9292/delete_item/${item.id}`, {
          method: 'DELETE',
        }).then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete item');
          }
          return response.json();
        });
      }));
  
      const response = await fetch(`http://127.0.0.1:9292/`);
      const data = await response.json();
      setItems(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="item-info mt-3">
      {items.length > 0 ? (
        <>
          {items.filter((t) => !t.completed).length === 0 ? (
            <p className="d-none d-sm-block">All tasks completed</p>
          ) : (
            <p className="d-none d-sm-block">
              You have {items.filter((t) => !t.completed).length} pending tasks
            </p>
          )}
          <button className="btn btn-danger" onClick={() => deleteAllItems()}>
            Clear All
          </button>
        </>
      ) : null}
    </div>
  )
}

export default ShopListInfo