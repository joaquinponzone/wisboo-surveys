import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { addForm } from "../../redux/actions/formsActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

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
}));

function AddForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    questions: [
      {
        id: uuidv4(),
        question_type: "",
        text: "",
        options: [
          {
            id: uuidv4(),
            option: "",
          },
        ],
      },
    ],
    isPublished: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("formFields", formFields);
    let newForm = {
      form: {
        name: formFields.title,
        description: formFields.description,
        questions: formFields.questions.map((question, questionIndex) => {
          return {
            question_type: formFields.questions[questionIndex].question_type,
            text: formFields.questions[questionIndex].text,
            options: formFields.questions[questionIndex].options.map(
              (option, optionIndex) => {
                return formFields.questions[questionIndex].options[optionIndex]
                  .option;
              }
            ),
          };
        }),
        isPublished: false,
      },
    };
    // console.log("newForm", newForm);
    dispatch(addForm(newForm));
    history.push("/");
  };
  const handleChangeForm = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeQuestion = (id, event) => {
    const questions = [...formFields.questions];
    const newQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          [event.target.name]: event.target.value,
        };
      }
      return question;
    });
    setFormFields({
      ...formFields,
      questions: newQuestions,
    });
  };
  const handleAddQuestions = () => {
    setFormFields({
      ...formFields,
      questions: [
        ...formFields.questions,
        {
          id: uuidv4(),
          question_type: "",
          text: "",
          options: [
            {
              id: uuidv4(),
              option: "",
            },
          ],
        },
      ],
    });
  };
  const handleRemoveQuestion = (id) => {
    const questions = [...formFields.questions];
    const newQuestions = questions.filter((question) => question.id !== id);
    setFormFields({
      ...formFields,
      questions: newQuestions,
    });
  };
  const handleAddOption = (index, event) => {
    event.preventDefault();
    let newform = { ...formFields };
    newform.questions[index].options.push({
      id: uuidv4(),
      option: "",
    });
    setFormFields(newform);
  };
  const handleChangeOption = (questionIndex, optionIndex, event) => {
    event.preventDefault();
    let newForm = { ...formFields };
    newForm.questions[questionIndex].options[optionIndex].option =
      event.target.value;
    setFormFields(newForm);
  };
  const handleRemoveOption = (questionIndex, optionIndex, event) => {
    event.preventDefault();
    let newForm = { ...formFields };
    newForm.questions[questionIndex].options.splice(optionIndex);
    setFormFields(newForm);
  };

  return (
    <Container maxWidth={"sm"}>
      <h1>Add New Form</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='title'
              label='Title'
              variant='filled'
              value={formFields.title}
              onChange={(event) => handleChangeForm(event)}
            />
            <Grid item xs={12}></Grid>
            <TextField
              fullWidth
              name='description'
              label='Description'
              variant='filled'
              value={formFields.description}
              onChange={(event) => handleChangeForm(event)}
            />
          </Grid>
          <Grid item xs={12}>
            {formFields.questions?.map((question, index) => {
              return (
                <Grid container className={classes.formField}>
                  <Grid item xs={12} className={classes.formField}>
                    <Divider style={{ margin: ".5rem" }} />

                    <Grid container>
                      <Grid item xs={6}>
                        <IconButton id={`question-${index + 1}`} size='large'>
                          Question {`${index + 1}`}
                        </IconButton>
                      </Grid>
                      <Grid item xs={6}>
                        <IconButton
                          disabled={formFields.length === 1}
                          onClick={() => handleRemoveQuestion(question.id)}
                          size='small'
                          color='secondary'
                        >
                          Remove Question
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} key={question.id}>
                    <TextField
                      name={`text`}
                      label={`Question ${index + 1}`}
                      variant='filled'
                      fullWidth
                      value={formFields.questions[index].text}
                      onChange={(event) =>
                        handleChangeQuestion(question.id, event)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.formField}>
                    <InputLabel id={`question-${index + 1}`}>
                      Question Type{`${index + 1}`}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6} className={classes.formField}>
                    <Select
                      name={`question_type`}
                      value={formFields.questions[index].question_type}
                      label='Question Type'
                      fullWidth
                      defaultValue={"simple"}
                      onChange={(event) =>
                        handleChangeQuestion(question.id, event)
                      }
                    >
                      <MenuItem value={"simple"}>Simple</MenuItem>
                      <MenuItem value={"multiple"}>Multiple</MenuItem>
                      <MenuItem value={"text"}>Text</MenuItem>
                    </Select>
                  </Grid>
                  {question.question_type === "text" ? (
                    <TextareaAutosize
                      aria-label='option'
                      placeholder='option...'
                      style={{ width: 200 }}
                    />
                  ) : question.question_type === "multiple" ? (
                    question.options.map((option, i) => {
                      return (
                        <div key={option.id}>
                          <TextField
                            name={`option`}
                            label={`Option ${i + 1}`}
                            variant='filled'
                            fullWidth
                            value={
                              formFields.questions[index].options[i].option
                            }
                            onChange={(event) =>
                              handleChangeOption(index, i, event)
                            }
                          />
                        </div>
                      );
                    })
                  ) : (
                    question.options.map((option, i) => {
                      return (
                        <Grid container>
                          <Grid item xs={8}>
                            <TextField
                              name={`option`}
                              label={`Option ${i + 1}`}
                              variant='filled'
                              fullWidth
                              value={
                                formFields.questions[index].options[i].option
                              }
                              onChange={(event) =>
                                handleChangeOption(index, i, event)
                              }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <IconButton
                              disabled={formFields.length === 1}
                              onClick={(event) =>
                                handleRemoveOption(index, i, event)
                              }
                              size='small'
                              color='secondary'
                              className={classes.formField}
                            >
                              Remove Option
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    })
                  )}
                  <IconButton
                    onClick={(evt) => handleAddOption(index, evt)}
                    size='small'
                  >
                    Add Option
                    <AddIcon />
                  </IconButton>

                  <Divider style={{ margin: ".5rem" }} />
                </Grid>
              );
            })}
            <Divider style={{ margin: ".5rem" }} />

            <div>
              <IconButton onClick={handleAddQuestions}>
                Add Question
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'
          endIcon={<Icon />}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
      <div>
        <Typography variant={"h2"}>{formFields?.title}</Typography>
        <Typography variant={"h4"}>{formFields?.description}</Typography>
        <span>
          {formFields?.questions.map((q) => {
            return (
              <div key={q.id}>
                <Typography variant={"h6"}>{q.text}</Typography>
                <List>
                  {q.options?.map((o) => {
                    return <ListItem key={o.id}>{o.option}</ListItem>;
                  })}
                </List>
              </div>
            );
          })}
        </span>
      </div>
    </Container>
  );
}

export default AddForm;
