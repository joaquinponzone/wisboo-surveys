import {
  Button,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  togglePublishForm,
} from "../../redux/actions/formsActions";

export default function FormsList({ list }) {
  const dispatch = useDispatch();
  const noRecords = useSelector((state) => state.formsReducer.formsList);

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {typeof noRecords === "string"
        ? "No records to display"
        : list?.map((item) => {
            return (
              <ListItem divider>
                <Grid
                  container
                  alignItems='center'
                  justifyContent='space-evenly'
                >
                  <Grid item>
                    <ListItemText
                      primary={
                        <Link href={`/${item?.form.id}`}>
                          {item?.form.name}
                        </Link>
                      }
                      secondary={
                        <Typography
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {item.form.description}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='text'
                      onClick={() => dispatch(togglePublishForm(item?.form.id))}
                    >
                      {item?.form.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      color='secondary'
                      onClick={() => dispatch(deleteForm(item?.form.id))}
                    >
                      X
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
    </List>
  );
}
