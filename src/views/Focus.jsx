import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import FocusTable from '../component/FocusTable';
import ModelPerformance from '../component/charts/modelPerformance';
import ClassPrediction from '../component/charts/classPrediction';
// import ClassCountPredicted from '../component/charts/classCountPredicted';

const Focus = () => {
	return (
		<>
			<Typography variant='h6'>Focus Model</Typography>
			<Grid container>
				<Grid item md={12}>
					<FocusTable />
				</Grid>
			</Grid>

			<Grid container spacing={8}>
				<Grid item lg={6} md={6}>
					<ModelPerformance />
				</Grid>

				<Grid item lg={6} md={6}>
					<ClassPrediction />
				</Grid>

				<Grid item lg={6} md={6}>
					{/* <ClassCountPredicted /> */}
				</Grid>
			</Grid>
		</>
	);
};

export default Focus;
