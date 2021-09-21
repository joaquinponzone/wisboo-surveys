const express = require("express");
const server = express.Router();
const Form = require("../models/Form");

// ------ ** Getting all ** ------
server.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    let allForms = forms.map((form) => {
      return modelizer(form);
    });
    if (!allForms.length) {
      res.json("No records to display");
    } else {
      const publishedForms = allForms.filter((f) => !!f.form.isPublished);
      const drafts = allForms.filter((f) => !f.form.isPublished);
      res.json({
        publishedForms,
        drafts,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------ ** Getting One ** ------
server.get("/:id", getForm, (req, res) => {
  let searchedForm = modelizer(res.form);
  res.json(searchedForm);
});

// ------ ** Creating one ** ------
server.post("/", async (req, res) => {
  const form = new Form({
    form: {
      name: req.body.form.name,
      description: req.body.form.description,
      questions: req.body.form.questions.map((q) => {
        return {
          question_type: q.question_type,
          text: q.text,
          options: q.options,
        };
      }),
    },
  });
  try {
    const newForm = await form.save();
    formatedForm = modelizer(newForm);
    res.status(201).json(formatedForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ------ ** Updating One ** ------
server.put("/publish/:id", getForm, async (req, res) => {
  let { isPublished } = res.form.form;
  res.form.form.isPublished = !isPublished;
  try {
    const updatedForm = await res.form.save();
    res.json(modelizer(updatedForm));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ------ ** Deleting One ** ------
server.delete("/:id", getForm, async (req, res) => {
  try {
    await res.form.remove();
    res.json({ message: "Deleted Form" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getForm(req, res, next) {
  let form;
  try {
    form = await Form.findById(req.params.id);
    if (form == null) {
      return res.status(404).json({ message: "Cannot find form" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.form = form;
  next();
}

function modelizer(form) {
  return {
    form: {
      id: form._id,
      name: form.form.name,
      description: form.form.description,
      questions: form.form.questions.map((q) => {
        return {
          id: q._id,
          question_type: q.question_type,
          text: q.text,
          options: q.options,
        };
      }),
      isPublished: form.form.isPublished,
    },
  };
}

module.exports = server;
