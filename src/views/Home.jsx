import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
	Typography,
	Grid,
	Button,
	Card,
	CardActions,
	CardContent
} from '@material-ui/core';

const styles = theme => ({
	grid: {},
	gridItem: {
		marginBottom: 30
	},
	card: {}
});

class Home extends React.Component {
	render() {
		const { classes, history } = this.props;
		return (
			<Grid container direction='column' justify='center'>
				<Grid item lg={12} md={12} sm={12} className={classes.gridItem}>
					<Typography align='center' variant='h3'>
						Home
					</Typography>
				</Grid>
				<Grid item lg={4} md={6} className={classes.gridItem}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant='h6'>BB8 Model</Typography>
							Object Detection and CNN ai models
						</CardContent>
						<CardActions>
							<Button
								type='button'
								variant='text'
								color='primary'
								onClick={() => history.push('/bb8')}
							>
								Enter
							</Button>
						</CardActions>
					</Card>
				</Grid>

				<Grid item lg={4} md={6} className={classes.gridItem}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant='h6'>Focus Model</Typography>
							Spacy ai text model
						</CardContent>
						<CardActions>
							<Button
								type='button'
								variant='text'
								color='primary'
								onClick={() => history.push('/focus')}
							>
								Enter
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		);
	}
}
const HomeWithStyle = withStyles(styles)(Home);
export default withRouter(HomeWithStyle);
