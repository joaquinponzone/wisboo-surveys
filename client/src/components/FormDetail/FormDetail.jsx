import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../../redux/actions/formsActions";

export default function FormDetail({ match }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.formsReducer.formDetail.form);

  useEffect(() => {
    dispatch(getForm(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      <h4>Form Detail</h4>
      <h2>{form?.name}</h2>
      <h5>{form?.description}</h5>
      <h4>Questions: </h4>
      <span>
        {form?.questions.map((q) => {
          return (
            <>
              <h4>{q.text}</h4>
              <ul>
                {q.options?.map((o) => {
                  return <li>{o}</li>;
                })}
              </ul>
            </>
          );
        })}
      </span>
    </div>
  );
}
