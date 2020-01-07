import React from 'react';
import PropTypes from 'prop-types';

const filterButtons = [
  { name: 'all', label: 'Все' },
  { name: 'important', label: 'Важные' },
  { name: 'done', label: 'Завершенные' }
];

export default class ItemStatusFilter extends React.Component {

  static propTypes = {
    onFilterItems: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  };

  renderButtons = () => {
    const { onFilterItems, filter } = this.props;

    const buttons = filterButtons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-info';

      return (
        <button
          key={name}
          type="button"
          className={`btn ${clazz}`}
          onClick={() => onFilterItems(name)}>
          {label}
        </button>
      );
    });

    return buttons;
  };

  render() {
    return (
      <div className="btn-group">
        {this.renderButtons()}
      </div>
    );
  }
}
