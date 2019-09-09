import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import BB8Table from '../component/BB8Table';
import BB8ModelPerformance from '../component/charts/bb8ModelPerformance';

const Bb8 = () => {
	return (
		<>
			<Typography variant='h6'>BB8 Model</Typography>
			<Grid container>
				<Grid item md={12}>
					<BB8Table />
				</Grid>

				<Grid item lg={5} md={6}>
					<BB8ModelPerformance />
				</Grid>
			</Grid>
		</>
	);
};

export default Bb8;
