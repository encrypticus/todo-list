import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './app-header.scss';

export default class AppHeader extends Component {

  static propTypes = {
    listItems: PropTypes.array.isRequired
  };

  countOf = (key) => {
    const { listItems } = this.props;

    const sublistItems = listItems.filter((item) => item[key] === true);

    return sublistItems.length;
  };

  render () {
    this.countOf();
    return (
      <div className="app-header d-flex">
        <h1 >Список дел</h1>
        <h2>
          важные {this.countOf('important')}, выполненные {this.countOf('done')
        }</h2>
      </div>
    );
  }
}
