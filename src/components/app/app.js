import React, {Component} from 'react';
import './app.scss';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

// const listItems = [
//   {
//     label: 'Drink Coffee',
//     important: true,
//     done: false,
//     id: 1
//   },
//   {
//     label: 'Drink whiskey',
//     important: false,
//     done: false,
//     id: 2
//   },
//   {
//     label: 'Drink shnaps',
//     important: false,
//     done: false,
//     id: 3
//   },
//   {
//     label: 'Drink milk',
//     important: false,
//     done: false,
//     id: 4
//   },
//   {
//     label: 'Drink tea',
//     important: true,
//     done: false,
//     id: 5
//   }
// ];

export default class App extends Component {

  state = {
    listItems: [],
    term: '',
    filter: 'all',
  };

  saveStateInStorage(value) {
    localStorage.setItem('listItems', JSON.stringify(value));
  }

  onDeleteItem = (index) => {
    let newListItems = [...this.state.listItems];

    newListItems.splice(index, 1);

    this.setState({
      listItems: newListItems
    });

    this.saveStateInStorage(newListItems);
  };

  onAddItem = (text) => {
    let newListItems = [...this.state.listItems];

    // const maxId = newListItems.reduce((prev, next) => prev.id > next.id ? prev.id : next.id, 1);

    function maxId() {
      let max = newListItems[0]['id'];

      newListItems.forEach((item) => {
        if (item['id'] > max) max = item['id'];
      });

      return max;
    }

    newListItems.unshift(
      {
        label: text,
        important: false,
        done: false,
        id: newListItems.length ? maxId() + 1 : 1
      }
    );

    this.setState({
      listItems: newListItems
    });

    this.saveStateInStorage(newListItems);
  };

  toggleProperty = (index, propName) => {
    let newListItems = [...this.state.listItems];
    newListItems[index][propName] = !newListItems[index][propName];

    this.setState({
      listItems: newListItems
    });

    this.saveStateInStorage(newListItems);
  };

  onToggleMarkDone = (index) => {
    this.toggleProperty(index, 'done');
  };

  onToggleMarkImportant = (index) => {
    this.toggleProperty(index, 'important');
  };

  search(items, term) {
    if (term.length === 0) return items;

    return items.filter((item) => {
      return item.label.toLowerCase().includes(term.toLowerCase())
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'important':
        return items.filter((item) => item.important);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onSearchItem = (term) => {
    this.setState({
      term
    });
  };

  onFilterItems = (filter) => {
    this.setState({
      filter
    });
  };


  componentDidMount() {
    let storageList = localStorage.getItem('listItems');
    storageList = JSON.parse(storageList);

    const listItems = storageList || [];

    this.setState({
      listItems,
      term: '',
    });
  }

  render() {
    const { listItems, term, filter } = this.state;
    const visibleItems = this.filter(this.search(listItems, term), filter);

    return (
      <div className='app'>
        <AppHeader listItems={listItems}/>

        <ItemAddForm onAddItem={this.onAddItem}/>

        <div className="search-panel d-flex">
          <SearchPanel onSearchItem={this.onSearchItem}/>
          <ItemStatusFilter
            onFilterItems={this.onFilterItems}
            filter={filter}/>
        </div>

        <TodoList
          listItems={visibleItems}
          onDeleteItem={this.onDeleteItem}
          onToggleMarkDone={this.onToggleMarkDone}
          onToggleMarkImportant={this.onToggleMarkImportant}/>
      </div>
    );
  }
}
