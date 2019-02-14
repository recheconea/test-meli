import React from 'react';
import Item from 'components/itemsList/Item';

class ItemList extends React.Component {
  render() {
    return (
      <div className="main-container-inner">
        <Item/>
        <Item/>
        <Item/>
      </div>
    );
  }
}

export default ItemList;