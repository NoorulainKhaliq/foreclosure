import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './Sidebar'
import Form from './Form'
import Feature from './Feature'
import Footer from './Footer'
import Table from './Table'
import Box from './Box'
import Dropdown from './Dropdown'
import Pricing from './Pricing'

// images:
const promo1 = require('../../assets/images/promo-1.jpg')
const blog1 = require('../../assets/images/blog-1.jpg')
const blog2 = require('../../assets/images/blog-2.jpg')

class Elements extends Component {
    constructor(){
        super()
        this.state = {
            selected: null
        }
    }

    selectElement(element, event){
        if (event)
            event.preventDefault()

        // console.log('selectElement: '+element)
        this.setState({
            selected: element
        })
    }

    render(){
        let content = null
        if (this.state.selected == null){
            content = (
                <div className="boxed bg--secondary boxed--lg boxed--border">
                    <h4>Components Guide</h4>
                    <p>
                        To explore the components compatible with this theme, click on the 'Elements' option 
                        on the left menu and select a component.
                    </p>
                </div>
            )
        }

        if (this.state.selected == 'table'){
            content = (
                <div className="boxed boxed--lg">
                    <h4>Tables</h4>
                    <Table className="border--round" />
                    <Table className="border--round table--alternate-column" />
                    <Table className="border--round table--alternate-row" />
                </div>
            )
        }

        if (this.state.selected == 'dropdown'){
            content = (
                <div className="boxed boxed--lg" style={{height:500}}>
                    <h4>Dropdowns</h4>
                    <Dropdown label="Dropdown Click" />
                    <Dropdown label="Dropdown Hover" className="dropdown dropdown--hover" />
                </div>
            )
        }

        if (this.state.selected == 'form'){
            content = (
                <div className="boxed boxed--lg">
                    <h4>Forms</h4>
                    <Form />
                </div>
            )
        }

        if (this.state.selected == 'boxes'){
            content = (
                <div className="boxed boxed--lg">
                    <h4>Boxes</h4>
                    <Box />
                    <Box className="boxed boxed--border bg--secondary boxed--lg box-shadow" />
                </div>
            )
        }

        if (this.state.selected == 'pricing'){
            content = (
                <div className="boxed boxed--lg">
                    <h4>Pricing</h4>
                    <Pricing />
                </div>
            )
        }


        if (this.state.selected == 'feature'){
            content = (
                <div className="boxed boxed--lg">
                    <Feature image={blog1} title="Feature" text="This is a feature" />
                </div>
            )
        }

        if (this.state.selected == 'button'){
            content = (
                <div className="boxed boxed--lg">
                    <h4>Buttons</h4>
                    <div className="col-md-4">
                        <a className="btn btn--sm" href="#">
                            <span className="btn__text">.btn--sm</span>
                        </a>
                        <br /><br />
                        <a className="btn" href="#">
                            <span className="btn__text">.btn</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--lg" href="#">
                            <span className="btn__text">.btn--lg</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--primary" href="#">
                            <span className="btn__text">.btn--primary</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--primary-1" href="#">
                            <span className="btn__text">.btn--primary-1</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--primary-2" href="#">
                            <span className="btn__text">.btn--primary-2</span>
                        </a>

                        <br /><br />
                        <a className="btn btn--primary" href="#" data-tooltip="I'm the tooltip for the button">
                            <span className="btn__text">
                                With Tooltip
                            </span>
                        </a>
                    </div>

                    <div className="col-md-4">
                        <a className="btn btn--primary btn--icon" href="#">
                            <span className="btn__text"><i className="icon-Add-File"></i> New document</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--icon btn--primary" href="#">
                            <span className="btn__text"><i className="icon-Checkout-Bag"></i> Add To Bag</span>
                        </a>
                        <br /><br />
                        <a className="btn btn--icon bg--facebook" href="#">
                            <span className="btn__text">
                                <i className="socicon socicon-facebook"></i>
                                Join with Facebook
                            </span>
                        </a>
                        <br /><br />
                        <a className="btn btn--icon bg--twitter" href="#">
                            <span className="btn__text">
                                <i className="socicon socicon-twitter"></i>
                                Join with Twitter
                            </span>
                        </a>

                        <br /><br />
                        <a className="btn btn--icon bg--googleplus" href="#">
                            <span className="btn__text">
                                <i className="socicon socicon-google"></i>
                                Join with Google
                            </span>
                        </a>
                        <br /><br />
                        <a className="btn btn--icon bg--pinterest" href="#">
                            <span className="btn__text">
                                <i className="socicon socicon-pinterest"></i>
                                Join with Pinterest
                            </span>
                        </a>
                    </div>

                </div>
            )
        }

        return (
            <div>
                <Sidebar selectElement={this.selectElement.bind(this)} />
                <div className="main-container">
                    <section className="imagebg image--light cover cover-blocks bg--secondary">
                        <div className="background-image-holder hidden-xs">
                            <img alt="background" src={promo1} />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 col-md-5 col-md-offset-1">
                                    <div>
                                        <h1>Welcome to Turbo</h1>
                                        <p className="lead">
                                            Stack includes support for a sidebar column navigation the left, or right of the page
                                        </p>
                                        <hr className="short" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="elements">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-8 col-md-offset-2">
                                    { content }
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>

            </div>

        )
    }
}

export default Elements