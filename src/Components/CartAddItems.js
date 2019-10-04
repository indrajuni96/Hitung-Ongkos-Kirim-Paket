import React, { Component } from 'react'

// Import Master.css Native
import '../Assets/Css/Style.css'

// Import Components Bootstrap
import { Row, Col, Button, Input, Media, ButtonGroup, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter } from 'reactstrap';

// Import Icons & Images
import coffeLatteCart from '../Assets/Images/coffeLatteCart.png'

class CartAddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <>
        <Row style={{ "maxHeight": "370px" }} className="overflow-auto">
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>
                <p><b>Rp. 30.000</b></p>
                <ButtonGroup>
                  <Button className="buttonMinPlus">-</Button>
                  <Button className="buttonNumber">3</Button>
                  <Button className="buttonMinPlus">+</Button>
                </ButtonGroup>
              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>

              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>
              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>

              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>
              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>

              </Media>
            </Media>
          </Col>
          <Col sm="12" className="mt-4">
            <Media>
              <Media object src={coffeLatteCart} alt="Coffe Latte" className="mr-2" />
              <Media body>
                <Media heading>
                  Coffe Latte
                        </Media>

              </Media>
            </Media>
          </Col>
        </Row>

        <Row style={{ "marginTop": "155px" }}>
          <Col sm="12">
            <Row>
              <Col sm="6">
                <h5><b>Total:</b></h5>
              </Col>
              <Col sm="6">
                <h5><b>Rp.105.000.00*</b></h5>
              </Col>
            </Row>
          </Col>
          <Col sm="12">
            <p style={{ "fontSize": "16px" }}>*Belum termasuk ppn</p>
          </Col>
          <Col sm="12" className="mb-2">
            <Button style={{ "backgroundColor": "#57CAD5", "width": "100%", "borderColor": "#57CAD5" }} onClick={this.toggle}>
              Checkout
                </Button>
            <Button className="mt-2" style={{ "backgroundColor": "#F24F8A", "width": "100%", "borderColor": "#F24F8A" }}>
              Cancel
                </Button>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modalAdd">
          <ModalHeader toggle={this.toggle} style={{ "borderBottom": "0px solid #fff" }}>
            <p className="mt-3">Checkout <span style={{ "marginLeft": "124px" }}>Receipt no: #0101410919</span> </p>
            <p>Cashier : Pevita Pearce</p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Name</p></Label>
                <Col sm={9} >
                  <Input type="text" name="name" id="Name" className="mt-2 inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Image</p></Label>
                <Col sm={9} >
                  <Input type="text" name="name" id="Name" className="inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Price</p></Label>
                <Col sm={6} >
                  <Input type="text" name="name" id="Name" className="inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Category</p></Label>
                <Col sm={5} >
                  <Input type="select" name="name" id="Name" className="inputAddProduct">
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                  </Input>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter style={{ "borderTop": "0px solid #fff" }}>
            <Button className="buttonCancel" conClick={this.toggle}>Cancel</Button>{' '}
            <Button className="buttonAdd" onClick={this.toggle}>Add</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default CartAddItems