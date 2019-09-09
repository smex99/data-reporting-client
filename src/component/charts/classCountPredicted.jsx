import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bubble } from 'react-chartjs-2';
import { Paper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2)
	},
	spacer: {
		flex: '1 1 100%'
	},
	actions: {
		color: theme.palette.text.secondary
	},
	title: {
		flex: '0 0 auto'
	}
}));

export default function ClassCountPredicted() {
	useEffect(() => {
		axios
			.get('/api/metrics/count')
			.then(response => setPerf(response.data[0]))
			.catch(error => console.log(error));
	}, []);

	const classes = useStyles();
	const [perf, setPerf] = useState();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Toolbar>
					<div className={classes.title}>
						<Typography color='inherit' variant='subtitle1'>
							Focus Class Predicted
						</Typography>

						<div className={classes.spacer} />
					</div>
				</Toolbar>
				<Bubble
					data={{
						labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
						data: [],
						backgroundColor: [
							'rgba(255, 99, 132)',
							'rgba(54, 162, 235)',
							'rgba(255, 206, 86)',
							'rgba(255, 206, 86)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}}
				/>
			</Paper>
		</div>
	);
}
