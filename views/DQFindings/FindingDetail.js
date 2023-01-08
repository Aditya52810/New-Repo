import React from 'react'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
} from 'shards-react'


export function FindingDetail ({ show, toggle, data }) {

  return (
    <Modal open={show} toggle={toggle} size='md'>
      <ModalHeader>
        <Row>
          <Col md={11} sm={11}>
            <div className="modal-title"> DQ Findings: {data.Business_Term_Full_Name} </div>
          </Col>
          <Col md={1} sm={1} onClick={toggle}>
            <span className="modal-close"> <i className="fas fa-times"></i></span>
          </Col>
        </Row>
      </ModalHeader>
        
      <ModalBody>
        <Row><Col >Table: <span className="ml-2">{data.Data_Concept}</span></Col></Row>
        <Row><Col >Column: <span className="ml-2">{data.Column_Name}</span> </Col></Row>
        <Row>
          <Col >
            Criticality: 
            <Button 
              className={`
                ${
                  data.criticality === 'Critical' || data.criticality === 'None'
                  ? 'btn-wid-70 btn-danger'
                  : data.criticality === 'High'
                  ? 'btn-wid-70 btn-warning'
                  : 'btn-wid-70 btn-info'
                }
                text-white
                ml-2
              `}
            >
              {data.criticality}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div>DQ Finding Message: </div>
            <div className="w-100 h-50 jumbotron jumbotron-fluid p-3">
              {data.dq_user_constraint_message || '-' }
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div>Rule Details: </div>
            <div className="w-100 jumbotron jumbotron-fluid p-3 pb-5 mb-0">
              {data.Definition}
            </div>
          </Col>
        </Row>

      </ModalBody>

      <ModalFooter>
        <div className="d-flex w-100 justify-content-between">
          <Button outline theme="danger" className="">
            Mark as Issue
          </Button>
          <Button outline theme="success">
            Mark as Expected
          </Button>
        </div>
  </ModalFooter>
    </Modal>
  )
}
