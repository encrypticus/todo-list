import React from 'react';
import './search-panel.scss';
import PropTypes from 'prop-types';

export default class SearchPanel extends React.Component {

  static propTypes = {
    onSearchItem: PropTypes.func.isRequired,
  };

  onChangeValue = (event) => {
    const { value } = event.currentTarget;
    const { onSearchItem } = this.props;

    onSearchItem(value.trim());
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Найти"
        onChange={this.onChangeValue}
      />
    );
  }
}
