import React from 'react';
import PropTypes from 'prop-types';
import './todo-list-item.scss';

export default class TodoListItem extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    important: PropTypes.bool.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleMarkDone: PropTypes.func.isRequired,
    onToggleMarkImportant: PropTypes.func.isRequired,
  };

  // onMarkDone = () => {
  //   this.setState(({ done }) => {
  //     return {
  //       done: !done
  //     };
  //   });
  // };

  // onMarkImportant = () => {
  //   this.setState(({ important }) => {
  //     return {
  //       important: !important
  //     };
  //   });
  // };

  render() {
    const { label, done, important, onDeleteItem, onToggleMarkDone, onToggleMarkImportant } = this.props;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' todo-list-item_done';
    }

    if (important) {
      classNames += ' todo-list-item_important';
    }

    return (
      <span
        className={classNames}>

        <span
          className="todo-list-item__label"
          onClick={onToggleMarkDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleMarkImportant}>
          <i className="fa fa-exclamation"></i>
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleteItem}>
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    );
  }
}
