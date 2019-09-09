import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
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
}));

function App() {
	const classes = useStyles();
	const [drawer, setDrawer] = useState({
		open: false,
		index: 0
	});

	const toggleDrawer = () => {
		setDrawer({ open: !drawer.open });
	};

	const handlecChangeIndex = value => {
		setDrawer({ ...drawer, index: value });
	};

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
						onClick={() => toggleDrawer()}
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
				open={drawer.open}
				onClose={() => toggleDrawer()}
				variant='temporary'
				classes={{ paper: classes.drawerPaper }}
			>
				<div className={classes.toolbar} />
				<List component='nav'>
					<ListItem
						button
						selected={drawer.index === 0}
						component={Link}
						to={'/bb8'}
						onClick={() => handlecChangeIndex(0)}
					>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText primary={'BB8 Model'} />
					</ListItem>

					<ListItem
						button
						selected={drawer.index === 1}
						component={Link}
						to={'/focus'}
						onClick={() => handlecChangeIndex(1)}
					>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText primary={'Focus Model'} />
					</ListItem>

					<ListItem
						button
						selected={drawer.index === 2}
						component={Link}
						to={'/'}
						onClick={() => handlecChangeIndex(2)}
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

export default App;
