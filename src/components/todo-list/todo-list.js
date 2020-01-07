import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './todo-list.scss';
import TodoListItem from '../todo-list-item';

export default class TodoList extends Component {

  static propTypes = {
    listItems: PropTypes.array.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleMarkDone: PropTypes.func.isRequired,
    onToggleMarkImportant: PropTypes.func.isRequired,
  };

  renderListItems = () => {
    const { listItems, onDeleteItem, onToggleMarkDone, onToggleMarkImportant } = this.props;

    const items = listItems.map((listItem, index) => {

      const { id, ...listItemProps } = listItem;

      return (
        <li className='todo-list__item list-group-item' key={id}>
          <TodoListItem
            {...listItemProps}
            onDeleteItem={() => onDeleteItem(index)}
            onToggleMarkDone={() => onToggleMarkDone(index)}
            onToggleMarkImportant={() => onToggleMarkImportant(index)}
          />
        </li>
      );
    });

    return items;
  };

  render() {
    return (
      <ul className='todo-list list-group'>
        {this.renderListItems()}
      </ul>
    );
  }
}
