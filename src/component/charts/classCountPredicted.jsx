import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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

class ClassCountPredicted extends React.Component {
	state = {
		data: [],
		dataCount: []
	};

	componentDidMount() {
		axios
			.get('/api/report/count')
			.then(response => {
				this.setState({ data: response.data });
				this.handleGetClassesNumber();
			})
			.catch(error => console.log(error));
	}

	handleFilterPredictions(number) {
		return this.state.data.filter(item => item.nb_classes_predicted === number)
			.length;
	}

	handleGetClassesNumber() {
		let result = [];

		for (let i = 0; i < 9; i++) {
			const count = this.handleFilterPredictions(i);
			result.push(count);
		}
		this.setState({ dataCount: [...result] });
	}

	render() {
		const { classes } = this.props;
		const { dataCount } = this.state;
		console.log(dataCount);

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={0}>
					<Toolbar>
						<div className={classes.title}>
							<Typography color='inherit' variant='subtitle1'>
								Focus Class Predicted Global
							</Typography>
						</div>
					</Toolbar>
					<Bar
						data={{
							labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
							datasets: [
								{
									label: '# Nbr invoice by classes predicted',
									data: dataCount,
									backgroundColor: [
										'rgba(255, 206, 86)',
										'rgba(255, 206, 86)',
										'rgba(255, 206, 86)',
										'rgba(255, 206, 86)',
										'rgba(255, 206, 86)',
										'rgba(51, 153, 51)',
										'rgba(51, 153, 51)',
										'rgba(51, 153, 51)',
										'rgba(51, 153, 51)'
									],
									borderColor: [
										'rgba(255, 206, 86, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(51, 153, 51, 1)',
										'rgba(51, 153, 51, 1)',
										'rgba(51, 153, 51, 1)',
										'rgba(51, 153, 51, 1)'
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

export default withStyles(styles)(ClassCountPredicted);
