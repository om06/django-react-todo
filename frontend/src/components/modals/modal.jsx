import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class Modal extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

inputValue = React.createRef()

render() {
  return (
    <MDBContainer>
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.handleClose}>
  <MDBModalHeader toggle={this.props.handleClose}>{this.props.title}</MDBModalHeader>
        <MDBModalBody>
          <MDBInput valueDefault={this.props.value} ref={this.inputValue} />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.props.handleClose}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={() => this.props.handleSave(
            this.props.type === 'EDIT' ? this.props.id : null, 
            this.inputValue.current.state.innerValue,
            this.props.type === 'ADD_TASK' ? this.props.bucketId : null,
            )
            }>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default Modal;