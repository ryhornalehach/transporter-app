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
    let cancelButton, confirmButton, groupButton, nameProperty;

    if (this.props.groupFormText.toUpperCase() == '1ST' || this.props.groupFormText.toUpperCase() == 'SPLIT') {
      nameProperty = this.props.recordId;
    } else {
      nameProperty = this.props.clientId;
    }
    groupButton = <button
                      className={color}
                      name={nameProperty}
                      onClick={this.props.onClickGroup}
                    >
                      {this.props.groupFormText}
                  </button>
    if (this.props.cancelButton) {
      cancelButton = <button
                          className='btn waves-effect waves-light s6 red accent-1'
                          name='cancel'
                          onClick={this.props.onClickCancel}
                      >
                          <i className="material-icons">cancel</i>
                    </button>
    }
    if (this.props.confirmButton) {
      confirmButton = <button
                          className='btn waves-effect waves-light s6 green'
                          name='confirm'
                          onClick={this.props.makeNewGroup}
                      >
                          <i className="material-icons">check_circle</i>
                    </button>
    }

    return(
      <div className='row no-margin'>
        {groupButton}
        {cancelButton}
        {confirmButton}
      </div>
    )
  }
}

export default GroupAssign
