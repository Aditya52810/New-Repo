import React, { Component } from 'react'

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormSelect,
	Row,
	Col,
} from 'shards-react'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { 
  adhocExecutionTest,
} from '../../services/DQRAService';

export class RunNowModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runForSelection: 'Only for this rule',
			errorMessage: '',
			resMessage: '',
			resStatus: 0,
		}
	}

	onInputChange = accessor => e => {
		this.setState({ runForSelection: e.target.value })
	}

	onExecuteRunNow() {
		const {
			runForSelection
		} = this.state;

		const { dataConcept, dataElement, ruleId, id, ruleName } = this.props.data;

		const runNowPayload = {
			tableName: dataConcept,
			columnName: runForSelection === "All rules for this table/file" ? null : dataElement,
			ruleId: runForSelection === "Only for this rule" ? ruleId || id : null
		}
		adhocExecutionTest(runNowPayload).then( res => {
			if (res.status === 201 ) {
				toast.success(`${ruleName} - is successfully queued`)

				this.props.toggleRunNow()
			}
		}).catch( err => {
			console.log(err)
			toast.warning(`Failed to run - ${ruleName}`)
		})


		// this.setState({ resMessage: "Oh no! Something went wrong. Please try again later.", resStatus: 2 })
		this.setState({ resMessage: "Job has been successfully queued!", resStatus: 1 })
	}

	render() {
		const {
			runForSelection,
			resMessage,
			resStatus
		} = this.state;

		const runNowOptions = [
			"Only for this rule",
			"This rule for all columns",
			"All rules for this table/file"
		]

		return (
      <Modal open={this.props.showRunNow} toggle={this.props.toggleRunNow} backdropClassName="blur-modal-backdrop" size="md" keyboard={false}>
         <ModalHeader className="p-3">
          <Row>
            <Col md={11} sm={11}>
              <div className="modal-title"> Test DQ Rule </div>
            </Col>
          </Row>

        </ModalHeader>

        <ModalBody>
          <Row><h5>Run for other rules as well?</h5></Row>
          <Row>
            <FormSelect
            	type="text"
              name="runForSelection" 
              value={runForSelection}
              onChange={this.onInputChange("runForSelection")}
            >
              { runNowOptions.map( selection => <option key={selection}>{selection}</option> ) }
            </FormSelect>
          </Row>
        </ModalBody>
        {	
        	// resStatus ?
        	// 	resStatus === 1 ?
	        // 	<div className="bg-success text-white text-center p-2">
	        // 		{resMessage}
	        // 	</div>
	        // 	:
	        // 	<div className="bg-danger text-white text-center p-2">
	        // 		{resMessage}
	        // 	</div>
        	// : null
        }
        <ModalFooter>
          <div className="d-flex justify-content-between w-100">
            <button
              className="btn btn-secondary"
              onClick={this.props.toggleRunNow}
            >
              Cancel
            </button>
            <button
              disabled={runForSelection.length === 0}
              className="btn btn-primary"
              onClick={this.onExecuteRunNow.bind(this)}
            >
              Run
            </button>
          </div>
        </ModalFooter>
      </Modal>
		)
	}
}
