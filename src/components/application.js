import { useState } from 'react';
import { connect } from 'react-redux';
import {
  createItem,
  filterItems,
  getInitialItems,
  removeItem,
  updateItem,
} from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import NewItem from './new-item';
import { setLocalInput } from '../lib/reducer';
import ExpensiveComponent from './expensive';

const Application = ({
  newItemName,
  setNewItemName,
}) => {
  const [items, setItems] = useState(getInitialItems());

  const add = (name) => {
    const item = createItem(name);
    setItems([...items, item]);
  };

  const update = (id, updates) => {
    setItems(updateItem(items, id, updates));
  };

  const remove = (id) => {
    setItems(removeItem(items, id));
  };

  const unpackedItems = filterItems(items, { packed: false });
  
  return (
    <main className="flex flex-col gap-8 p-8 mx-auto lg:max-w-4xl">
      <Header items={items} />
      <ExpensiveComponent />
      <NewItem
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        addItem={add}
      />
      <section className="flex flex-col gap-8 md:flex-row">
        <ItemList
          title="List of Items"
          items={unpackedItems}
          update={update}
          remove={remove}
        />
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  newItemName: state.localState.newItemName,
});

const mapDispatchToProps = (dispatch) => ({
  setNewItemName: (value) => dispatch(setLocalInput(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
