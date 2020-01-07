import React from 'react';
import './item-add-form.scss';
import PropTypes from 'prop-types';

export default class ItemAddForm extends React.Component {

  static propTypes = {
    onAddItem: PropTypes.func.isRequired
  };

  state = {
    label: ''
  };

  domElement = React.createRef();

  setFocusInInput = () => {
    this.domElement.current.focus();
  };

  onChangeValue = (event) => {
    let { value } = event.currentTarget;

    this.setState({
      label: value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setFocusInInput();

    const { onAddItem } = this.props;
    const { label } = this.state;

    if (label.trim() !== '') {
      onAddItem(label);
    }

    this.setState({
      label: ''
    });
  };

  componentDidMount() {
    this.setFocusInInput();
  }

  render() {
    const { label } = this.state;

    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
               className="form-control"
               placeholder="Добавить задачу"
               onChange={this.onChangeValue}
               value={label}
               ref={this.domElement}/>

        <button className="btn btn-primary">
          <span className="fa fa-plus"></span>
        </button>
      </form>
    );
  }
}
