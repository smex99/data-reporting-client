import React from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Paper, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
});

class BB8ModelPerformance extends React.Component {
	state = {};

	componentDidMount() {
		axios
			.get('/api/bb8/performance')
			.then(response => this.setState({ ...response.data[0] }))
			.catch(error => console.log(error));
	}

	render() {
		const { classes } = this.props;
		const { min_time, max_time, avg_time } = this.state;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={0}>
					<Toolbar>
						<div className={classes.title}>
							<Typography color='inherit' variant='subtitle1'>
								BB8 Time Execution (ms)
							</Typography>

							<div className={classes.spacer} />
						</div>
					</Toolbar>
					<Doughnut
						data={{
							labels: ['min_time', 'max_time', 'avg_time'],
							datasets: [
								{
									label: '# Execution time (ms)',
									data: [min_time, max_time, avg_time],
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
							]
						}}
					/>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(BB8ModelPerformance);
