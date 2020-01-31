import React from 'react'
import {Row, Col} from 'react-bootstrap'

const loadingGrid = () => {
    return (
        <Row>
            <Col xs={4} md={4} lg={4}>
            </Col>
            <Col xs={4} md={4} lg={4}>
                <div className="container-fluid center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </Col>
            <Col xs={4} md={4} lg={4}>
            </Col>
        </Row>
    )
}

export default loadingGrid;