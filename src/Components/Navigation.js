import React, { Component } from 'react'

// Import Style.css Native
import '../Assets/Css/Style.css'

// Import Components Bootstrap
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// Import Icons & Images
import iconFork from '../Assets/Images/fork.png'
import iconClipboard from '../Assets/Images/clipboard.png'
import iconAdd from '../Assets/Images/add.png'


class Navigation extends Component {
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
                <Col sm="1" style={{ "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.25)" }}>
                    <Row>
                        <Col className="mt-5 ml-1">
                            <Button className="buttonIcons">
                                <img src={iconFork} alt="iconFork" />
                            </Button>
                        </Col>
                        <Col className="mt-5 ">
                            <Button className="buttonIcons">
                                <img src={iconClipboard} alt="iconClipboard" />
                            </Button>
                        </Col>
                        <Col className="mt-5 ">
                            <Button className="buttonIcons" onClick={this.toggle}>
                                <img src={iconAdd} alt="iconAdd" />
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modalAdd">
                    <ModalHeader toggle={this.toggle} style={{ "borderBottom": "0px solid #fff" }}>
                        <p className="textModalHeaderAdd">Add Item</p>
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

export default Navigation