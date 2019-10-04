import React, { Component } from 'react'
import axios from 'axios'
import convertRupiah from 'rupiah-format'

// Import Master.css Native
import '../Assets/Css/Style.css'

// Import Components Bootstrap
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';

// Import Icons & Images
import iconFood from '../Assets/Images/iconFood.png'

// Import Components
import Header from './Header'
import Navigation from './Navigation'
import CartAddItems from './CartAddItems'

class Content extends Component {
  constructor(props) {
    super()
    this.state = {
      data: [],
      search: '',
      byProduct: 'idProduct',
      sort: 'asc',
      page: '1',
      totalPages: '',
      cart: [],
      cartTotal: 0,
      selectedId: [],

    }
  }

  async componentDidMount() {
    await this.getAll(this.state.search, this.state.byProduct, this.state.sort, this.state.page)
    console.log('ComponentDidMount', this.state.data)
  }

  getAll = async (search, byProduct, sort, page) => {
    let querySearch, queryByProduct, queryPage

    if (search) querySearch = `&searchByName=${search}`
    else querySearch = ""

    if (byProduct && sort) queryByProduct = `?byProduct=${byProduct}&sort=${sort}`
    else queryByProduct = ""

    if (page) queryPage = `&pages=${page}`
    else queryPage = ""

    await axios.get(`http://localhost:4000/api/v1/products${queryByProduct}${querySearch}${queryPage}`)
      .then(result => {
        console.log(result.data.data)
        this.setState({
          data: result.data.data,
          totalPages: result.data.total_pages
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getSearch = (e) => {
    e.preventDefault()
    let search = e.target.value

    this.setState({
      search
    })
    this.getAll(search, this.state.byProduct, this.state.sort)
  }

  getByProduct = (e) => {
    e.preventDefault()
    let byProduct = e.target.value

    this.setState({
      byProduct
    })
    this.getAll(this.state.search, byProduct, this.state.sort)
  }

  getSort = (e) => {
    e.preventDefault()
    let sort = e.target.value

    this.setState({
      sort
    })
    this.getAll(this.state.search, this.state.byProduct, sort)
  }

  getPages = (page) => {
    // e.preventDefault()
    // let pages = e.target.value

    this.setState({
      page
    })
    console.log(page)
    this.getAll(this.state.search, this.state.byProduct, this.state.sort, page)
  }

  Paginations = () => {
    const totalPages = this.state.totalPages

    var pageButton = []
    for (let i = 1; i <= totalPages; i++) {
      pageButton.push(i)
    }

    return (
      <Pagination size="sm" aria-label="Page navigation example">
        {
          pageButton.map((page) => (
            <PaginationItem className={page === this.state.page ? 'active' : ''} >
              <PaginationLink style={{ "height": "38px", "paddingTop": "8px" }} value="1" onClick={() => this.getPages(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
      </Pagination>
    )
  }

  menuClickHandler = (id) => {
    var selectedId = [...this.state.selectedId]

    if (selectedId.includes(id)) {
      var index = selectedId.findIndex(selected => selected === id)
      selectedId.splice(index, 1)
      this.state.cart.splice(index, 1)
      this.setState({ cartTotal: this.state.cartTotal - 1 })
    } else {
      selectedId.push(id)

      var index = this.state.data.findIndex(menu => menu.idProduct === id)
      var cartAdd = this.state.data[index]
      this.state.cart.push(cartAdd)
      var cart = [...this.state.cart]
      var indexCart = cart.findIndex(menu => menu.idProduct === id)
      cart[indexCart].quantity = 1

      this.setState({
        cart: cart,
        cartTotal: this.state.cartTotal + 1
      })
    }

    this.setState({ selectedId })
  }

  render() {
    return (
      <>
        <Container fluid={true}>
          {/* HEADER */}
          <Header />
          {/* END HEADER */}

          {/* CONTENT */}
          <Row className="contentCafeku">
            <Navigation />
            <Col sm="8" style={{ "background": "rgba(190, 195, 202, 0.3)" }}>
              <Row className="mt-3">
                <Col sm="3">
                  <Input type="text" placeholder="Search.." value={this.state.search} onChange={this.getSearch} />
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  <Input type="select" onChange={this.getByProduct}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </Input>
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  <Input type="select" onChange={this.getSort}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Input>
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  {this.Paginations()}
                </Col>
              </Row>
              <Row className="mt-3">
                {

                  this.state.data.map((item, index) => {
                    return (
                      <Col sm="4" className="mb-3" key={index}>
                        <Card className="cardRadius ">
                          <CardImg top className="CardImages" src={`http://localhost:4000/${item.image}`} alt="Card image cap" />
                          <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>
                              <Row>
                                <Col sm="8">
                                  <b style={{ "fontSize": "19px" }}>{convertRupiah.convert(item.price)}</b>
                                </Col>
                                <Col sm="3" className="ml-2">
                                  <Button color="primary" className="buttonAddCart" onClick={(id) => this.menuClickHandler(item.idProduct)}>Add</Button>
                                </Col>
                              </Row>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
            <Col sm="3" style={{ "border": "1px solid #CECECE" }}>
              {/* <img src={iconFood} alt="iconFood" className="iconFood" />
              <p className="textCart">Your cart is empty</p>
              <p className="textCart2">Please add some items from the menu</p> */}

              <CartAddItems />
            </Col>
          </Row>
          {/* END CONTENT */}

        </Container>
      </>
    )
  }
}

export default Content