import React, { Component } from 'react';
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

class B88CountInvoiceByClass extends Component {
	state = {
		data: [],
		dataCount: []
	};

	componentDidMount() {
		axios
			.get('/api/bb8')
			.then(response => {
				let result = response.data.map(data => ({
					_id: data._id,
					invoice_id: data.invoice_id,
					metrics: data.metrics,
					model_id: data.model_id,
					predictions: data.predictions.length
				}));
				this.setState({ data: result });
				this.handleGetInvoiceNumberByClass();
			})
			.catch(error => console.log(error));
	}

	handleFilterPredictionsByClassNumber(number) {
		return this.state.data.filter(item => item.predictions === number).length;
	}

	handleGetInvoiceNumberByClass() {
		let result = [];

		for (let i = 0; i < 12; i++) {
			const count = this.handleFilterPredictionsByClassNumber(i);
			result.push(count);
		}

		this.setState({ dataCount: result });
	}

	render() {
		const { classes } = this.props;
		const { dataCount } = this.state;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={0}>
					<Toolbar>
						<div className={classes.title}>
							<Typography variant='subtitle1'>
								BB8 Invoice Count By Class
							</Typography>
						</div>
					</Toolbar>

					<Bar
						data={{
							labels: [
								'0',
								'1',
								'2',
								'3',
								'4',
								'5',
								'6',
								'7',
								'8',
								'9',
								'10',
								'11'
							],
							datasets: [
								{
									label: '# Nbr invoice by class',
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

export default withStyles(styles)(B88CountInvoiceByClass);
