import React, { useState, useEffect } from 'react'

function AlertMessage({ message, status, delaySeconds }) {
	const [displayAlert, setDisplayAlert] = useState(true)

	useEffect( () => {
		const timerId = setTimeout( () => setDisplayAlert(false), delaySeconds*1000)
		return () => clearTimeout(timerId)
	}, [delaySeconds])

	if (!displayAlert) {
		return null
	}

	return (
		<div className="alert alert-primary alert-dismissable">
			<p>{ message }</p>
		</div>
	)
}

export default AlertMessage;