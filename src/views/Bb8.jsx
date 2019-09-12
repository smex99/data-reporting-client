import React from 'react';
// import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import BB8Table from '../component/BB8Table';
import BB8ModelPerformance from '../component/charts/bb8ModelPerformance';

class Bb8 extends React.Component {
	render() {
		return (
			<>
				<Typography variant='h6'>BB8 Model</Typography>
				<Grid container>
					<Grid item lg={4} md={5}>
						<BB8ModelPerformance />
					</Grid>
					<Grid item md={12}>
						<BB8Table />
					</Grid>
				</Grid>
			</>
		);
	}
}

export default Bb8;
