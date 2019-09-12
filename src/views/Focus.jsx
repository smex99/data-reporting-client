import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FocusTable from '../component/FocusTable';
import ModelPerformance from '../component/charts/modelPerformance';
import ClassPrediction from '../component/charts/classPrediction';
import ClassCountPredicted from '../component/charts/classCountPredicted';

class Focus extends React.Component {
	render() {
		return (
			<>
				<Typography variant='h6'>Focus Model</Typography>
				<Grid container spacing={8}>
					<Grid item lg={4} md={5}>
						<ModelPerformance />
					</Grid>

					<Grid item lg={4} md={5}>
						<ClassPrediction />
					</Grid>

					<Grid item lg={4} md={5}>
						<ClassCountPredicted />
					</Grid>
				</Grid>
				<Grid container>
					<Grid item md={12}>
						<FocusTable />
					</Grid>
				</Grid>
			</>
		);
	}
}

export default Focus;
