// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  togglePublishForm,
} from "../../redux/actions/formsActions";

export default function Home() {
  const dispatch = useDispatch();
  const forms = useSelector(
    (state) => state.formsReducer.formsList.publishedForms
  );
  const drafts = useSelector((state) => state.formsReducer.formsList.drafts);
  const noRecords = useSelector((state) => state.formsReducer.formsList);

  return (
    <div>
      <h4>All Surveys</h4>
      <h5>published:</h5>
      <ul>
        {typeof noRecords === "string"
          ? "No records to display"
          : forms?.map((item) => {
              return (
                <li key={item?.form.id}>
                  <a href={`/${item?.form.id}`}>{item?.form.name}</a>
                  <button
                    onClick={() => dispatch(togglePublishForm(item?.form.id))}
                  >
                    {item?.form.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => dispatch(deleteForm(item?.form.id))}>
                    X
                  </button>
                </li>
              );
            })}
      </ul>
      <h5>drafts:</h5>
      <ul>
        {drafts?.map((item) => {
          return (
            <li key={item?.form.id}>
              <a href={`/${item?.form.id}`}>{item?.form.name}</a>
              <button
                onClick={() => dispatch(togglePublishForm(item?.form.id))}
              >
                {item?.form.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => dispatch(deleteForm(item?.form.id))}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
