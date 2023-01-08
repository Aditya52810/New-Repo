import React from 'react'

import {
  FormSelect,
  FormTextarea,
  Row,
  Col,
} from "shards-react";

/*

schedulerData: {} --->

dqRuleDayWeek: '',
ruleCheckStartTime: 12,
ruleCheckStartTimeAMPM: 'AM',
ruleCheckDayofWeek: '',
loadDatasql

frequency
*/

export const Scheduler = props => {
  return (
    <>
      <Row className="mt-2">
        <Col md={12} sm={12}>
          <label>Schedule</label>
        </Col>
        <Col md={12} sm={12}>
          <FormSelect
            placeholder="Select from options"
            name="dqRuleDayWeek"
            value={props.schedulerData.dqRuleDayWeek}
            onChange={props.onChange}
            disabled={props.schedulerData.loadDatasql !== ''}
          >
            <option>Select From Options</option>
            <option>Daily</option>
            <option>Weekly</option>
          </FormSelect>
        </Col>
      </Row>

      {
        props.schedulerData.dqRuleDayWeek !== '' &&
        <Row className="mt-2">
          <Col md={4} sm={4}>
            <label>Automation Time</label>
          </Col>
          <Col md={8} sm={8}>
            <Row>
              <Col>
                <FormSelect
                  placeholder={12}
                  name="ruleCheckStartTime"
                  value={props.schedulerData.ruleCheckStartTime}
                  onChange={props.onChange}
                >
                  { [1,2,3,4,5,6,7,8,9,10,11,12].map( d => <option>{d}:00</option>)}
                </FormSelect>
              </Col>
              <Col className="d-flex justify-content-between align-middle h-100">
                <Col md={6} sm={6}>
                  <input 
                    type='radio'
                    name='ruleCheckStartTimeAMPM'
                    value='AM'
                    onChange={props.onChange}
                  />
                  <label>AM</label>
                </Col>
                <Col md={6} sm={6}>
                  <input 
                    type='radio'
                    name='ruleCheckStartTimeAMPM'
                    value='PM'
                    onChange={props.onChange}
                  />
                  <label>PM</label>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      }


      {
        props.schedulerData.dqRuleDayWeek === 'Weekly' &&
        <>
          <Row className="mt-2">
            <Col md={4} sm={4}>
              <label>Data Quality Check Days</label>
            </Col>
            <Col md={8} sm={8}>
              <FormSelect 
                placeholder="Sun."
                onChange={props.onChange}
                name="ruleCheckDayofWeek"
                value={props.schedulerData.ruleCheckDayofWeek}
              >{
                ["Sun.", "Mon.", "Tues.", "Wednes.", "Thurs.", "Fri.", "Satur."].map(d => <option>{d}</option>)
              }
              </FormSelect>
            </Col>
          </Row>
        </>
      }


      { props.dataLoad && 
        <Row className="mt-2">
          <Col md={12} sm={12}>
            <label>New Data Load</label>
          </Col>
          <Col md={12} sm={12}>
            <FormTextarea
              placeholder="Select * from ..." rows="2"
              name="loadDatasql"
              autocomplete="off"
              value={props.schedulerData.loadDatasql}
              onChange={props.onChange}
              disabled={props.schedulerData.dqRuleDayWeek !== ''}
              >
            </FormTextarea>
          </Col>
        </Row>}
    </>
  )
}
