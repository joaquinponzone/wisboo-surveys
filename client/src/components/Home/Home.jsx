import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  togglePublishForm,
} from "../../redux/actions/formsActions";
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
  Button,
  ListItemButton,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";

import { makeStyles } from "@material-ui/core/styles";
import FormsList from "./FormsList";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.paper,
  },
}));

export default function Home() {
  const classes = useStyles();
  const forms = useSelector(
    (state) => state.formsReducer.formsList.publishedForms
  );
  const drafts = useSelector((state) => state.formsReducer.formsList.drafts);

  return (
    <Container maxWidth='sm'>
      <Grid container>
        <Grid item xs={12}>
          <Typography component='span' variant='h4'>
            All Surveys
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button>
            <Link href='/create'>Create a your survey</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component='span' variant='body1'>
              Published Forms:
            </Typography>
            <FormsList list={forms} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component='span' variant='body1'>
              Drafts:
            </Typography>
            <FormsList list={drafts} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
