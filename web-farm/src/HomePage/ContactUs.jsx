import React from 'react';
import Header from "./Header";
import Footer from './Footer';

function ContactUs() {
  return (
    <div>
        <Header />
      <div className="container my-4">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select Your Query</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Prediction Related</option>
              <option>Simulation Related</option>
              <option>Info Related</option>
              <option>Any Other</option>
            </select>
          </div>
          <div className="form-group row">
            <div className="col-sm-2">Are you a Farmer?</div>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck1" />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Yes
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2">Are you a Student?</div>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck2" />
                <label className="form-check-label" htmlFor="gridCheck2">
                  Yes
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea2">Tell us about yourself</label>
            <textarea className="form-control" id="exampleFormControlTextarea2" 
// @ts-ignore
            rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Elaborate Your Concern</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" 
// @ts-ignore
            rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
