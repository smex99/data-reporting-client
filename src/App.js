import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Drawer,
	Container,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import BB8View from './views/Bb8';
import FocusView from './views/Focus';
import Home from './views/Home';

const drawerWidth = 260;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
});

class App extends React.Component {
	state = {
		open: false,
		index: 0
	};

	toggleDrawer = () => {
		this.setState({
			...this.state,
			open: !this.state.open
		});
	};

	handlecChangeIndex = value => {
		this.setState({
			...this.state,
			index: value
		});
	};

	render() {
		const { classes } = this.props;
		const { open, index } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position='fixed' className={classes.appBar}>
					<CssBaseline />
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
							onClick={() => this.toggleDrawer()}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							AI Report System
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					open={open}
					onClose={() => this.toggleDrawer()}
					variant='temporary'
					classes={{ paper: classes.drawerPaper }}
				>
					<div className={classes.toolbar} />
					<List component='nav'>
						<ListItem
							button
							selected={index === 0}
							component={Link}
							to={'/bb8'}
							onClick={() => this.handlecChangeIndex(0)}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={'BB8 Model'} />
						</ListItem>

						<ListItem
							button
							selected={index === 1}
							component={Link}
							to={'/focus'}
							onClick={() => this.handlecChangeIndex(1)}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={'Focus Model'} />
						</ListItem>

						<ListItem
							button
							selected={index === 2}
							component={Link}
							to={'/'}
							onClick={() => this.handlecChangeIndex(2)}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={'Home'} />
						</ListItem>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Container maxWidth='xl'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/bb8' component={BB8View} />
							<Route exact path='/focus' component={FocusView} />
						</Switch>
					</Container>
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(App);
