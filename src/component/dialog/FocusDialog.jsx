import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	DialogTitle,
	DialogContent,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
}));

export default function FocusDialogs({ id, onClose }) {
	useEffect(() => {
		axios
			.get(`/api/focus/${id}`)
			.then(response => setPrediction(response.data[0]))
			.catch(error => {
				console.log(error);
			});
	}, [id]);

	const classes = useStyles();
	const [prediction, setPrediction] = useState();

	return (
		<>
			<DialogTitle disableTypography>
				<Typography variant='h6'>Raw BB8 Json Output</Typography>

				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers style={{ height: 500 }}>
				<pre>{JSON.stringify(prediction, null, 2)}</pre>
			</DialogContent>
		</>
	);
}
