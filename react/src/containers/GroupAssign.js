import React, { Component } from 'react';
import SelectField from '../components/SelectField'

class GroupAssign extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let color = `btn waves-effect waves-light s6 ${this.props.groupFormColor}`;
    return(
      <div className='row no-margin'>
        <button
          className={color}
          name={this.props.recordId}
          onClick={this.props.onClickGroup}
          >
            {this.props.groupFormText}
        </button>
      </div>
    )
  }
}

export default GroupAssign
