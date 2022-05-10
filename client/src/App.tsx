import React from 'react';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form'
import './App.css';
import GraphqlProvider from './GraphqlProvider';
import Dogs from './Dog';

type Inputs = {
  id: number,
  bredFor: string,
  breedGroup: string,
  name: string,
  limit: number,
  showAll: boolean
}

function App() {
  const { register, handleSubmit, watch, clearErrors, formState: { errors } } = useForm<Inputs>({ mode: "onChange" })
  const onSubmit: SubmitHandler<Inputs> = data => {
    debugger;
    console.log('data', data, errors);
  }
  const { id, name, bredFor, breedGroup, limit = 5, showAll } = watch();
  console.log('limit', id, name, bredFor, breedGroup, limit);
  const allEmpty = !id && !name && !bredFor && !breedGroup;
  console.log('errors', errors, Object.keys(errors)?.length, allEmpty);

  if (!allEmpty && Object.values(errors)?.length > 0 && Object.values(errors).every(error => error.type === 'required')) {
    clearErrors();
  }

  return (
    <form className="App container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-3">
        <div className="col-md-2 col-4 mb-3">
          <label className="form-label">id</label>
          <input {...register("id", { required: allEmpty, maxLength: { value: 3, message: "Max length is 3" } })} type="number" className={`form-control ${errors.id && 'is-invalid'}`} />
          {errors.id?.message && <small className="invalid-feedback">{errors.id.message}</small>}
        </div>
        <div className="col-md-3 col-8 mb-3">
          <label className="form-label">Name</label>
          <input {...register("name", { required: allEmpty, maxLength: { value: 20, message: "Max length is 20" } })} className={`form-control ${errors.name && 'is-invalid'}`} />
          {errors.name?.message && <small className="invalid-feedback">{errors.name.message}</small>}
        </div>
        <div className="col-md-3 col-4 mb-3">
          <label className="form-label">Bred for</label>
          <input {...register("bredFor", { required: allEmpty, maxLength: { value: 20, message: "Max length is 20" } })} className={`form-control ${errors.bredFor && 'is-invalid'}`} />
          {errors.bredFor?.message && <small className="invalid-feedback">{errors.bredFor.message}</small>}
        </div>
        <div className="col-md-3 col-4 mb-3">
          <label className="form-label">Breed group</label>
          <input {...register("breedGroup", { required: allEmpty, maxLength: { value: 5, message: "Max length is 5" } })} className={`form-control ${errors.breedGroup && 'is-invalid'}`} />
          {errors.breedGroup?.message && <small className="invalid-feedback">{errors.breedGroup.message}</small>}
        </div>
        <div className="col-md-1 col-4 mb-3">
          <label className='form-label invisible'>submit</label>
          <button className="btn btn-primary" type="submit" title="Submit button is here just to trigger the validation. Otherwise, the list updates on the fly.">Submit</button>
        </div>
        <div className="row mb-3">
          <>
            <label className="col-form-label col-md-2 col-3">Limit</label>
            <div className="col-8 col-md-9">
              <input className="form-range" type="range" min={1} max={100} value={limit} {...register("limit")} />
            </div>
            <div className="col-1">
              {!!limit && limit}
            </div>
          </>
        </div>
        {(allEmpty && Object.keys(errors)?.length > 0) && (
          <>
            <div className="alert alert-danger" role="alert">
              <strong>At least one field is required</strong>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input type="checkbox" className="form-check-input" {...register('showAll')} id="showAll" />
                <label className="form-check-label ms-1" htmlFor="showAll">Show all anyway 😎</label>
              </div>
            </div>
          </>
        )}
      </div>
      {(!allEmpty || showAll) &&
        <GraphqlProvider>
          {<Dogs id={Number(id) || undefined} bredFor={bredFor} breedGroup={breedGroup} name={name} limit={Number(limit)}></Dogs>}
        </GraphqlProvider>
      }
    </form>
  );
}

export default App;
