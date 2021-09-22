import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getForm } from "../../redux/actions/formsActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  formField: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.paper,
  },
}));

export default function FormDetail({ match }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const form = useSelector((state) => state.formsReducer.formDetail.form);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    dispatch(getForm(match.params.id));
  }, [dispatch, match]);

  const handleSelectOption = (id, evt) => {
    evt.preventDefault();
    setAnswers({
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <Container maxWidth={"sm"}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.formField}>
            <Typography component='span' variant='h4'>
              {form?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.formField}>
            <Typography component='span' variant='h5'>
              {form?.description}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.formField}>
            {form?.questions.map((q, i) => {
              return (
                <Grid container>
                  <Grid item>
                    <FormLabel component='legend'>{q.text}</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    {form.questions[i].question_type === "multiple" ? (
                      <FormGroup>
                        {q.options?.map((o) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={answers?.[form.questions[i].id]}
                                  onChange={(evt) =>
                                    handleSelectOption(
                                      form.questions[i].id,
                                      evt
                                    )
                                  }
                                  name={o}
                                />
                              }
                              label={o}
                            />
                          );
                        })}
                      </FormGroup>
                    ) : form.questions[i].question_type === "simple" ? (
                      <RadioGroup>
                        {q.options?.map((o) => {
                          return (
                            <FormControlLabel
                              control={<Radio />}
                              label={o}
                              value={o}
                            />
                          );
                        })}
                      </RadioGroup>
                    ) : (
                      <TextareaAutosize
                        value={answers?.[form.questions[i].id]}
                        minRows={3}
                        placeholder='Write your answer'
                        style={{ width: 200 }}
                      />
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => history.push("/")}
      >
        Back
      </Button>
    </Container>
  );
}
