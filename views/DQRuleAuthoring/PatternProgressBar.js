import React from 'react'

import {
  Progress
} from 'shards-react'

export default PatternProgressBar = ({ step }) => {
	return (
    <div className="d-flex justify-content-between">
      <div 
        className={`
          stepper-step-icon-new 
          d-flex
          justify-content-center 
          ${ step === 1 ? "stepper-step-icon-active" : step > 1 ? "stepper-step-icon-complete" : "stepper-step-icon-inactive"}
        `}
      >
        {step > 1 &&
          <i className="fas fa-check-circle"></i>
        }
        {step === 1 &&
          <i className="fas fa-lock-open"></i>
        }
      </div>
      <div className="stepper-progress">
        <Progress 
          className={step > 1 ? 'step-complete' : 'step-pending'} 
          value={step === 1 ? 50 : step > 1 ? 100 : 0} 
        />
      </div>
      <div 
        className={`
          stepper-step-icon-new 
          d-flex 
          justify-content-center 
          ${ step == 2 
            ? "stepper-step-icon-active" 
            : step > 2 
            ? "stepper-step-icon-complete" 
            : "stepper-step-icon-inactive"
          }
        `}
      >
        {step > 2 &&
          <i className="fas fa-check-circle"></i>
        }
        {step === 2 &&
          <i className="fas fa-lock-open"></i>
        }
        {
          step < 2 &&
          <i className="fas fa-lock"></i>
        }
      </div>
      <div className="stepper-progress">
        <Progress value={step === 2 ? 50 : step > 2 ? 100 : 0} />
      </div>
      {/* <div 
        className={`
          stepper-step-icon-new 
          d-flex 
          justify-content-center 
          ${step == 3 ? "stepper-step-icon-active" : "stepper-step-icon-inactive"}
        `}
      >
        {step > 3 &&
          <i className="fas fa-check-circle"></i>
        }
        {step === 3 &&
          <i className="fas fa-lock-open"></i>
        }
        {
          step < 3 &&
          <i className="fas fa-lock"></i>
        }
      </div> */}
    </div>
  )
}