import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
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

export default function ClassPrediction() {
	useEffect(() => {
		axios
			.get('/api/report/prediction')
			.then(response => setPerf(response.data[0]))
			.catch(error => console.log(error));
	}, []);

	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [perf, setPerf] = useState([]);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Toolbar>
					<div className={classes.title}>
						<Typography color='inherit' variant='subtitle1'>
							Focus Classes Prediction
						</Typography>

						<div className={classes.spacer} />
					</div>
				</Toolbar>
				<Doughnut
					data={{
						labels: ['min_class', 'max_class', 'avg_class'],
						datasets: [
							{
								label: '# Nb classes',
								data: [
									perf.min_nb_classes_predicted,
									perf.max_nb_classes_predicted,
									perf.avg_nb_classes_predicted
								],
								fill: false,
								backgroundColor: [
									'rgba(255, 99, 132)',
									'rgba(54, 162, 235)',
									'rgba(255, 206, 86)'
								],
								borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)'
								],
								borderWidth: 1
							}
						],
						options: {
							scales: {
								xAxes: [
									{
										barPercentage: 0.5,
										barThickness: 6,
										maxBarThickness: 8,
										minBarLength: 2,
										gridLines: {
											offsetGridLines: true
										}
									}
								]
							}
						}
					}}
				/>
			</Paper>
		</div>
	);
}
